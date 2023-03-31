import { Link } from "react-router-dom";

function LayoutFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <p>© 2023</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LayoutFooter;
