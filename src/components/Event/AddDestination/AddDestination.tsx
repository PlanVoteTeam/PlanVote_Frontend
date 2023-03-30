import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../../config";
import "./AddDestination.scss";
import { EVENT_ADD_DESTINATION_PLACEHOLDER } from "../../../utils/constants";

interface Participant {
  _id: string;
  name: string;
  destinations: Destination[];
}

interface Destination {
  _id: string;
  name: string;
  img: string;
}

interface AddDestinationProps {
  eventId: string;
  destinationsList: Destination[];
  setDestinationsList: React.Dispatch<React.SetStateAction<Destination[]>>;
}

function AddDestination({
  eventId,
  destinationsList,
  setDestinationsList,
}: AddDestinationProps) {
  const [nameDestination, setNameDestination] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentParticipantLocalStorage = (): Participant | null => {
    const storedParticipant = localStorage.getItem("currentParticipant");
    if (storedParticipant) {
      return JSON.parse(storedParticipant);
    }
    return null;
  };

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

    const idParticipant = getCurrentParticipantLocalStorage()?._id;
    const formData = new URLSearchParams();
    formData.append("name", nameDestination);
    formData.append("img", "image");
    if (eventId && idParticipant && formData) {
      addDestinationToEvent(eventId, idParticipant, formData);
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
      setDestinationsList(data.destinations);

      // const destinations = data.destinations;
      // const lastDestination = destinations[destinations.length - 1];

      // const updatedDestinationsList = [
      //   ...destinationsList,
      //   {
      //     _id: lastDestination._id,
      //     name: lastDestination.name,
      //     img: lastDestination.img,
      //   },
      // ];
      // setDestinationsList(updatedDestinationsList);
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
    inputRef.current?.classList.remove("is-primary");
    inputRef.current?.classList.add("is-link");

    // Set text from blue to pink
    inputRef.current?.classList.remove("has-text-primary");
    inputRef.current?.classList.add("has-text-link");
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
        {listDestination.map((dest) => (
          <div className="card">
            <div className="card-image">
              <figure className="image is-128x128">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">{dest}</div>
            </div>
          </div>
        ))}
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
};

export default AddDestination;
