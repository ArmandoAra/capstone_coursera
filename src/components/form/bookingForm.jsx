import React from "react";
import "./bookingForm.css";

import CustomButton from "../buttons/customButton";

const BookingForm = ({
  availableTimes,
  actualDate,
  setDate,
  setTime,
  guests,
  setGuests,
  setOccasion,
  handleSubmit,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="booking-title">Book a Table</h2>
        <div className="input-container">
          <label htmlFor="res-date">Choose date</label>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="res-date"
            value={actualDate}
            aria-required="true" // El campo es obligatorio
          />
        </div>

        <div className="input-container">
          <label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            value={availableTimes[0]}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            aria-live="polite" // Anuncia cambios en las opciones dinámicamente
          >
            {availableTimes?.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            min="1"
            max="10"
            id="guests"
            value={guests}
            onChange={(e) => {
              const value = e.target.value;
              if (value < 1 || value > 10) {
                e.target.setAttribute("aria-invalid", "true"); // Marca como inválido si no está dentro del rango
              } else {
                e.target.removeAttribute("aria-invalid"); // Remueve el error si el valor es correcto
              }
              setGuests(value);
            }}
            aria-required="true" // El campo es obligatorio
          />
        </div>

        <div className="input-container">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={"Birthday"}
            onChange={(e) => {
              setOccasion(e.target.value);
            }}
          >
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
        </div>

        <CustomButton
          title="Book a Table"
          background="#f4ce14"
          type="submit"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};

export default BookingForm;
