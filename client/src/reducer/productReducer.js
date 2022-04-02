export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_PRODUCT_SUCCESS":
      return {
        ...state,
        products: payload,
        isLoading: false,
      };

    case "LOAD_PRODUCT_FAIL":
      return {
        ...state,
        products: [],
        isLoading: false,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, payload],
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };

    case "FIND_PRODUCT":
      return {
        ...state,
        product: payload,
      };

    case "UPDATE_PRODUCT":
      const newProducts = state.products.map((product) =>
        product._id === payload._id ? payload : product
      );
      return {
        ...state,
        products: newProducts,
      };

    default:
      return state;
  }
};
