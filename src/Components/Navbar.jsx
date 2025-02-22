import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/home">
        <img src="/assets/images/logo.png" alt="Logo" className="logo" style={{ height: "70px" }} />
      </NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link btn btn-primary mx-2 w-100" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn btn-primary btn-sm ms-3" to="/wishlist">Wishlist</NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link btn btn-primary btn-sm ms-3" to="/">Sign In</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn btn-primary btn-sm ms-3" to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
