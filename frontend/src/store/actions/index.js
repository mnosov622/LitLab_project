export const logIn = () => {
  return {
    type: "LOGIN",
  };
};

export const logInAsLearner = () => {
  return {
    type: "LOGIN_AS_LEARNER",
  };
};

export const Allcourses = (object) => ({
  type: "STORE_OBJECT",
  payload: object,
});
