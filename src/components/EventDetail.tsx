import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventDetail = () => {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container">
        {/* Title of page */}
        <p className="title">
          <span>Votre évenement : </span>
          <span className="has-text-primary	is-large is-lowercase">
            event.name
          </span>
        </p>

        {/*
        Todo add on clic method
        - On click : balise a to input text
        - Add Button cancel
        - Add button Validate -> axios.patch
        */}
        <a className="subtitle mt-5">
          La description de votre évenement... modifie la maintenant
        </a>

        {/* Add participant

          - [ ] Pop Up
          - [ ] If isn't in local storage
        */}
        <div id="ChooseYourIdentity">
          <p className="title">
            <span>Qui est-tu ? 👀 </span>
          </p>

          <div className="buttons">
            <button className="button is-primary is-outlined">Pierre</button>
            <button className="button is-primary is-outlined">Remy</button>
            <button className="button is-primary is-outlined">Dylan</button>
            <button className="button is-primary is-outlined">Julie</button>
            <button className="button is-primary is-outlined">+</button>
          </div>
        </div>

        <div className="column is-half">
          <div className="buttons">
            <button className="button is-primary is-fullwidth">
              Partager 🏹
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
