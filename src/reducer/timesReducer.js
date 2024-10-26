import { initialTimes } from "../data/constants";

// Definimos el reducer que manejará las acciones
export function timesReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_TIMES":
      // eslint-disable-next-line no-undef
      return action.payload;
    case "UPDATE_TIMES":
      return state.filter((time) => time !== action.payload);
    case "RESET_TIMES":
      return initialTimes;
    default:
      return state;
  }
}
