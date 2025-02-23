import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      onSearch(searchInput);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg px-3">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/home">
          <img src="/assets/images/logo.png" alt="Logo" className="logo" style={{ height: "80px" }} />
        </NavLink>

        {/* Hamburger Button for Mobile */}
        <button 
          className="navbar-toggler d-lg-none" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          {username ? (
            <ul className="navbar-nav align-items-center mx-auto text-center">
              <li className="nav-item">
                <NavLink className="nav-link text-white mx-3 fs-5" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="btn btn-outline-light mx-3 fs-5" to="/wishlist">
                  <i className="bi bi-heart-fill"></i> Wishlist
                </NavLink>
              </li>
              {/* Search Bar */}
              <li className="nav-item d-flex justify-content-center w-100">
                <input
                  type="text"
                  className="form-control form-control-lg me-2 w-75"
                  placeholder="Search movies..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn btn-primary btn-lg" onClick={handleSearch}>
                  <i className="bi bi-search"></i>
                </button>
              </li>
            </ul>
          ) : null}
        </div>

        {/* Right Side: Username and Logout OR Sign In & Sign Up */}
        <div className={`d-flex align-items-center ${isMenuOpen ? "flex-column text-center w-100" : "d-none d-lg-flex"}`}>
          {username ? (
            <>
              <span className="text-white me-3 fs-5">Logged in as <strong>{username}</strong></span>
              <button className="btn btn-danger px-4 py-2 fw-bold rounded" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-primary px-4 py-2 mx-2 fw-bold rounded" to="/">Sign In</NavLink>
              <NavLink className="btn btn-success px-4 py-2 mx-2 fw-bold rounded" to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
