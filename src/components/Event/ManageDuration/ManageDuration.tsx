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
  eventDurationMin: number;
  eventDurationMax: number;
  event: IEvent | null;
  setEvent?: React.Dispatch<React.SetStateAction<IEvent | null>>;
  setEventDurationMin: (min: number) => void;
  setEventDurationMax: (max: number) => void;
}

function ManageDuration({
  eventId,
  eventDurationMin,
  eventDurationMax,
  event: eventObject,
  setEvent: setEventFunction,
  setEventDurationMax,
  setEventDurationMin,
}: ManageDurationProps) {
  const [isEventDurationEditing, setIsEventDurationEditing] = useState(false);

  async function handleUpdateDurationEvent(
    eventId: string,
    minDuration: number,
    maxDuration: number
  ) {
    try {
      const response = await fetch(apiUrl + `events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          minDuration: minDuration,
          maxDuration: maxDuration,
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

      setEventDurationMin(updatedEvent.minDuration);
      setEventDurationMax(updatedEvent.maxDuration);
      setIsEventDurationEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelEditEventDurationClick() {
    if (eventObject?.minDuration) setEventDurationMin(eventObject.minDuration);
    if (eventObject?.maxDuration) setEventDurationMax(eventObject.maxDuration);
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
                  eventDurationMin,
                  eventDurationMax
                );
            }}
          >
            <div className="field has-addons is-align-items-flex-end">
              <div className="control input-width">
                <label>Durée min ➖ </label>
                <input
                  type="number"
                  className="input is-primary has-text-primary "
                  autoFocus
                  value={eventDurationMin}
                  onChange={(e) =>
                    setEventDurationMin(parseInt(e.target.value))
                  }
                />
              </div>
              <div className="control input-width">
                <label>Durée max ➕ </label>
                <input
                  type="number"
                  className="input is-primary has-text-primary"
                  autoFocus
                  value={eventDurationMax}
                  onChange={(e) =>
                    setEventDurationMax(parseInt(e.target.value))
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
            {eventObject && eventObject.minDuration && eventObject.maxDuration
              ? "Durée du voyage : " +
                eventObject.minDuration +
                " à " +
                eventObject.maxDuration +
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
