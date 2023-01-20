import { combineReducers } from "redux";
import { loggedIn } from "./login";

export const allReducers = combineReducers({
  loggedIn,
});
