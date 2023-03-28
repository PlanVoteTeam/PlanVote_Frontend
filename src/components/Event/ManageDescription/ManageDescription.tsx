import { useState } from "react";
import { apiUrl } from "../../../../config";
import { EVENT_DESCRIPTION_BLANK_MESSAGE } from "../../../utils/constants";

interface Event {
  _id: string;
  name: string;
  description: string;
  participants: Participant[];
}

interface Participant {
  _id: number;
  name: string;
}

interface ManageDescriptionProps {
  eventId: string;
  eventDescription: string;
  event: Event | null;
  setEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  setEventDescription: (description: string) => void;
}

function ManageDescription({
  eventId,
  eventDescription,
  event,
  setEvent,
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
      setEvent(updatedEvent);
      setEventDescription(updatedEvent.description);
      setIsEventDescriptionEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelEditEventDescriptionClick() {
    if (event?.description) setEventDescription(event.description);
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
            <div className="field has-addons">
              <div className="control">
                <input
                  type="text"
                  className="input is-primary has-text-primary"
                  autoFocus
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
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
            {event && event.description
              ? event.description
              : EVENT_DESCRIPTION_BLANK_MESSAGE}
          </a>
        </div>
      )}
    </div>
  );
}

export default ManageDescription;
