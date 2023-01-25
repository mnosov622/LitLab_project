const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, object: action.payload };
    default:
      return state;
  }
};
