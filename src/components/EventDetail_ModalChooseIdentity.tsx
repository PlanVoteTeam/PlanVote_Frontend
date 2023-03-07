import React from "react";

interface ModalProps {
  closeModal: () => void;
  modalState: boolean;
}

const EventDetail_ModalChooseIdentity: React.FC<ModalProps> = ({
  closeModal,
  modalState,
}) => {
  if (!modalState) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Qui est-tu ? 👀</p>
          <button className="delete" onClick={closeModal} />
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
                <button className="button is-primary is-outlined">
                  Pierre
                </button>
                <button className="button is-primary is-outlined">Remy</button>
                <button className="button is-primary is-outlined">Dylan</button>
                <button className="button is-primary is-outlined">Julie</button>
                <button className="button is-primary is-outlined">+</button>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <a className="button" onClick={closeModal}>
            Cancel
          </a>
        </footer>
      </div>
    </div>
  );
};

export default EventDetail_ModalChooseIdentity;
