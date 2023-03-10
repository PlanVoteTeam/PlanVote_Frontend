import React, { useState, useRef } from "react";
import { apiUrl } from "../../config";

interface ModalProps {
  closeModal: () => void;
  modalState: boolean;
  eventId: string;
  participantsList: Participant[];
  setParticipantsList: React.Dispatch<React.SetStateAction<Participant[]>>;
  handleParticipantChange: (currentParticipant: Participant) => void;
}

interface Participant {
  _id: number;
  name: string;
}

const EventDetail_ModalChooseIdentity: React.FC<ModalProps> = ({
  closeModal,
  modalState,
  eventId,
  participantsList,
  setParticipantsList,
  handleParticipantChange,
}) => {
  if (!modalState) {
    return null;
  }

  const [showFormAddParticipant, setShowFormAddParticipant] = useState(false);
  const [newParticipant, setNewParticipant] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddParticipant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newParticipant) {
      // Set input from blue to pink
      inputRef.current?.classList.remove("is-primary");
      inputRef.current?.classList.add("is-link");

      // Set text from blue to pink
      inputRef.current?.classList.remove("has-text-primary");
      inputRef.current?.classList.add("has-text-link");

      return;
    }
    // Call addParticipantToEvent function with event ID and newParticipant value
    addParticipantToEvent(eventId, newParticipant);
    setShowFormAddParticipant(false);
    setNewParticipant("");
  };

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
      const participants = data.participants;
      const lastParticipant = participants[participants.length - 1];

      const updatedParticipantsList = [
        ...participantsList,
        { _id: lastParticipant._id, name: lastParticipant.name },
      ];
      setParticipantsList(updatedParticipantsList);
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
        </header>
        <section className="modal-card-body">
          <div className="content">
            {/* Add participant
          - [x] Modal
          - [x] Fetch all user
          - [x] Add user
          - [ ] If isn't in local storage
          - [ ] Button validate : save choice in local storage
          - [x] Button cancel : close pop up
        */}
            <div id="ChooseYourIdentity">
              <div className="buttons">
                {participantsList.map((participant) => (
                  <button
                    className="button is-primary is-outlined"
                    key={participant._id}
                    onClick={() => {
                      handleParticipantChange(participant);
                      closeModal();
                    }}
                  >
                    {participant.name}
                  </button>
                ))}

                {!showFormAddParticipant && (
                  <button
                    className="button is-primary is-outlined"
                    onClick={() => setShowFormAddParticipant(true)}
                  >
                    +
                  </button>
                )}

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
