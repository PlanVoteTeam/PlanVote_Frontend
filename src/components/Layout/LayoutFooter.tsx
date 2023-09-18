import "./LayoutFooter.scss";

function LayoutFooter() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="columns">
          <div className="column">
            <ul>
              <li>
                <a className="footerCredit" href="/">
                  © Plan & Vote - 2023
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            <ul className="footerLinkList">
              <li className="footerLink">TERMES</li>
              <li className="footerLink">POLITIQUE RELATIVE AUX COOKIES</li>
              <li className="footerLink">POLITIQUE DE CONFIDENTIALITÉ</li>
              <li className="footerLink">LICENCE</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LayoutFooter;
