import { useState } from "react";
import { useParams } from "react-router-dom"
import { apiUrl } from "../../../../config"

const Vote = (props) => {
  const { eventId } = useParams()
  const [isError, setIsError] = useState<boolean>(false);

  const vote = (index: string, idDestination: string) => {
    for (let i = Number(index.slice(-1)); i >= 1; i--) {
      document.getElementById(index.slice(0, -1) + i)?.classList.add('has-text-warning')
    }
    for (let i = Number(index.slice(-1)) + 1; i <= 5; i++) {
      document.getElementById(index.slice(0, -1) + i)?.classList.remove('has-text-warning')
    }

    let idParticipantCreateur = ''
    props.participants.map((participant: { destinations: any[]; _id: string; }) => {
      participant.destinations.map((dest) => {
        if (dest._id === idDestination) {
          idParticipantCreateur = participant._id
        }
      })
    })

    const formData = new URLSearchParams();
    formData.append("participantId", props.idParticipant);
    formData.append("note", index.slice(-1));

    fetch(
      apiUrl + `events/${eventId}/participants/${idParticipantCreateur}/destinations/${idDestination}/votes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: formData.toString(),
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        setIsError(true);
      });
  }

  return (
    <div>
      {isError ? (
        <div className="notification is-danger">
          Une erreur est survenu, veuillez réessayer plus tard.
        </div>
      ) : (
        <div></div>
      )}

      <span className="icon-text">
        <button className="vote_button" id={props.dest.name + "1"} onClick={() => vote(props.dest.name + "1", props.dest._id)} className="icon">
          <i className="fas fa-star"></i>
        </button>
        <button className="vote_button" id={props.dest.name + "2"} onClick={() => vote(props.dest.name + "2", props.dest._id)} className="icon">
          <i className="fas fa-star"></i>
        </button>
        <button className="vote_button" id={props.dest.name + "3"} onClick={() => vote(props.dest.name + "3", props.dest._id)} className="icon">
          <i className="fas fa-star"></i>
        </button>
        <button className="vote_button" id={props.dest.name + "4"} onClick={() => vote(props.dest.name + "4", props.dest._id)} className="icon">
          <i className="fas fa-star"></i>
        </button>
        <button className="vote_button" id={props.dest.name + "5"} onClick={() => vote(props.dest.name + "5", props.dest._id)} className="icon">
          <i className="fas fa-star"></i>
        </button>
      </span>
    </div>
  )
}
export default Vote