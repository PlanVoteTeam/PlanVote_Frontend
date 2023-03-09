import React from "react";

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
                <button className="button is-primary is-outlined">+</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetail_ModalChooseIdentity;
