import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import EventDetail from "./components/EventDetail";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/event/id" element={<EventDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
