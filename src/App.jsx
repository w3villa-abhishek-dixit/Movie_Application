import React, { useState } from "react";
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
import { LanguageProvider } from "./Context/LanguageContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // State to manage search input

  return (
    <Provider store={store}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Navbar onSearch={setSearchKeyword} />
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/page/:id" element={<Page />} />
              <Route path="/home" element={<PrivateRoute><Home searchKeyword={searchKeyword} /></PrivateRoute>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;