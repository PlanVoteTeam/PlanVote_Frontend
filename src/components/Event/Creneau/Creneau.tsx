import { SetStateAction, useEffect, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { apiUrl } from "../../../../config";
import "./Creneau.scss"

interface CreneauProps {
    eventId: string;
    participantId: string | undefined
}

function Creneau({eventId, participantId}: CreneauProps) {
    const [values, setValues] = useState<DateObject[]>([])
    const [inital, setInitial] = useState([])

    useEffect(() => {
      console.log('cocuou')
      if(participantId !== undefined) {
        fetch(apiUrl + `events/${eventId}/participants/${participantId}/timeSlots`, {
          method: "GET",
          headers: {},
          mode: "cors",
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.length != 0) {
            const tab: any = []
            response.forEach((element: any) => {
              tab.push([new Date(element.startDate), new Date(element.endDate)])
            });
            setValues(tab)
            setInitial(tab)
          }
          else {
            setValues([])
          }
        })
      }
    }, [participantId])

    const handleChangeDate = (event: any) => {
      setValues(event);
    };

    const addCreneau = () => {
      let newTab = []
      if(inital.length !== 0) {
        const numberNew = values.length - inital.length
        newTab = values.slice(-numberNew);
      }
      else {
        newTab = values
      }

    
      newTab.forEach(async (element: any) => {
            const startDate = element[0].year + "-" + (element[0].month.number.toString().length === 1 ? 0 + element[0].month.number.toString() : element[0].month.number)
                + "-" + (element[0].day.toString().length === 1 ? 0 + element[0].day.toString() : element[0].day)
                            
            const endDate = element[1].year + "-" + (element[1].month.number.toString().length === 1 ? 0 + element[1].month.number.toString() : element[0].month.number)
            + "-" + (element[1].day.toString().length === 1 ? 0 + element[1].day.toString() : element[1].day)

            const response = await fetch(
                    apiUrl + `events/${eventId}/participants/${participantId}/timeSlots`,
                    {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                        },
                        body: JSON.stringify({
                            startDate: startDate,
                            endDate: endDate
                        })
                    }
            )
        })
    }

  return (
    <div>
      <Calendar range multiple value={values} onChange={handleChangeDate} className="calendar"/>
      <button className="button is-primary" onClick={addCreneau}>Sauvegarder</button>
    </div>
  )
}

export default Creneau