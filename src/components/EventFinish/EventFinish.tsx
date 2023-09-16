
import { useEffect, useState } from "react";
import "./EventFinish.scss";
import { useLocation, useParams } from "react-router";
import { apiUrl } from "../../../config";
import { Calendar } from "react-multi-date-picker";

const EventFinish = () => {

    const location = useLocation()
    const { eventId } = useParams();

    const [bestDestinations, setBestDestination] = useState()
    const [bestDate, setBestDate] = useState()

    useEffect(() => {
        console.log(eventId)
        console.log(location.state)
        if(location.state.step._id !== undefined) {
            const stepId = location.state.step._id
            fetch(apiUrl + `events/${eventId}/steps/${stepId}`, 
                {
                    method: "GET",
                    headers: {},
                    mode: "cors",
                }
            )
            .then((response) => response.json())
            .then((reponse) => {
                console.log('ici',reponse)
                setBestDestination(reponse.bestDestinations)
                console.log(reponse.glidingWindows[0].windows)
                setBestDate(reponse.glidingWindows[0].windows)
            })
        }
        else {
            refresh()
        }
    }, [eventId])


    function refresh() {
        fetch(apiUrl + `events/${eventId}/steps`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            mode: "cors"
        })
        .then((blob) => blob.json())
        .then((reponse) => {
            console.log(reponse.bestDestinations)
            setBestDestination(reponse.bestDestinations)
            console.log(reponse.glidingWindows[0].windows)
            setBestDate(reponse.glidingWindows[0].windows)
        })
    }

  return (
    <div>
        { bestDestinations ?
            bestDestinations.map((elem, index) => {
                return (
                    <div key={index}>
                        {elem.name}
                    </div>
                )
            })
            : ""
        }
        {
            bestDate ?
            bestDate.map((elem, index) => {
                return (
                    <div key={index}>
                        du {elem.startDate.slice(0, elem.startDate.length - 14)} au {elem.endDate.slice(0, elem.endDate.length - 14)}
                    </div>
                )
            })
            : ""
        }
        <button className="button is-primary" onClick={refresh}>Mise à jour</button>
    </div>
  );
};

export default EventFinish;
