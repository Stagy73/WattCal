import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <ul className="navUl">
          <li className="liNav">
            <Link className="aNav" to="/">
              Home
            </Link>
          </li>
          <li className="liNav">
            <Link className="aNav" to="/login">
              Login
            </Link>
          </li>
          <li className="liNav">
            <Link className="aNav" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
