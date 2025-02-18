import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="container-fluid">
      <div className="row abc">
        <div className="col-12">
          <NavLink to='/'>
          <img src="/assets/images/logo.png" alt="Logo" className='logo' />
          </NavLink>
        </div>
        <div className="text-light">
          Movie Application
        </div>
      </div>
    </div>
  );
};

export default Navbar;
