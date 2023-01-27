export const increaseItemsAmount = (state = 0, action) => {
  switch (action.type) {
    case "ITEMS_AMOUNT":
      return state + 1;
    default:
      return state;
  }
};
