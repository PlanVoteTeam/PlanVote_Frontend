import { useState } from "react";
import { apiUrl } from "../../../../config";
import { EVENT_NAME_BLANK_MESSAGE } from "../../../utils/constants";
import { IEvent } from "../../../utils/interface";

interface ManageNameProps {
  eventId: string;
  eventName: string;
  event: IEvent | null;
  setEvent?: React.Dispatch<React.SetStateAction<IEvent | null>>;
  setEventName: (name: string) => void;
}

function ManageName({
  eventId,
  eventName,
  event: eventObject,
  setEvent: setEventFunction,
  setEventName,
}: ManageNameProps) {
  const [isEventNameEditing, setIsEventNameEditing] = useState(false);

  async function handleUpdateNameEvent(eventId: string, newName: string) {
    try {
      const response = await fetch(apiUrl + `events/${eventId}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update event name: ${response.status} ${response.statusText}`
        );
      }
      const updatedEvent = await response.json();

      if (setEventFunction) {
        setEventFunction(updatedEvent);
      }

      setEventName(updatedEvent.name);
      setIsEventNameEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelEditEventNameClick() {
    if (eventObject?.name) setEventName(eventObject.name);
    setIsEventNameEditing(false);
  }

  function handleEditEventNameClick() {
    setIsEventNameEditing(true);
  }

  return (
    <div className="mb-2">
      <p className="title">
        <div className="is-flex">
          <span>Votre évenement :&nbsp;</span>

          {/* Name of event */}
          {isEventNameEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (eventId) handleUpdateNameEvent(eventId, eventName);
              }}
            >
              <div className="field has-addons">
                <div className="control">
                  <input
                    type="text"
                    className="input is-primary has-text-primary"
                    autoFocus
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="control">
                  <button className="button is-primary is-outlined mr-2">
                    Enregistrer
                  </button>
                </div>

                <div className="control">
                  <button
                    className="button is-danger is-outlined"
                    onClick={handleCancelEditEventNameClick}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <a
              className="has-text-primary is-large is-lowercase"
              onClick={handleEditEventNameClick}
            >
              {/* If event name is blank, display a message */}
              {eventObject && eventObject.name
                ? eventObject.name
                : EVENT_NAME_BLANK_MESSAGE}
            </a>
          )}
        </div>
      </p>
    </div>
  );
}

export default ManageName;
