import { useState } from "react";
import { apiUrl } from "../../../../config";
import {
  EVENT_DESCRIPTION_BLANK_MESSAGE,
  EMOJI_EDIT,
} from "../../../utils/constants";
import { IEvent } from "../../../utils/interface";
import "./ManageDescription.scss";

interface ManageDescriptionProps {
  eventId: string;
  eventDescription: string;
  event: IEvent | null;
  setEvent?: React.Dispatch<React.SetStateAction<IEvent | null>>;
  setEventDescription: (description: string) => void;
}

function ManageDescription({
  eventId,
  eventDescription,
  event: eventObject,
  setEvent: setEventFunction,
  setEventDescription,
}: ManageDescriptionProps) {
  const [isEventDescriptionEditing, setIsEventDescriptionEditing] =
    useState(false);

  async function handleUpdateDescriptionEvent(
    eventId: string,
    newDescription: string
  ) {
    try {
      const response = await fetch(apiUrl + `events/${eventId}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newDescription }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update event description: ${response.status} ${response.statusText}`
        );
      }
      const updatedEvent = await response.json();

      if (setEventFunction) {
        setEventFunction(updatedEvent);
      }
      setEventDescription(updatedEvent.description);
      setIsEventDescriptionEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelEditEventDescriptionClick() {
    if (eventObject?.description) setEventDescription(eventObject.description);
    setIsEventDescriptionEditing(false);
  }

  function handleEditEventDescriptionClick() {
    setIsEventDescriptionEditing(true);
  }

  return (
    <div>
      {/* Description of event */}
      {isEventDescriptionEditing ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (eventId)
                handleUpdateDescriptionEvent(eventId, eventDescription);
            }}
          >
            <div className="field has-addons is-align-items-flex-end mobile">
              <div className="control control__mobile">
                <label>Description de l'évenement </label>
                <input
                  type="text"
                  className="input is-primary has-text-primary"
                  autoFocus
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>

              <div className="control  control__mobile">
                <button className="button is-primary is-outlined mr-2">
                  Enregistrer
                </button>
              </div>

              <div className="control  control__mobile">
                <button
                  className="button is-danger is-outlined"
                  onClick={handleCancelEditEventDescriptionClick}
                >
                  Annuler
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <a
            className="subtitle mt-5"
            onClick={handleEditEventDescriptionClick}
          >
            {/* If event description is blank, display a message */}
            {eventObject && eventObject.description
              ? EMOJI_EDIT +
                " " +
                eventObject.description.charAt(0).toUpperCase() +
                eventObject.description.slice(1)
              : EVENT_DESCRIPTION_BLANK_MESSAGE}
          </a>
        </div>
      )}
    </div>
  );
}

export default ManageDescription;
