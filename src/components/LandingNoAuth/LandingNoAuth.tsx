import { useState } from 'react';
import './LandingNoAuth.scss'

const LandingNoAuth = () => {

  const [nameEvent, setNameEvent] = useState<string>();

  const handleChangeEvent = (event: any) => {
    setNameEvent(event.currentTarget.value)
  }

  const handleSumbit = (event: any) => {
    event.preventDefault();
    alert(nameEvent)
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
  