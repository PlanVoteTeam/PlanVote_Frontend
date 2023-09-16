
import { useEffect, useState } from "react";
import "./EventFinish.scss";
import { useParams } from "react-router";
import { apiUrl } from "../../../config";
import { Calendar } from "react-multi-date-picker";

const EventFinish = () => {

    const { eventId } = useParams();

    const [bestDestinations, setBestDestination] = useState()
    const [bestDate, setBestDate] = useState()

    useEffect(() => {
        console.log(eventId)
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
    }, [eventId])

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
    </div>
  );
};

export default EventFinish;
