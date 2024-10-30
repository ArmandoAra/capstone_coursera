import React from "react";
import "./confirmedCard.css";

const confirmedCard = ({ bookingData }) => {
  const { Date, Time, Guests } = bookingData;

  return (
    <section className="card-container">
      <h2>Booking Confirmed</h2>
      <div className="card-body">
        <h3>Thank you for booking with us!</h3>
        <p>
          Your booking is confirmed for: <strong>{Date} </strong>
        </p>
        <p>
          Time: <strong>{Time}</strong>
        </p>
        <p>
          Number of guests: <strong>{Guests}</strong>
        </p>
      </div>
    </section>
  );
};

export default confirmedCard;
