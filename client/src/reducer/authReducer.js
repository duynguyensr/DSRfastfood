export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case "SET_AUTH":
      return {
        isAuthenticated,
        authLoading: false,
        user,
      };

    default:
      return;
  }
};
