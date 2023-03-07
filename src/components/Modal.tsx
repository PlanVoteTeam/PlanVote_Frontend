import React from "react";

interface ModalProps {
  closeModal: () => void;
  modalState: boolean;
  title?: string;
  // children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  // children,
  closeModal,
  modalState,
  title,
}) => {
  if (!modalState) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">
            {/* {children} */}
            Contenu Here
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

export default Modal;
