export const adminLogin = (state = false, action) => {
  switch (action.type) {
    case "LOGIN_AS_ADMIN":
      return !state;
    default:
      return state;
  }
};
