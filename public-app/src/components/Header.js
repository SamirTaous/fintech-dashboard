import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Banking App</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#solutions">Services</a></li>
          <li><a href="#loans">Loans</a></li>
          <li><a href="#cards">Credit Cards</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
