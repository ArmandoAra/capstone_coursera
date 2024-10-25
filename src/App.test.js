import React from "react";
import BookingForm from "../src/components/form/bookingForm";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingPage, { initialTimes, timesReducer } from "./pages/BookingPage";
import "@testing-library/jest-dom";

// Pruebas para timesReducer
// Esta prueba funciona correctamente
describe("timesReducer", () => {
  it("debería restablecer a los tiempos iniciales cuando se despacha RESET_TIMES", () => {
    const currentState = ["17:00", "19:00"];
    const action = { type: "RESET_TIMES" };

    const newState = timesReducer(currentState, action);

    expect(newState).toEqual(initialTimes); // Debe igualarse a initialTimes
  });

  it("debería eliminar una hora cuando se despacha UPDATE_TIMES", () => {
    const currentState = ["17:00", "18:00", "19:00"];
    const action = { type: "UPDATE_TIMES", payload: "17:00" };

    const newState = timesReducer(currentState, action);

    expect(newState).toEqual(["18:00", "19:00"]); // Solo debe quedar "18:00" y "19:00"
  });

  it("debería devolver el estado actual para un tipo de acción desconocido", () => {
    const currentState = ["17:00", "19:00"];
    const action = { type: "UNKNOWN_ACTION" };

    const newState = timesReducer(currentState, action);

    expect(newState).toEqual(currentState); // No debe cambiar el estado
  });
});

// // Pruebas para el componente BookingPage
describe("BookingPage", () => {
  it("debería restablecer availableTimes a initialTimes al despachar RESET_TIMES", () => {
    const currentState = ["17:00", "18:00"];
    const action = { type: "RESET_TIMES" };

    const newState = timesReducer(currentState, action);

    // Verificar que availableTimes se restableció a initialTimes
    expect(newState).toEqual(initialTimes);
  });
});

//

//Este funciona correctamente
// test("Renders the BookingForm heading", () => {
//   render(<BookingForm />);

//   const h2Element = screen.getByLabelText("Choose date");
//   expect(h2Element).toBeInTheDocument();
// });
