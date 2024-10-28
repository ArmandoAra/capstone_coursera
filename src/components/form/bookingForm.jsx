import React from "react";
import "./bookingForm.css";

import CustomButton from "../buttons/customButton";

const BookingForm = ({
  availableTimes,
  actualDate,
  setDate,
  setTime,
  time,
  guests,
  occasion,
  setGuests,
  setOccasion,
  submitForm,
}) => {
  return (
    <>
      <form onSubmit={submitForm}>
        <h2 className="booking-title">Book a Table</h2>
        {/* Date */}
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
        {/* Time */}
        <div className="input-container">
          <label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            value={time}
            required={true} // El campo es obligatorio
            onChange={(e) => {
              console.log(e.target.value);
              setTime(e.target.value);
            }}
            aria-live="polite" // Anuncia cambios en las opciones dinámicamente
          >
            {availableTimes?.map((time) => (
              <option key={time} value={time}>
                {time ? time : "No available times"}
              </option>
            ))}
          </select>
        </div>
        {/* Guests */}
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
        {/* Occasion */}
        <div className="input-container">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={occasion}
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
          onClick={submitForm}
        />
      </form>
    </>
  );
};

export default BookingForm;
