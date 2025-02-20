import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row abc align-items-center">
        {/* Logo */}
        <div className="col-6">
          <NavLink to="/home">
            <img src="/assets/images/logo.png" alt="Logo" className="logo" />
          </NavLink>
        </div>


        {/* Title */}
        <div className="col-6 text-light text-end">
          Movie Application
        </div>
      </div>

      {/* Navigation Links */}
      <div className="row mt-3">
        <div className="col-12 d-flex justify-content-end gap-3">
          <NavLink to="/" className="text-light text-decoration-none">Home</NavLink>
{/* 
          <NavLink to="/signin" className="text-light text-decoration-none">Sign In</NavLink> */}
              <NavLink to="/signup" className="text-light text-decoration-none">Sign Up</NavLink>
          
          {isAuthenticated ? (
            <>
              {/* <NavLink to="/dashboard" className="text-light text-decoration-none">Dashboard</NavLink> */}
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {/* <NavLink to="/signin" className="text-light text-decoration-none">Sign In</NavLink> */}
              <NavLink to="/signup" className="text-light text-decoration-none">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
