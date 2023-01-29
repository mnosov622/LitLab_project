export const boughtCoursesReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_COURSES":
      return [...state, action.payload];
    default:
      return state;
  }
};
