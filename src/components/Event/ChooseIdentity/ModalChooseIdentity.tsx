import React, { useState, useRef } from "react";
import { apiUrl } from "../../../../config";
import { getRandomColor } from "../../../utils/utils";
import { IS_COLOR_EVENT_PARTICIPANT_LIST } from "../../../utils/constants";
import { IParticipant } from "../../../utils/interface";

interface ModalProps {
  closeModal: () => void;
  modalState: boolean;
  eventId: string;
  participantsList: IParticipant[];
  setParticipantsList: React.Dispatch<React.SetStateAction<IParticipant[]>>;
  handleParticipantChange: (currentParticipant: IParticipant) => void;
  setCurrentParticipant: React.Dispatch<
    React.SetStateAction<IParticipant | null>
  >;
}

const EventDetail_ModalChooseIdentity: React.FC<ModalProps> = ({
  closeModal,
  modalState,
  eventId,
  participantsList,
  setParticipantsList,
  handleParticipantChange,
  setCurrentParticipant,
}) => {
  if (!modalState) {
    return null;
  }

  const [showFormAddParticipant, setShowFormAddParticipant] = useState(false);
  const [newParticipant, setNewParticipant] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  // Handle form submit to add a new participant
  const handleAddParticipant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newParticipant) {
      changeColorInputRefFromBlueToPink();
      return;
    }
    // Call addParticipantToEvent function with event ID and newParticipant value
    addParticipantToEvent(eventId, newParticipant);
    setShowFormAddParticipant(false);
    setNewParticipant("");
  };

  // change color of inputref from blue to pink
  const changeColorInputRefFromBlueToPink = () => {
    // Set input from blue to pink
    inputRef.current?.classList.remove("is-primary");
    inputRef.current?.classList.add("is-link");

    // Set text from blue to pink
    inputRef.current?.classList.remove("has-text-primary");
    inputRef.current?.classList.add("has-text-link");
  };

  // Add new participant to event
  const addParticipantToEvent = async (
    eventId: string,
    newParticipant: string
  ) => {
    try {
      const response = await fetch(apiUrl + `events/${eventId}/participants`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newParticipant }),
      });

      const data = await response.json();
      setParticipantsList(data.participants);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du participant à l'événement",
        error
      );
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Qui est-tu ? 👀</p>
          {!isEdit && (
            <button
              className="button is-warning is-light is-outlined has-text-warning"
              onClick={() => setIsEdit(true)}
            >
              Éditer
            </button>
          )}

          {isEdit && (
            <button
              className="button is-danger is-light is-outlined has-text-danger"
              //onClick={() => setIsEdit(false)}
              onClick={() => setIsEdit(false)}
            >
              Annuler
            </button>
          )}
        </header>
        <section className="modal-card-body">
          <div className="content">
            <div id="ChooseYourIdentity">
              <div className="buttons">
                {/* Display list of participants of event */}
                {participantsList &&
                  participantsList.length > 0 &&
                  participantsList.map((participant) => (
                    <button
                      //className={`button ${getRandomColor()} is-outlined`}
                      className={`button ${
                        IS_COLOR_EVENT_PARTICIPANT_LIST
                          ? getRandomColor()
                          : "is-primary"
                      } is-outlined`}
                      key={participant._id}
                      onClick={() => {
                        handleParticipantChange(participant);
                        setCurrentParticipant(participant);
                        closeModal();
                      }}
                    >
                      {participant.name}
                    </button>
                  ))}

                {/* Show button to add a new participant */}
                {!showFormAddParticipant && (
                  <button
                    className="button is-primary is-outlined"
                    onClick={() => setShowFormAddParticipant(true)}
                  >
                    +
                  </button>
                )}

                {/* Show form to add a new participant */}
                {showFormAddParticipant && (
                  <form onSubmit={handleAddParticipant}>
                    <div className="field has-addons">
                      <div className="control">
                        <input
                          className="input is-primary is-outlined has-text-primary"
                          type="text"
                          placeholder="Je suis .."
                          value={newParticipant}
                          onChange={(e) => setNewParticipant(e.target.value)}
                          autoFocus
                          ref={inputRef}
                        />
                      </div>
                      <div className="control">
                        <button className="button is-primary is-outlined">
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetail_ModalChooseIdentity;
