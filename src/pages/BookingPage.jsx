import React, { useState, useReducer, useEffect } from "react";
import { submitAPI, fetchAPI } from "../data/api";

// Components
import BookingForm from "../components/form/bookingForm";

// Initial times
import { initialTimes } from "../data/constants";

// Reducer
import { timesReducer } from "../reducer/timesReducer";

const BookingPage = () => {
  const currentDay = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(currentDay);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [bookingData, setBookingData] = useState([]);

  const [availableTimes, dispatch] = useReducer(timesReducer, initialTimes);

  // Función para resetear las horas a las iniciales haciendo fetch a la API
  async function initializeTimes(date) {
    const dateObject = new Date(date);
    const data = fetchAPI(dateObject);
    dispatch({ type: "INITIALIZE_TIMES", payload: data });
  }

  // Función para eliminar la hora seleccionada
  async function updateTimes(time) {
    dispatch({ type: "UPDATE_TIMES", payload: time });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData([
      ...bookingData,
      {
        Date: date,
        Time: time,
        Guests: guests,
        Occasion: occasion,
      },
    ]);
  };

  useEffect(() => {
    if (time === "") {
      setTime(availableTimes[0]);
    }
    updateTimes(time);
    console.log(bookingData);
  }, [bookingData]);

  useEffect(() => {
    initializeTimes(date);
  }, [date]);

  return (
    <>
      <BookingForm
        availableTimes={availableTimes}
        actualDate={date}
        setDate={setDate}
        setTime={setTime}
        guests={guests}
        setGuests={setGuests}
        setOccasion={setOccasion}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default BookingPage;
