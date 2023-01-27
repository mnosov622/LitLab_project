export const loggedInAsLearner = (state = true, action) => {
  switch (action.type) {
    case "LOGIN_AS_LEARNER":
      return !state;
    default:
      return state;
  }
};
