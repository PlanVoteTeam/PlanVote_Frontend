import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalChooseidentity from "./ChooseIdentity/ModalChooseIdentity";
import ButtonShareEvent from "./ShareEvent/ButtonShareEvent";
import { apiUrl } from "../../../config";
import ManageDestination from "./ManageDestination/ManageDestination";
import ManageDescription from "./ManageDescription/ManageDescription";
import ManageName from "./ManageName/ManageName";
import LayoutFooter from "../Layout/LayoutFooter";
import LoadingPage from "../LoadingPage";
import { IEvent, IParticipant, IDestination } from "../../utils/interface";
import ManageDuration from "./ManageDuration/ManageDuration";
import "./EventDetail.scss"

const EventDetail = () => {
  //Event
  const { eventId } = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [, setEventName] = useState("");
  const [, setEventDescription] = useState("");
  //Event.participants
  const [participantsList, setParticipantsList] = useState<IParticipant[]>([]);
  const [currentParticipant, setCurrentParticipant] =
    useState<IParticipant | null>(null);
  const [modalState, setModalState] = useState(true);
  //Event.destinations
  const [destinationsList, setDestinationsList] = useState<IDestination[]>([]);

  // Fetch event data using eventId from params
  useEffect(() => {
    fetch(apiUrl + `events/${eventId}`, { mode: "cors" })
      .then((blob) => blob.json())
      .then((response) => {
        setEvent(response);
        setEventName(response.name);
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

  // Handle change of currentParticipant
  function handleParticipantChange(currentParticipant: IParticipant) {
    setCurrentParticipant(currentParticipant);
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
    <>
      <section className="section">
        <div className="container">
          <div className="content">
            {/* Display current participant from local storage */}
            {currentParticipant != null && (
              <p className="subtitle">
                Utilisateur courant: {currentParticipant?.name}
              </p>
            )}

            {/* Title with edit */}
            <ManageName
              eventId={event._id}
              eventName={event.name}
              event={event}
              setEvent={setEvent}
              setEventName={(name: string) =>
                setEvent((prevEvent) =>
                  prevEvent ? { ...prevEvent, name } : prevEvent
                )
              }
            ></ManageName>

            <div className="is-flex is-justify-content-space-between mobile-desc-dur">
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

            {/* Duration of event */}
            <ManageDuration 
              eventId={event._id} eventDurationMin={event.minDuration} eventDurationMax={event.maxDuration}
              event={event}
              setEvent={setEvent}
              setEventDurationMin={(minDuration: number) =>
                setEvent((prevEvent) =>
                  prevEvent ? { ...prevEvent, minDuration } : prevEvent
                )
              }
              setEventDurationMax={(maxDuration: number) =>
                setEvent((prevEvent) =>
                  prevEvent ? { ...prevEvent, maxDuration } : prevEvent
                )
              }
            ></ManageDuration>
            </div>

            <hr />

            {currentParticipant && (
              <ManageDestination
                eventId={eventId!}
                currentParticipant={currentParticipant}
                destinationsList={destinationsList!}
                setDestinationsList={setDestinationsList}
                participantsList={participantsList!}
                setParticipantsList={setParticipantsList}
                idParticipant={currentParticipant._id}
              ></ManageDestination>
            )}

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
          setCurrentParticipant={setCurrentParticipant}
        ></ModalChooseidentity>
      </section>

      {/* Footer */}
      <LayoutFooter />
    </>
  );
};

export default EventDetail;
