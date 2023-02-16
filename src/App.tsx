import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

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
