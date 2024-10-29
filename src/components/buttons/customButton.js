import React from "react";
import "./customButton.css";

const customButton = ({ title, background, onClick, isDisabled = false }) => {
  return (
    <button
      style={{ backgroundColor: background }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

export default customButton;
