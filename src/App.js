import React from "react";
import "./styles/App.css";
import Base from "./flow-screens/0_Base";
import ErrorScreen from "./flow-screens/Misc_Error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </div>
    </Router>
  );
}
