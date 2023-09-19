import { useEffect, useState } from "react";
import "./EventFinish.scss";
import { useLocation, useParams } from "react-router";
import { apiUrl } from "../../../config";
import LayoutFooter from "../Layout/LayoutFooter";
import { useNavigate } from "react-router-dom";

const EventFinish = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { eventId } = useParams();

  const [bestDestinations, setBestDestination] = useState([]);
  const [bestDate, setBestDate] = useState([]);

  useEffect(() => {
    console.log(location);
    if (location.state.step._id !== undefined) {
      const stepId = location.state.step._id;
      fetch(apiUrl + `events/${eventId}/steps/${stepId}`, {
        method: "GET",
        mode: "cors",
        headers: {},
      })
        .then((response) => response.json())
        .then((reponse) => {
          setBestDestination(reponse.bestDestinations);
          setBestDate(reponse.glidingWindows[0].windows);
          console.log(bestDestinations);
        });
    } else {
      refresh();
    }
  }, [eventId]);

  function refresh() {
    fetch(apiUrl + `events/${eventId}/steps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      mode: "cors",
    })
      .then((blob) => blob.json())
      .then((reponse) => {
        setBestDestination(reponse.bestDestinations);
        setBestDate(reponse.glidingWindows[0].windows);
      });
  }

  function retour() {
    navigate("/events/" + location.state._id);
  }

  return (
    <section className="section">
      <h1 className="title">Visulation des résulats</h1>
      <div className="mb-5 pb-5 is-flex is-justify-content-space-between informations">
        <div>
          <div className="title is-6">
            Nom de l'évènement : {location.state.name}
          </div>
          <div className="title is-6">
            Description de l'évènement : {location.state.description}{" "}
          </div>
        </div>
        <div>
          <button className="button is-primary mr-4" onClick={retour}>
            Retour
          </button>
          <button className="button is-primary" onClick={refresh}>
            Actualiser
          </button>
        </div>
      </div>
      <div className="wrapper mb-6">
        <div>
          <div className="title is-4 mb-5">Meilleurs destinations</div>
          {bestDestinations
            ? bestDestinations.map((elem: any, index) => {
                return (
                  <div key={index} className="box classement">
                    {(() => {
                      if (index === 0) {
                        return <div>&#x1F947;</div>;
                      } else if (index === 1) {
                        return <div>&#x1F948;</div>;
                      } else {
                        return <div>&#x1F949;</div>;
                      }
                    })()}
                    <div className="element">
                      <div>
                        {elem.name[0].toUpperCase() + elem.name.slice(1)}{" "}
                      </div>
                      <div>Note : {Math.trunc(elem.avgNote)} </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div>
          <div className="title is-4 mb-5">Meilleurs créneaux</div>
          {bestDate
            ? bestDate.map((elem: any, index) => {
                return (
                  <div key={index}>
                    &#x1F4C5; du{" "}
                    {elem.startDate.slice(0, elem.startDate.length - 14)} au{" "}
                    {elem.endDate.slice(0, elem.endDate.length - 14)}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <LayoutFooter />
    </section>
  );
};

export default EventFinish;
