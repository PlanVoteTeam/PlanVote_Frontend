import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalChooseidentity from "./ChooseIdentity/ModalChooseIdentity";
import ButtonShareEvent from "./ShareEvent/ButtonShareEvent";
import { apiUrl } from "../../../config";
import { isLocalStorageAvailable } from "../../utils/localStorageUtils";
import { EVENT_DESCRIPTION_BLANK_MESSAGE } from "../../utils/constants";
import ManageDestination from "./ManageDestination/ManageDestination";
import ManageDescription from "./ManageDescription/ManageDescription";
import LoadingPage from "../LoadingPage";
import { IEvent, Participant, Destination } from "../../utils/interface";

const EventDetail = () => {
  //Event
  const { eventId } = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [eventDescription, setEventDescription] = useState("");
  //Event.participants
  const [participantsList, setParticipantsList] = useState<Participant[]>([]);
  const [currentParticipant, setCurrentParticipant] =
    useState<Participant | null>(null);
  const [modalState, setModalState] = useState(true);
  //Event.destinations
  const [destinationsList, setDestinationsList] = useState<Destination[]>([]);
  const [nameDestination, setNameDestination] = useState<string>("");

  // Fetch event data using eventId from params
  useEffect(() => {
    fetch(apiUrl + `events/${eventId}`, { mode: "cors" })
      .then((blob) => blob.json())
      .then((response) => {
        setEvent(response);
        setEventDescription(response.description);
        setParticipantsList(response.participants);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eventId]);

  // Update destinationList when participantList is updated
  useEffect(() => {
    setDestinationsList(
      participantsList.flatMap((participant) => participant.destinations)
    );
  }, [participantsList]);

  // Toggle modal
  const toggleModal = () => {
    setModalState(!modalState);
  };

  // Add currentParticipant to localStorage
  function setCurrentParticipantLocalStorage(
    currentParticipant: Participant | null
  ) {
    if (isLocalStorageAvailable() && currentParticipant) {
      localStorage.setItem(
        "currentParticipant",
        JSON.stringify(currentParticipant)
      );
    }
  }

  // Get currentParticipant from localStorage
  function getCurrentParticipantLocalStorage(): Participant | null {
    const storedParticipant = localStorage.getItem("currentParticipant");
    if (storedParticipant) {
      return JSON.parse(storedParticipant);
    }
    return null;
  }

  // Handle change of currentParticipant
  function handleParticipantChange(currentParticipant: Participant) {
    setCurrentParticipant(currentParticipant);
    setCurrentParticipantLocalStorage(currentParticipant);
  }

  // If event is null, display loading
  if (!event) {
    return (
      <LoadingPage
        title1="Votre évenement : "
        title2="chargement ..."
      ></LoadingPage>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          {/* Display current participant from local storage */}
          {getCurrentParticipantLocalStorage() != null && (
            <p className="subtitle">
              Utilisateur courant : {getCurrentParticipantLocalStorage()?.name}
            </p>
          )}

          {/* Title of page */}
          <p className="title">
            <span>Votre évenement : </span>
            <span className="has-text-primary	is-large is-lowercase">
              {event.name}
            </span>
          </p>

          {/* Description of event */}
          <ManageDescription
            eventId={event._id}
            eventDescription={event.description}
            event={event}
            setEvent={setEvent}
            setEventDescription={(description: string) =>
              setEvent((prevEvent) =>
                prevEvent ? { ...prevEvent, description } : prevEvent
              )
            }
          ></ManageDescription>

          <hr />

          <ManageDestination
            eventId={eventId!}
            destinationsList={destinationsList!}
            setDestinationsList={setDestinationsList}
          ></ManageDestination>

          <div className="buttons">
            {/* Choose Identity / Open Modal */}
            <button className="button is-primary" onClick={toggleModal}>
              Qui es-tu ?
            </button>

            {/* Share Event
            - [ ] Générate magic link
            - [ ] Copy To ClipBoard
            - [ ] Share on social media
            */}
            <ButtonShareEvent eventId={eventId!}></ButtonShareEvent>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalChooseidentity
        closeModal={toggleModal}
        modalState={modalState}
        eventId={eventId!}
        participantsList={participantsList!}
        setParticipantsList={setParticipantsList}
        handleParticipantChange={handleParticipantChange}
      ></ModalChooseidentity>
    </section>
  );
};

export default EventDetail;
