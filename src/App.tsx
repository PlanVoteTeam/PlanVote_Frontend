import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetail from "./components/Event/EventDetail";
import LandingNoAuth from "./components/LandingNoAuth/LandingNoAuth";
import "./style.scss";
import EventFinish from "./components/EventFinish/EventFinish";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<LandingNoAuth />} />
          <Route path="/" element={<LandingNoAuth />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/events/finish/:eventId" element={<EventFinish />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
