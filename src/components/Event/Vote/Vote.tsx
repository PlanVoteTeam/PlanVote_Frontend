import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiUrl } from "../../../../config"
import './Vote.scss';

const Vote = (props) => {
  const { eventId } = useParams()
  const [destVote, setDestVote] = useState<Array<string>>([]);
  const [numberStar, setNumberStar] = useState<Array<number>>([1, 2, 3, 4, 5])

  useEffect(() => {
    if (props.idParticipant !== undefined) {
      fetch(
        apiUrl + `events/${eventId}/participants/${props.idParticipant}/votes`,
        {
          method: "GET",
          headers: {

          },
          mode: "cors"
        }
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.length !== 0) {
            response[0].destinations.map((vote: any) => {
              destVote.push(vote._id);
              for (let i = 1; i <= vote.votes.note; i++) {
                document.getElementById(vote.name + i)?.classList.add('has-text-warning')
              }
            })
          }
        })
    }

  }, [props.idParticipant])

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

    let isNewVote = true;
    destVote.map((idDestationVote) => {
      console.log(idDestationVote, idDestination)
      if (idDestationVote === idDestination) {
        isNewVote = false;
      }
    })

    if (isNewVote) {
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
          destVote.push(idDestination)
        })
        .catch((error) => {
          console.log(error)
        });
    }
    else {
      fetch(
        apiUrl + `events/${eventId}/participants/${idParticipantCreateur}/destinations/${idDestination}/votes`,
        {
          method: "PATCH",
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
          console.log(error)
        });
    }

  }

  return (
    <div key={props.dest._id}>
      <div className="icon-text">
        {
          numberStar.map(star => {
            return (
              <button key={props.dest.name + star} className="vote__button icon" id={props.dest.name + star} onClick={() => vote(props.dest.name + star, props.dest._id)}>
                <i className="fas fa-star"></i>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
export default Vote