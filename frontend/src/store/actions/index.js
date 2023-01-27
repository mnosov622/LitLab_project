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

export const addToCart = (object) => ({
  type: "ADD_ITEM",
  payload: object,
});

export const buyNowItem = (object) => ({
  type: "BUY_NOW",
  payload: object,
});

export const itemsAmount = () => ({
  type: "ITEMS_AMOUNT",
});
