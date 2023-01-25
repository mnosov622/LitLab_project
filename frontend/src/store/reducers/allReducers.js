import { combineReducers } from "redux";
import { loggedIn } from "./login";
import { loggedInAsLearner } from "./loginAsLearner";
import { coursesReducer } from "./courses";

export const allReducers = combineReducers({
  loggedIn,
  loggedInAsLearner,
  coursesReducer,
});
