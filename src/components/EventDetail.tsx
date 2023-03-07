import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail_ModalChooseidentity from "./EventDetail_ModalChooseIdentity";

const EventDetail = () => {
  const { eventId } = useParams();
  // Fetch event data using eventId

  const [modalState, setModalState] = useState(true);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          {/* Title of page */}
          <p className="title">
            <span>Votre évenement : </span>
            <span className="has-text-primary	is-large is-lowercase">
              event.name
            </span>
          </p>

          {/* Description of event
            Todo add on clic method
            - On click : balise a to input text
            - Add Button cancel
            - Add button Validate -> axios.patch
          */}
          <a className="subtitle mt-5">
            La description de votre évenement... modifie la maintenant
          </a>

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
      ></EventDetail_ModalChooseidentity>
    </section>
  );
};

export default EventDetail;
