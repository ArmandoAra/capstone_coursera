import React from "react";
import "./nav.css";

const logo = require("../../assets/logo/Logo.svg").default;

export default function Nav() {
  return (
    <nav>
      <picture>
        <img src={logo} alt="Little Lemon Logo" />
      </picture>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Menu</a>
        </li>
        <li>
          <a href="/booking">Reservations</a>
        </li>
        <li>
          <a href="/">Order Online</a>
        </li>
        <li>
          <a href="/">Login</a>
        </li>
      </ul>
    </nav>
  );
}
