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
  const [availableTimes, dispatch] = useReducer(timesReducer, initialTimes);
  const [date, setDate] = useState(currentDay);
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [bookingData, setBookingData] = useState([]);
  const [time, setTime] = useState(null);

  // Este useEffect actualiza las horas disponibles cada vez que cambia la fecha o los datos de reserva
  useEffect(() => {
    initializeTimes(date);
  }, [date, bookingData]);

  useEffect(() => {
    // Obtener los datos de reservas al cargar el componente
    const storedData = getDateAndTime();
    initializeTimes(date);

    if (storedData) {
      setBookingData(storedData);
    }
  }, []);

  // useEffect adicional para actualizar `time` cuando `availableTimes` cambie
  useEffect(() => {
    if (availableTimes.length > 0) {
      setTime(availableTimes[0]); // Configura `time` con la primera hora disponible
      console.log("Primera hora disponible:", availableTimes[0]);
    }
  }, [availableTimes]);

  // Función para resetear las horas a las iniciales haciendo fetch a la API
  function initializeTimes(date) {
    try {
      const dateObject = new Date(date); // Convertir la fecha a un objeto Date
      const timeArray = fetchAPI(dateObject); // Hacer fetch a la API devuelve un arreglo de horas random
      const newTimeArray = filterTime(date, bookingData, timeArray); // Filtrar las horas disponibles quitando las ocupadas
      dispatch({ type: "INITIALIZE_TIMES", payload: newTimeArray });
    } catch (error) {
      console.log(error);
    }
  }

  // Función para eliminar la hora seleccionada
  function updateTimes(time) {
    dispatch({ type: "UPDATE_TIMES", payload: time });
  }

  function submitForm(e) {
    e.preventDefault();
    const data = {
      Date: date,
      Time: time,
      Guests: guests,
      Occasion: occasion,
    };

    try {
      const response = submitAPI(data);
      storeData(data);
      navigate("/confirmedBooking");
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
