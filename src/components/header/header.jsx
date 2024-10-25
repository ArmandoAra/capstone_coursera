import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

//Components
import CutomButton from "../buttons/customButton";

//Assets
const heroImage = require("../../assets/images/restauranfood.jpg");

export default function Header() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/booking");
  };
  return (
    <header>
      <span />
      <article>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <CutomButton
          title="Reserve a Table"
          background="#f4ce14"
          onClick={handleNavigate}
        />
      </article>
      <picture className="hero-image-container">
        <img className="hero-image" src={heroImage} alt="restaurant food" />
      </picture>
      <span />
    </header>
  );
}
