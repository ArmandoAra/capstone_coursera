import React, { useState, useReducer } from "react";

// Components
import BookingForm from "../components/form/bookingForm";
export const initialTimes = [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

// Definimos el reducer que manejará las acciones
export function timesReducer(state, action) {
  switch (action.type) {
    case "RESET_TIMES":
      return initialTimes;
    case "UPDATE_TIMES":
      return state.filter((time) => time !== action.payload);
    default:
      return state;
  }
}

const BookingPage = () => {
  const currentDay = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(currentDay);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  const [availableTimes, dispatch] = useReducer(timesReducer, initialTimes);

  // Función para resetear las horas a las iniciales
  function initializeTimes() {
    dispatch({ type: "RESET_TIMES" });
  }

  // Función para eliminar la hora seleccionada
  function updateTimes(time) {
    dispatch({ type: "UPDATE_TIMES", payload: time });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time !== "") {
      updateTimes(time);
    } else {
      updateTimes(availableTimes[0]);
    }
    setTime("");
    // initializeTimes();
    console.log("Date: ", date);
    console.log("Time: ", availableTimes[0]);
    console.log("Guests: ", guests);
    console.log("Occasion: ", occasion);
  };

  return (
    <>
      <BookingForm
        availableTimes={availableTimes}
        actualDate={date}
        setDate={setDate}
        setTime={setTime}
        setGuests={setGuests}
        setOccasion={setOccasion}
        updateTimes={updateTimes}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default BookingPage;
