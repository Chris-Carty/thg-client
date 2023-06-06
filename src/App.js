import React from "react";
import "./styles/App.css";
import Base from "./flow-screens/0_Base";
import Status from "./status-screens/0_StatusBase";
import ErrorScreen from "./flow-screens/Misc_Error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/order" element={<Status />} />
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </div>
    </Router>
  );
}
