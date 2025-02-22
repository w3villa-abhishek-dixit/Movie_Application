import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Page from "./Components/Page";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Wishlist from "./Components/Wishlist";
import PrivateRoute from "./Components/PrivateRoute";
import AuthProvider from "./Context/AuthContext";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}> {/* Wrap the app with Redux Provider */}
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/page/:id" element={<Page />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};
export default App;