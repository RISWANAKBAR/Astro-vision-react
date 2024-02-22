import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import "./App.css";

import Carousal from "./Components/Carousal";
import Registerform from "./Components/Registerform";
import Login from './Components/Login';
import Forgotpassword from './Components/Forgotpassword';
import Dashboard from './Components/Dashboard';
import Update from './Components/Update';
import Profile from './Components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Carousal/>} />
        <Route path="/register" element={<Registerform/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Forgot_password" element={<Forgotpassword/>} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/update" element={<Update/>} />
        <Route path="/profile/:id" element={<Profile />} />

        </Routes>
        {/* Add more routes as needed */}
      </div>
    </Router>
  );
}

export default App;
