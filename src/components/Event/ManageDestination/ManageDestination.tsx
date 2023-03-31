import { useState, useRef } from "react";
import { apiUrl } from "../../../../config";
import "./ManageDestination.scss";
import { EVENT_ADD_DESTINATION_PLACEHOLDER } from "../../../utils/constants";
import { IParticipant, IDestination } from "../../../utils/interface";

interface ManageDestinationProps {
  eventId: string;
  currentParticipant: IParticipant | null;
  destinationsList: IDestination[];
  setDestinationsList: React.Dispatch<React.SetStateAction<IDestination[]>>;
  participantsList: IParticipant[];
  setParticipantsList: React.Dispatch<React.SetStateAction<IParticipant[]>>;
}

function ManageDestination({
  eventId,
  currentParticipant,
  destinationsList,
  setDestinationsList,
  participantsList,
  setParticipantsList,
}: ManageDestinationProps) {
  const [nameDestination, setNameDestination] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeEvent = (event: any) => {
    setNameDestination(event.currentTarget.value);
  };

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameDestination) {
      changeColorInputRefFromBlueToPink();
      return;
    }

    changeColorInputRefFromPinkToBlue();

    if (currentParticipant != null) {
      const idParticipant = currentParticipant?._id;
      const formData = new URLSearchParams();
      formData.append("name", nameDestination);
      formData.append("img", "image");
      if (eventId && idParticipant && formData) {
        addDestinationToEvent(eventId, idParticipant, formData);
      }
    }
  };

  // Add new destination to event
  const addDestinationToEvent = async (
    eventId: string,
    participantId: string,
    formData: URLSearchParams
  ) => {
    try {
      const response = await fetch(
        apiUrl + `events/${eventId}/participants/${participantId}/destinations`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json();
      setParticipantsList(data.participants);
      setDestinationsList(
        participantsList.flatMap((participant) => participant.destinations)
      );

      setNameDestination("");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de la destination à l'événement",
        error
      );
    }
  };

  // change color of inputref to pink
  const changeColorInputRefFromBlueToPink = () => {
    // Set input from blue to pink
    inputRef.current?.classList.remove("is-primary");
    inputRef.current?.classList.add("is-link");

    // Set text from blue to pink
    inputRef.current?.classList.remove("has-text-primary");
    inputRef.current?.classList.add("has-text-link");
  };

  // change color of inputref to blue
  const changeColorInputRefFromPinkToBlue = () => {
    // Set input from blue to pink
    inputRef.current?.classList.remove("is-link");
    inputRef.current?.classList.add("is-primary");

    // Set text from blue to pink
    inputRef.current?.classList.remove("has-text-link");
    inputRef.current?.classList.add("has-text-primary");
  };

  return (
    <div>
      {isError ? (
        <div className="notification is-danger">
          Une erreur est survenu, veuillez réessayer plus tard.
        </div>
      ) : (
        <div></div>
      )}
      <div className="addDestination__wrapper-card">
        {destinationsList && destinationsList.length > 0 ? (
          destinationsList.map((destination) => (
            <div className="card" key={destination._id}>
              <div className="card-image">
                <figure className="image is-128x128">
                  <img
                    src="https://bulma.io/images/placeholders/128x128.png"
                    alt="Placeholder "
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">{destination.name}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No destinations found.</div>
        )}
      </div>

      <form
        className="is-flex is-flex-direction-row addDestination__form"
        onSubmit={handleSumbit}
      >
        <input
          className="input is-primary mr-3"
          type="text"
          placeholder={EVENT_ADD_DESTINATION_PLACEHOLDER}
          value={nameDestination}
          onChange={handleChangeEvent}
          ref={inputRef}
        ></input>
        <button className="button is-primary" type="submit">
          Ajouter une destination
        </button>
      </form>
    </div>
  );
}

export default ManageDestination;
