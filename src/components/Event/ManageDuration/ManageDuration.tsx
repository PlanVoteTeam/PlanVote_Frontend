import { useState } from "react";
import { apiUrl } from "../../../../config";
import {
  EMOJI_EDIT,
  EVENT_DURATION_BLANK_MESSAGE,
} from "../../../utils/constants";
import { IEvent } from "../../../utils/interface";
import "./ManageDuration.scss";

interface ManageDurationProps {
  eventId: string;
  eventDuration: number;
  event: IEvent | null;
  setEvent?: React.Dispatch<React.SetStateAction<IEvent | null>>;
  setEventDuration: (max: number) => void;
}

function ManageDuration({
  eventId,
  eventDuration,
  event: eventObject,
  setEvent: setEventFunction,
  setEventDuration,
}: ManageDurationProps) {
  const [isEventDurationEditing, setIsEventDurationEditing] = useState(false);

  async function handleUpdateDurationEvent(
    eventId: string,
    duration: number
  ) {
    try {
      const response = await fetch(apiUrl + `events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          minDuration: duration,
          maxDuration: duration,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update event duration: ${response.status} ${response.statusText}`
        );
      }

      const updatedEvent = await response.json();

      if (setEventFunction) {
        setEventFunction(updatedEvent);
      }

      setEventDuration(updatedEvent.minDuration);
      setIsEventDurationEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelEditEventDurationClick() {
    if (eventObject?.minDuration) setEventDuration(eventObject.minDuration);
    setIsEventDurationEditing(false);
  }

  function handleEditEventDurationClick() {
    setIsEventDurationEditing(true);
  }

  return (
    <div>
      {isEventDurationEditing ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (eventId)
                handleUpdateDurationEvent(
                  eventId,
                  eventDuration,
                );
            }}
          >
            <div className="field has-addons is-align-items-flex-end">
              <div className="control input-width">
                <label>Durée du séjour </label>
                <input
                  type="number"
                  className="input is-primary has-text-primary "
                  autoFocus
                  value={eventDuration}
                  onChange={(e) =>
                    setEventDuration(parseInt(e.target.value))
                  }
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
                  onClick={handleCancelEditEventDurationClick}
                >
                  Annuler
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <a className="subtitle mt-5" onClick={handleEditEventDurationClick}>
            {/* If event description is blank, display a message */}
            {eventObject && eventObject.minDuration
              ? "Durée du séjour : " +
                eventObject.minDuration +
                " jours " +
                EMOJI_EDIT
              : EVENT_DURATION_BLANK_MESSAGE}
          </a>
        </div>
      )}
    </div>
  );
}

export default ManageDuration;
