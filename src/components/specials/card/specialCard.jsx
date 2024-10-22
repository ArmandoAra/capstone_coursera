import React from "react";
import "./specialCard.css";
const deliveryIcon = require("../../../assets/icons/delivery.png");

const specialCard = ({ image, title, price, text }) => {
  return (
    <div className="specials">
      <img src={image} alt="special" />
      <div className="specials-header">
        <h3>{title}</h3>
        <p>{price}</p>
      </div>
      <p className="special-paragraph">{text}</p>
      <div>
        <a href="/" className="special-button">
          Order Delivery
          <img src={deliveryIcon} alt="little motobike" />
        </a>
      </div>
    </div>
  );
};

export default specialCard;
