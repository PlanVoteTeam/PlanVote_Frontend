import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail_ModalChooseidentity from "./EventDetail_ModalChooseIdentity";
import { apiUrl } from "../../config";
import { isLocalStorageAvailable } from "../utils/localStorageUtils";

interface Event {
  _id: string;
  name: string;
  description: string;
  participants: Participant[];
  // ...
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
  const [isEventDescriptionEditing, setIsEventDescriptionEditing] =
    useState(false);
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

  function handleEditEventDescriptionClick() {
    setIsEventDescriptionEditing(true);
  }

  function handleCancelEditEventDescriptionClick() {
    if (event?.description) setEventDescription(event.description);
    setIsEventDescriptionEditing(false);
  }

  async function handleUpdateDescriptionEvent(
    eventId: string,
    newDescription: string
  ) {
  }

  // If event is null, display loading
  if (!event) {
    return (
      <section className="section">
        <div className="container">
          <div className="content">
            {/* Title of page */}
            <p className="title">
              <span>Votre évenement : </span>
              <span className="has-text-primary	is-large is-lowercase">
                chargement ...
              </span>
            </p>
            <progress className="progress is-large is-info" max="100">
              60%
            </progress>
          </div>
        </div>
      </section>
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
          {isEventDescriptionEditing ? (
            <div>
              <form onSubmit={handleUpdateDescriptionEvent}>
                <div className="field has-addons">
                  <div className="control">
                    <input
                      type="text"
                      className="input is-primary has-text-primary"
                      autoFocus
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                  </div>
                  <div className="control">
                    <button className="button is-primary is-outlined mr-2">
                      Enregistrer
                    </button>
                  </div>
                  <div className="control">
                    <button
                      className="button is-danger is-outlined"
                      onClick={handleCancelEditEventDescriptionClick}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <a
                className="subtitle mt-5"
                onClick={handleEditEventDescriptionClick}
              >
                {event.description}
              </a>
            </div>
          )}

          <hr />

          {/* Share Event
            - [ ] Générate magic link
            - [ ] Copy To ClipBoard
            - [ ] Share on social media
          */}
          <div className="buttons">
            {/* Choose Identity / Open Modal */}
            <button className="button is-primary" onClick={toggleModal}>
              Choose your identity
            </button>
            <button className="button is-primary">Partager 🏹</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EventDetail_ModalChooseidentity
        closeModal={toggleModal}
        modalState={modalState}
        eventId={eventId!}
        participantsList={participantsList!}
        setParticipantsList={setParticipantsList}
        handleParticipantChange={handleParticipantChange}
      ></EventDetail_ModalChooseidentity>
    </section>
  );
};

export default EventDetail;
