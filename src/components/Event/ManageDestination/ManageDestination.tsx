import { useState, useRef, useEffect } from "react";
import { apiUrl } from "../../../../config";
import "./ManageDestination.scss";
import {
  REQUIRED_DESTINATION_NAME,
  EVENT_ADD_DESTINATION_PLACEHOLDER,
} from "../../../utils/constants";
import { IParticipant, IDestination } from "../../../utils/interface";
import Vote from "../Vote/Vote";
import Picker from "emoji-picker-react";

interface ManageDestinationProps {
  eventId: string;
  currentParticipant: IParticipant | null;
  destinationsList: IDestination[];
  setDestinationsList: React.Dispatch<React.SetStateAction<IDestination[]>>;
  participantsList: IParticipant[];
  setParticipantsList: React.Dispatch<React.SetStateAction<IParticipant[]>>;
  idParticipant: string | undefined;
}

function ManageDestination({
  eventId,
  currentParticipant,
  destinationsList,
  setDestinationsList,
  participantsList,
  setParticipantsList,
  idParticipant,
}: ManageDestinationProps) {
  const [nameDestination, setNameDestination] = useState<string>("");
  const [chosenEmoji, setChosenEmoji] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isError] = useState<boolean>(false);
  const [isErrorForm, setIsErrorFrom] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fermer la fenêtre des émojis si on clique en dehors
    function handleClickOutside(event: any) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeEvent = (event: any) => {
    setNameDestination(event.currentTarget.value);
  };

  const onEmojiClick = (event: any) => {
    setChosenEmoji(event.emoji);
    setShowEmojiPicker(false);
  };
  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameDestination) {
      changeColorInputRefFromBlueToRed();
      setIsErrorFrom(true);
      return;
    }

    changeColorInputRefFromRedToBlue();
    setIsErrorFrom(false);

    if (currentParticipant != null) {
      const idParticipant = currentParticipant?._id;
      const formData = new URLSearchParams();
      formData.append("name", nameDestination);
      formData.append("img", chosenEmoji ? chosenEmoji : "");
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
          method: "POST",
          mode: "cors",
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
      setChosenEmoji("");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de la destination à l'événement",
        error
      );
    }
  };

  // change color of inputref to red
  const changeColorInputRefFromBlueToRed = () => {
    // Set input from blue to red
    inputRef.current?.classList.remove("is-primary");
    inputRef.current?.classList.add("is-danger");

    // Set text from blue to red
    inputRef.current?.classList.remove("has-text-primary");
    inputRef.current?.classList.add("has-text-danger");
  };

  // change color of inputref to blue
  const changeColorInputRefFromRedToBlue = () => {
    // Set input from blue to red
    inputRef.current?.classList.remove("is-danger");
    inputRef.current?.classList.add("is-primary");

    // Set text from blue to red
    inputRef.current?.classList.remove("has-text-danger");
    inputRef.current?.classList.add("has-text-primary");
  };

  return (
    <div>
      {isError ? (
        <div className="notification is-danger">
          Une erreur est survenu, veuillez réessayer plus tard.
        </div>
      ) : null}

      {/* Add destination form */}

      <form
        className="is-flex addDestination__form"
        onSubmit={handleSumbit}
      >
        {showEmojiPicker && (
          <div ref={emojiPickerRef}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <div>
          {chosenEmoji ? (
            <span
              className="m-2 is-size-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {chosenEmoji}
            </span>
          ) : null}
        </div>

        <div className="field has-addons is-align-items-flex-end">
          <div className="control">
            <label>
              {!chosenEmoji ? (
                <a onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  🙂 Ajouter une icône
                </a>
              ) : null}
            </label>

            <input
              type="text"
              className="input is-primary has-text-primary"
              placeholder={EVENT_ADD_DESTINATION_PLACEHOLDER}
              value={nameDestination}
              onChange={handleChangeEvent}
              ref={inputRef}
              autoFocus
            />
            {isErrorForm ? (
              <span className="has-text-danger is-bold">
                {REQUIRED_DESTINATION_NAME}
              </span>
            ) : null}
          </div>

          <div className="control">
            <button
              className="button is-primary is-outlined mr-2"
              type="submit"
            >
              Ajouter une destination
            </button>
          </div>
        </div>
      </form>

      <h3 className="title mgt-medium mgb-medium">
        Liste des destinations proposées :
      </h3>

      {/* Display list of destinations */}
      <div className="addDestination__wrapper-card">
        {destinationsList && destinationsList.length > 0 ? (
          destinationsList.map((destination) => (
            <div className="card" key={destination._id}>
              <div className="card-image">
                <figure className="image is-size-1">
                  <div className="content">
                    {destination.img ? destination.img : "🌄"}
                  </div>
                </figure>
              </div>

              <div className="card-content">
                <div className="content">{destination.name}</div>
                <Vote
                  key={destination.name + destination._id}
                  dest={destination}
                  participants={participantsList}
                  idParticipant={idParticipant}
                />
              </div>
            </div>
          ))
        ) : (
          <div>Pas encore de destination 😮</div>
        )}
      </div>
    </div>
  );
}

export default ManageDestination;
