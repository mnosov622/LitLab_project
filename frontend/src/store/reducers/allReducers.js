import { combineReducers } from "redux";
import { loggedIn } from "./login";
import { loggedInAsLearner } from "./loginAsLearner";
import { coursesReducer } from "./courses";
import { cartReducer } from "./addToCart";
import { buyCourseReducer } from "./buyCourseNow";
import { increaseItemsAmount } from "./itemsAmount";
import { creatorLogin } from "./creatorLogin";
import { createdCourse } from "./creatorCourse";
import { adminLogin } from "./loginAsAdmin";

export const allReducers = combineReducers({
  loggedIn,
  loggedInAsLearner,
  coursesReducer,
  cartReducer,
  buyCourseReducer,
  increaseItemsAmount,
  creatorLogin,
  createdCourse,
  adminLogin,
});
