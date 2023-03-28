import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalChooseidentity from "./ChooseIdentity/ModalChooseIdentity";
import ButtonShareEvent from "./ShareEvent/ButtonShareEvent";
import { apiUrl } from "../../../config";
import { isLocalStorageAvailable } from "../../utils/localStorageUtils";
import { EVENT_DESCRIPTION_BLANK_MESSAGE } from "../../utils/constants";
import AddDestination from "./AddDestination/AddDestination";
import ManageDescription from "./ManageDescription/ManageDescription";
import LoadingPage from "../LoadingPage";

interface Event {
  _id: string;
  name: string;
  description: string;
  participants: Participant[];
}

interface Participant {
  _id: number;
  name: string;
}

const EventDetail = () => {
  const { eventId } = useParams();
  // Fetch event data using eventId

  const [event, setEvent] = useState<Event | null>(null);
  const [participantsList, setParticipantsList] = useState<Participant[]>([]);
  const [currentParticipant, setCurrentParticipant] =
    useState<Participant | null>(null);
  const [modalState, setModalState] = useState(true);
  const [eventDescription, setEventDescription] = useState("");

  useEffect(() => {
    // Fetch event data using eventId from params
    fetch(apiUrl + `events/${eventId}`, { mode: "cors" })
      .then((blob) => blob.json())
      .then((response) => {
        setEvent(response);
        setParticipantsList(response.participants);
        setEventDescription(response.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eventId]);

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

          <AddDestination />

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
