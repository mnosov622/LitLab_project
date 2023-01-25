import courses from "../../fakeData/courses.json";

const initialState = courses;

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_OBJECT":
      return { ...state, object: action.payload };
    default:
      return state;
  }
};
