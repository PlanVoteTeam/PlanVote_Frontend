import { useState } from "react";
import { apiUrl } from "../../../config";
import "./LandingNoAuth.scss";
import { useNavigate } from "react-router-dom";

const LandingNoAuth = () => {
  const navigate = useNavigate();
  const [nameEvent, setNameEvent] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleChangeEvent = (event: any) => {
    setNameEvent(event.currentTarget.value);
  };

  const handleSumbit = (event: any) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", nameEvent);

    fetch(apiUrl + `events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: formData.toString(),
      mode: "cors",
    })
      .then((blob) => blob.json())
      .then((response) => {
        navigate("/events/" + response._id);
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  return (
    <div>
      <div className="landing__background">
        {isError ? (
          <div className="notification is-danger">
            Une erreur est survenu, veuillez réessayer plus tard.
          </div>
        ) : (
          <div></div>
        )}
        <div className="px-5 is-flex is-flex-direction-column is-justify-content-center  landing__wrapper">
          {/* Header */}
          <h1 className="mb-6 title is-1">
            Plan
            <span className="has-text-primary	is-large is-lowercase">
              &nbsp;&&nbsp;
            </span>
            Vote
          </h1>

          {/* Titre */}
          <h1 className="mb-5 title is-1 is-black">
            <span>Créer un&nbsp;</span>
            <span className="has-text-primary	is-large is-lowercase">
              événement&nbsp;
            </span>
            <span>et invite&nbsp;</span>
            <span className="has-text-primary	is-large is-lowercase">
              tes amis&nbsp;
            </span>
            <span>pour décider vote prochain rassemblement !</span>
          </h1>

          {/* Sous Titre */}
          <p className="mb-5 content is-medium has-text-weight-light ">
            Organiser des vacances entre amis c'est compliqué. C'est pourquoi
            nous avons conçu Plan & Vote, la solution idéale pour planifier des
            vacances.
          </p>

          {/* Form création événement */}
          <div>
            <div>
              <form
                className="is-flex is-flex-direction-row"
                onSubmit={handleSumbit}
              >
                <input
                  className="input is-primary mr-3 is-medium"
                  type="text"
                  placeholder="Nom de l'évènement"
                  onChange={handleChangeEvent}
                ></input>
                <button
                  className="button is-primary is-medium text is-small"
                  type="submit"
                >
                  Créez votre évènement
                </button>
              </form>
            </div>
            <div>Gratuit et sans inscription !</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNoAuth;
