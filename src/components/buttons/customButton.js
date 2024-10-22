import React from "react";
import "./customButton.css";

const customButton = ({ title, background, onClick }) => {
  return (
    <button style={{ backgroundColor: background }} onClick={onClick}>
      {title}
    </button>
  );
};

export default customButton;
