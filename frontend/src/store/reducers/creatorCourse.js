const initialState = [];

export const createdCourse = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_COURSE":
      return [...state, action.payload];
    default:
      return state;
  }
};
