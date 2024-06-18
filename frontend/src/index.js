import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import User from './pages/User.jsx';
import Application1 from './pages/Application1.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/user/:username" element={<User/>}></Route>
        <Route path="/application/1" element={<Application1/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
);


