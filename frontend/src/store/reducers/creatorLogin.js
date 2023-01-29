export const creatorLogin = (state = false, action) => {
  switch (action.type) {
    case "LOGIN_AS_CREATOR":
      return !state;
    default:
      return state;
  }
};
