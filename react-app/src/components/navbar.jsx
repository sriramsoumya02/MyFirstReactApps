import React from 'react';

const Navbar = ({ totalCounter }) => {
  console.log('Navbar-rendered');
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <a href="#" className="navbar-brand">
        Navbar <span className="badge badge-primary">{totalCounter}</span>
      </a>
    </nav>
  );
};

export default Navbar;
