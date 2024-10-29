import React from "react";
import "./bookingForm.css";

import CustomButton from "../buttons/customButton";
import { isValidDate, checkFormData } from "../../utils/tools";

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
      <form onSubmit={submitForm} aria-labelledby="booking-title">
        <h2 id="booking-title" className="booking-title">
          Book a Table
        </h2>

        {/* Date */}
        <div className="input-container">
          <label htmlFor="res-date">Choose date</label>
          <input
            onChange={(e) =>
              isValidDate(e.target.value)
                ? setDate(e.target.value)
                : (window.alert("Invalid date"), setDate(actualDate))
            }
            type="date"
            id="res-date"
            value={actualDate}
            aria-required="true"
            aria-describedby="date-help"
          />
          <p id="date-help" className="help-text">
            Select a valid date for your reservation.
          </p>
        </div>

        {/* Time */}
        <div className="input-container">
          <label htmlFor="res-time">Choose time</label>
          <select
            className={
              availableTimes?.length === 0
                ? "disabled-select"
                : "enabled-select"
            }
            disabled={availableTimes?.length === 0}
            id="res-time"
            value={time}
            required={true}
            onChange={(e) => setTime(e.target.value)}
            aria-live="polite"
            aria-describedby="time-help"
          >
            {availableTimes?.length === 0 ? (
              <option
                style={{ color: "red", backgroundColor: "blue" }}
                value=""
              >
                Unavailable tables
              </option>
            ) : (
              availableTimes?.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))
            )}
          </select>
          <p id="time-help" className="help-text">
            Select an available time for your booking.
          </p>
        </div>

        {/* Guests */}
        <div className="input-container">
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            min={1}
            max={10}
            id="guests"
            value={guests}
            onChange={(e) => {
              const value = e.target.value;
              if (value < 1 || value > 10) {
                e.target.setAttribute("aria-invalid", "true");
                e.target.setAttribute("aria-describedby", "guests-error");
              } else {
                e.target.removeAttribute("aria-invalid");
                e.target.removeAttribute("aria-describedby");
                setGuests(value);
              }
            }}
            aria-describedby="guests-help"
          />
          <p id="guests-help" className="help-text">
            Enter the number of guests (1-10).
          </p>
        </div>

        {/* Occasion */}
        <div className="input-container">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            aria-describedby="occasion-help"
          >
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Wedding</option>
            <option>Business</option>
            <option>Other</option>
          </select>
          <p id="occasion-help" className="help-text">
            Select the occasion for your reservation.
          </p>
        </div>

        <CustomButton
          title="Book a Table"
          background={
            checkFormData(actualDate, availableTimes, guests, occasion)
              ? "#f4ce14"
              : "grey"
          }
          isDisabled={
            !checkFormData(actualDate, availableTimes, guests, occasion)
          }
          type="submit"
          onClick={
            checkFormData(actualDate, availableTimes, guests, occasion)
              ? submitForm
              : null
          }
        />
      </form>
    </>
  );
};

export default BookingForm;

// TODO: Change the alert to a modal
