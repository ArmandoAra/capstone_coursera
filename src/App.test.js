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

// Mock of localStorage
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("storeData", () => {
  it("should save the value in an array if localStorage is empty", () => {
    const value = { Date: "2023-10-31", Time: "12:00", Guests: 2 };

    storeData(value);

    const storedData = JSON.parse(localStorage.getItem("tableReserve"));
    expect(storedData).toEqual([value]);
  });

  it("should add the new value to the existing array if there is already data", () => {
    const initialData = [{ Date: "2023-10-30", Time: "10:00", Guests: 4 }];
    localStorage.setItem("tableReserve", JSON.stringify(initialData));

    const newValue = { Date: "2023-10-31", Time: "12:00", Guests: 2 };
    storeData(newValue);

    const storedData = JSON.parse(localStorage.getItem("tableReserve"));
    expect(storedData).toEqual([...initialData, newValue]);
  });

  it("should correctly handle previous data that is not in array format", () => {
    const singleData = { Date: "2023-10-30", Time: "10:00", Guests: 4 };
    localStorage.setItem("tableReserve", JSON.stringify(singleData));

    const newValue = { Date: "2023-10-31", Time: "12:00", Guests: 2 };
    storeData(newValue);

    const storedData = JSON.parse(localStorage.getItem("tableReserve"));
    expect(storedData).toEqual([singleData, newValue]);
  });
});

describe("timesReducer", () => {
  it("should return a state with the same format as initialTimes", () => {
    const currentState = ["17:00", "18:00", "19:00"]; // Possible current state
    const currentDay = new Date(); // Simulate the current date

    const data = fetchAPI(currentDay); // Get available times for the current day
    const action = { type: "INITIALIZE_TIMES", payload: data };

    const newState = timesReducer(currentState, action);
    // Verify that newState is an array
    expect(Array.isArray(newState)).toBe(true);

    // Verify that each element is a string in the HH:MM format
    newState.forEach((time) => {
      expect(typeof time).toBe("string");
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  it("should remove a time when UPDATE_TIMES is dispatched", () => {
    const currentState = ["17:00", "18:00", "19:00"];
    const action = { type: "UPDATE_TIMES", payload: "17:00" };

    const newState = timesReducer(currentState, action);

    expect(newState).toEqual(["18:00", "19:00"]); // Only "18:00" and "19:00" should remain
  });

  it("should return the current state for an unknown action type", () => {
    const currentState = ["17:00", "19:00"];
    const action = { type: "UNKNOWN_ACTION" };

    const newState = timesReducer(currentState, action);

    expect(newState).toEqual(currentState); // State should not change
  });
});

// Tests for the BookingPage component
describe("BookingPage", () => {
  it("should reset availableTimes to initialTimes when RESET_TIMES is dispatched", () => {
    const currentState = ["17:00", "18:00"];
    const action = { type: "RESET_TIMES" };

    const newState = timesReducer(currentState, action);

    // Verify that availableTimes was reset to initialTimes
    expect(newState).toEqual(initialTimes);
  });
});

// This works correctly
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

  test("displays an alert and resets to actualDate on invalid date", () => {
    global.alert = jest.fn();
    render(<BookingForm {...defaultProps} />);
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "invalid-date" } });
    expect(global.alert).toHaveBeenCalledWith("Invalid date");
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

    // Invalid form case (no valid date)
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "invalid-date" },
    });
    // Verify that the date resets to the current one
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput.value).toBe("2024-10-28");

    // Valid form case (valid date)
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
