import './LandingNoAuth.scss'

const LandingNoAuth = () => {
    return (
        <div>
          <div className='landing__background'>
            <div className='px-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center landing__wrapper'>
              <h1 className='mb-2 title is-1'>Plan & Vote</h1>
              <p className='mb-4 content is-small has-text-weight-light has-text-centered'>Organiser des vacances entre amis c'est compliqué. C'est pourquoi nous avons conçu Plan&nbsp;&&nbsp;Vote, la solution idéale pour planifier des vacances.</p>
              <div className='is-flex is-flex-direction-row'>
                <input className="input is-primary mr-3" type="text" placeholder="Nom de l'évènement"></input>
                <button className="button is-primary">Création</button>
              </div>
            </div>
          </div>
        </div>
    );
  };
  
  export default LandingNoAuth;
  