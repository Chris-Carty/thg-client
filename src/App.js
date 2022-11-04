import React from 'react';
import './styles/App.css';
import Rvnu from './rvnu-flow-screens/0_RvnuBase';
import ErrorScreen from './rvnu-flow-screens/Misc_Error';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Rvnu/>}/>
          <Route path="*" element={<ErrorScreen/>}/>
        </Routes>
      </div>
    </Router>
  )
}

