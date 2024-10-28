import { initialTimes } from "../data/constants";
import { fetchAPI } from "../data/api";
import { filterTime } from "../utils/tools";

// Definimos el reducer que manejará las acciones
export function timesReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_TIMES":
      return action.payload;
    case "UPDATE_TIMES":
      return state.filter((time) => time !== action.payload);
    case "RESET_TIMES":
      return initialTimes;
    default:
      return state;
  }
}
