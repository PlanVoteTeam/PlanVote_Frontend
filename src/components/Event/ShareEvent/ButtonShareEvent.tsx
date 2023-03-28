import { useState } from "react";

interface ButtonShareEventProps {
  eventId: string;
}

function ButtonShareEvent({ eventId }: ButtonShareEventProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `${window.location.origin}/events/${eventId}`
    );
    setCopySuccess(true);
  }

  return (
    <div>
      <button className="button is-primary" onClick={copyToClipboard}>
        {copySuccess ? "📝 Copié !" : "Partager 🏹"}
      </button>
    </div>
  );
}

export default ButtonShareEvent;
