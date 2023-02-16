import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
