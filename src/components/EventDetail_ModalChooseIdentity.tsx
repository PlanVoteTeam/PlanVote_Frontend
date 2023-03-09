import React, { useState } from "react";

interface ModalProps {
  closeModal: () => void;
  modalState: boolean;
  participantsList: Participant[];
}

interface Participant {
  id: number;
  name: string;
}

const EventDetail_ModalChooseIdentity: React.FC<ModalProps> = ({
  closeModal,
  modalState,
  participantsList,
}) => {
  if (!modalState) {
    return null;
  }

  const [showFormAddParticipant, setShowFormAddParticipant] = useState(false);
  const [newParticipant, setNewParticipant] = useState("");

  const handleAddParticipant = () => {
    // Ajoutez ici la logique pour ajouter un participant
    console.log("Ajout d'un participant", newParticipant);
    setShowFormAddParticipant(false);
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
          - [ ] Fetch all user
          - [ ] Add user
          - [ ] If isn't in local storage
          - [ ] Button validate : save choice in local storage
          - [ ] Button cancel : close pop up
        */}
            <div id="ChooseYourIdentity">
              <div className="buttons">
                {participantsList.map((participant) => (
                  <button
                    className="button is-primary is-outlined"
                    key={participant.id}
                    onClick={closeModal}
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
