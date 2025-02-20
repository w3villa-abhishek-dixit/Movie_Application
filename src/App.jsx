import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Page from './Components/Page';
import Latest from './Components/Latest';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import AuthProvider from './Context/AuthContext'; // ✅ Import AuthProvider
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css';

const App = () => {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <BrowserRouter>
        <Navbar />
        {/* <Latest /> */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/page/:id" element={<Page />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
