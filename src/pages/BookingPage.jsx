import React, { useState, useReducer, useEffect } from "react";
import { submitAPI, fetchAPI } from "../data/api";
import { useNavigate } from "react-router-dom";

// Utils
import { filterTime } from "../utils/tools";

// Components
import BookingForm from "../components/form/bookingForm";

// Initial times
import { initialTimes } from "../data/constants";

// Reducer
import { timesReducer } from "../reducer/timesReducer";

import { storeData, getDateAndTime } from "../data/storage";

const currentDay = new Date().toISOString().split("T")[0];

const BookingPage = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(currentDay);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [bookingData, setBookingData] = useState([]);
  const [availableTimes, dispatch] = useReducer(timesReducer, initialTimes);

  // Función para resetear las horas a las iniciales haciendo fetch a la API
  function initializeTimes(date) {
    try {
      const dateObject = new Date(date);
      const timeArray = fetchAPI(dateObject);
      const newTimeArray = filterTime(date, bookingData, timeArray);
      console.log(newTimeArray);
      dispatch({ type: "INITIALIZE_TIMES", payload: newTimeArray });
    } catch (error) {
      console.log(error);
    }
  }

  // Función para eliminar la hora seleccionada
  function updateTimes(time) {
    dispatch({ type: "UPDATE_TIMES", payload: time });
  }

  useEffect(() => {
    // Obtener los datos de reservas al cargar el componente
    const storedData = getDateAndTime();
    console.log(storedData);
    if (storedData) {
      setBookingData(storedData);
    }
  }, []);

  // Este useEffect actualiza las horas disponibles cada vez que cambia la fecha o los datos de reserva
  useEffect(() => {
    setTime(availableTimes[0]); // Establece la primera hora disponible
    initializeTimes(date);
  }, [date, bookingData]);

  function submitForm(e) {
    e.preventDefault();
    updateTimes(time);
    const data = {
      Date: date,
      Time: time,
      Guests: guests,
      Occasion: occasion,
    };

    try {
      const response = submitAPI(data);
      storeData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <BookingForm
        availableTimes={availableTimes}
        actualDate={date}
        occasion={occasion}
        time={time}
        guests={guests}
        setDate={setDate}
        setTime={setTime}
        setGuests={setGuests}
        setOccasion={setOccasion}
        submitForm={submitForm}
      />
    </>
  );
};

export default BookingPage;
