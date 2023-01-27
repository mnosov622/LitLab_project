const initialState = [];

export const buyCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BUY_NOW":
      return [...state, action.payload];
    default:
      return state;
  }
};
