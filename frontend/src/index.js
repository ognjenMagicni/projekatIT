import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
);


