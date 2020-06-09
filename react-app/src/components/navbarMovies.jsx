import React from 'react';
import { NavLink, Link } from 'react-router-dom';
const NavbarMovies = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light">
      <Link to="/" className="navbar-brand">
        My Movies
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/customers" className="nav-link">
            Customers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/rentals" className="nav-link">
            Rentals
          </NavLink>
        </li>
        {user && (
          <React.Fragment>
            <li className="navbar-item">
              <NavLink to="/profile" className="nav-link">
                {user.name}
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/logout" className="nav-link">
                Logout
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {!user && (
          <React.Fragment>
            <li className="navbar-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavbarMovies;
