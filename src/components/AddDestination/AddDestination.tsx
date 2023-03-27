import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from '../../../config';

interface Participant {
    _id: number;
    name: string;
  }

const AddDestination = () => {
    const { eventId } = useParams();
    
    const [listDestination, setListDestination] = useState<Array<string>>([]);
    const [nameDestination, setNameDestination] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);


    useEffect(() => {
        setListDestination(['rome', 'strasbourg', 'nice'])
        /*fetch(apiUrl + ``, { mode: "cors" })
          .then((blob) => blob.json())
          .then((response) => {
            console.log(response)
            setListDestination(response);
          })
          .catch((error) => {
            console.error(error);
          });*/
      }, [eventId]);

      function getCurrentParticipantLocalStorage(): Participant | null {
        const storedParticipant = localStorage.getItem("currentParticipant");
        if (storedParticipant) {
          return JSON.parse(storedParticipant);
        }
        return null;
      }

    const handleChangeEvent = (event: any) => {
        setNameDestination(event.currentTarget.value)
    }

    const handleSumbit = (event: any) => {
        event.preventDefault();

        const idParticipant = getCurrentParticipantLocalStorage()?._id;

        const formData = new URLSearchParams();
        formData.append('name', nameDestination);
        formData.append('img', 'image')

        fetch(apiUrl + `events/${eventId}/participants/${idParticipant}/destinations`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: formData.toString(),
            mode: "cors"     
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.sucess === false) {
                setIsError(true)
            }
            else {
                setIsError(false)
            }
          })
          .catch((error) => {
            setIsError(true);
          });
    }

  return (
      <div>
        {isError ? 
            (
              <div className="notification is-danger">
                Une erreur est survenu, veuillez réessayer plus tard.
              </div>
            ) : (<div></div>)
          }
        {listDestination.map(dest => <p key={dest}> {dest} </p>)}
       <form className='is-flex is-flex-direction-row' onSubmit={handleSumbit}>
              <input className="input is-primary mr-3" type="text" placeholder="Rome" onChange={handleChangeEvent}></input>
              <button className="button is-primary" type='submit'>Ajout destination</button>
            </form>
      </div>
  );
};
  
export default AddDestination;
  