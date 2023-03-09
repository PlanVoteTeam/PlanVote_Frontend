import { useState } from 'react';
import { apiUrl } from '../../../config';
import './LandingNoAuth.scss'
import { useNavigate } from "react-router-dom";

const LandingNoAuth = () => {
  const navigate = useNavigate();
  const [nameEvent, setNameEvent] = useState<string>('');

  const handleChangeEvent = (event: any) => {
    setNameEvent(event.currentTarget.value)
  }

  const handleSumbit = (event: any) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('name', nameEvent);

    fetch(apiUrl + `events`, {  
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formData.toString(),
      mode: "cors" 
    })
      .then((blob) => blob.json())
      .then((response) => {
        console.log(response);
        navigate('/events/' + response._id);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
      <div>
        <div className='landing__background'>
          <div className='px-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center landing__wrapper'>
            <h1 className='mb-2 title is-1'>Plan & Vote</h1>
            <p className='mb-4 content is-small has-text-weight-light has-text-centered'>Organiser des vacances entre amis c'est compliqué. C'est pourquoi nous avons conçu Plan&nbsp;&&nbsp;Vote, la solution idéale pour planifier des vacances.</p>
            <form className='is-flex is-flex-direction-row' onSubmit={handleSumbit}>
              <input className="input is-primary mr-3" type="text" placeholder="Nom de l'évènement" onChange={handleChangeEvent}></input>
              <button className="button is-primary" type='submit'>Création</button>
            </form>
          </div>
        </div>
      </div>
  );
};
  
export default LandingNoAuth;
  