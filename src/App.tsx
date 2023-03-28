import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetail from "./components/Event/EventDetail";
import LandingNoAuth from "./components/LandingNoAuth/LandingNoAuth";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<LandingNoAuth />} />
          <Route path="/" element={<LandingNoAuth />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
