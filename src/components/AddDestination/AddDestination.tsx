import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from '../../../config';
import './AddDestination.scss'

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
        fetch(apiUrl + `events/${eventId}`, { mode: "cors" })
            .then((blob) => blob.json())
            .then((response) => {
                const participants = response.participants;
                participants.map((participant: { destinations: any; }) => {
                    participant.destinations.map((dest: { name: any; }) => {
                        listDestination.push(dest.name)
                    })
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }, [eventId]);

    const getCurrentParticipantLocalStorage = (): Participant | null => {
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
                    const updateListDestination = [...listDestination, nameDestination]
                    setListDestination(updateListDestination)
                    setNameDestination("")
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
            <div className="addDestination__wrapper-card">
            {listDestination.map(dest => 
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            {dest}
                        </div>
                    </div>
                </div>
                )}
            </div>

            <form className='is-flex is-flex-direction-row addDestination__form' onSubmit={handleSumbit}>
                <input className="input is-primary mr-3" type="text" placeholder="Rome" value={nameDestination} onChange={handleChangeEvent}></input>
                <button className="button is-primary" type='submit'>Ajout destination</button>
            </form>
        </div>
    );
};

export default AddDestination;
