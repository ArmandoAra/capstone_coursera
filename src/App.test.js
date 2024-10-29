import React from "react";
import BookingForm from "../src/components/form/bookingForm";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

// Pruebas para initialTimes
import { fetchAPI } from "./data/api";
import { timesReducer } from "./reducer/timesReducer";
import { initialTimes } from "./data/constants";
import { storeData } from "./data/storage";

// Mock funciones de props
const mockSetDate = jest.fn();
const mockSetTime = jest.fn();
const mockSetGuests = jest.fn();
const mockSetOccasion = jest.fn();
const mockSubmitForm = jest.fn();

// Mock de localStorage
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
describe("storeData", () => {
  it("debería guardar el valor en un arreglo si localStorage está vacío", () => {
    const value = { Date: "2023-10-31", Time: "12:00", Guests: 2 };

    storeData(value);

    const storedData = JSON.parse(localStorage.getItem("tableReserve"));
    expect(storedData).toEqual([value]);
  });

  it("debería agregar el nuevo valor al arreglo existente si ya hay datos", () => {
    const initialData = [{ Date: "2023-10-30", Time: "10:00", Guests: 4 }];
    localStorage.setItem("tableReserve", JSON.stringify(initialData));

    const newValue = { Date: "2023-10-31", Time: "12:00", Guests: 2 };
    storeData(newValue);

    const storedData = JSON.parse(localStorage.getItem("tableReserve"));
    expect(storedData).toEqual([...initialData, newValue]);
  });

  it("debería manejar correctamente datos previos que no estén en formato de arreglo", () => {
    const singleData = { Date: "2023-10-30", Time: "10:00", Guests: 4 };
    localStorage.setItem("tableReserve", JSON.stringify(singleData));

    const newValue = { Date: "2023-10-31", Time: "12:00", Guests: 2 };
    storeData(newValue);

    const storedData = JSON.parse(localStorage.getItem("tableReserve"));
    expect(storedData).toEqual([singleData, newValue]);
  });
});

// Pruebas para timesReducer
// Esta prueba funciona correctamente
describe("timesReducer", () => {
  it("debería retornar un estado con el mismo formato que initialTimes", () => {
    const currentState = ["17:00", "18:00", "19:00"]; // Estado actual posible
    const currentDay = new Date(); //Simulamos la fecha actual

    const data = fetchAPI(currentDay); // Se obtienen las horas disponibles para el día actual
    const action = { type: "INITIALIZE_TIMES", payload: data };

    const newState = timesReducer(currentState, action);
    // Verifica que newState sea un array
    expect(Array.isArray(newState)).toBe(true);

    // Verifica que cada elemento sea un string en el formato HH:MM
    newState.forEach((time) => {
      expect(typeof time).toBe("string");
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
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
test("Renders the BookingForm heading", () => {
  render(<BookingForm />);

  const h2Element = screen.getByLabelText("Choose date");
  expect(h2Element).toBeInTheDocument();
});

describe("BookingForm Component", () => {
  const defaultProps = {
    availableTimes: ["12:00", "13:00", "14:00"],
    actualDate: "2024-10-28",
    setDate: mockSetDate,
    setTime: mockSetTime,
    time: "12:00",
    guests: 2,
    occasion: "Birthday",
    setGuests: mockSetGuests,
    setOccasion: mockSetOccasion,
    submitForm: mockSubmitForm,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls setDate when a valid date is entered", () => {
    render(<BookingForm {...defaultProps} />);
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "2024-11-01" } });
    expect(mockSetDate).toHaveBeenCalledWith("2024-11-01");
  });

  test("displays an alert and resets to actualDate on invalid date", () => {
    global.alert = jest.fn();
    render(<BookingForm {...defaultProps} />);
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "invalid-date" } });
    expect(global.alert).toHaveBeenCalledWith("Invalid date");
    expect(mockSetDate).toHaveBeenCalledWith("2024-10-28"); // actualDate
  });

  test("sets guests and validates number of guests within range", () => {
    render(<BookingForm {...defaultProps} />);
    const guestsInput = screen.getByLabelText(/number of guests/i);

    // Invalid guest number (out of range)
    fireEvent.change(guestsInput, { target: { value: "12" } });
    expect(guestsInput).toHaveAttribute("aria-invalid", "true");
    expect(mockSetGuests).not.toHaveBeenCalled();

    // Valid guest number
    fireEvent.change(guestsInput, { target: { value: "4" } });
    expect(guestsInput).not.toHaveAttribute("aria-invalid");
    expect(mockSetGuests).toHaveBeenCalledWith("4");
  });

  test("disables submit button if form data is invalid", () => {
    const { getByRole } = render(<BookingForm {...defaultProps} />);
    const submitButton = screen.getByRole("button", { name: /book a table/i });

    // Caso de formulario inválido (sin fecha válida)
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "invalid-date" },
    });
    // Verifica que la fecha se restablezca a la actual
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput.value).toBe("2024-10-28");

    // Caso de formulario válido (fecha válida)
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2024-10-28" },
    });
    expect(submitButton).toBeEnabled();
  });

  test("calls submitForm on valid form submission", () => {
    const { getByRole } = render(<BookingForm {...defaultProps} />);
    const submitButton = screen.getByRole("button", { name: /book a table/i });

    fireEvent.click(submitButton);
    expect(mockSubmitForm).toHaveBeenCalled();
  });
});
