import { combineReducers } from "redux";
import { loggedIn } from "./login";
import { loggedInAsLearner } from "./loginAsLearner";

export const allReducers = combineReducers({
  loggedIn,
  loggedInAsLearner,
});
