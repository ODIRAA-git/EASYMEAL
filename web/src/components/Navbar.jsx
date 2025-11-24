import React from "react";
import "../index.css";

const Navbar = ({ onOpenLogin, onOpenSignup }) => {
  return (
    <>
      <nav
        className="w-full fixed top-0 z-20 shadow-md"
        style={{ backgroundColor: "#1e5a9e" }}
      >
        <div className="nav-header">
          <h1>
            EASYMEAL<span className="h1-span">No.1 Recipe Engine</span>
          </h1>

          <ul className="nav-item">
            <li onClick={onOpenSignup} style={{ cursor: 'pointer' }}>
              Signup
            </li>
            <li onClick={onOpenLogin} style={{ cursor: 'pointer' }}>
              Login
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
