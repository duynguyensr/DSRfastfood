export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_CART_SUCCESS":
      return {
        ...state,
        products: payload.products,
        userId: payload.userId,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        products: [...state.products, payload],
      };

    case "DELETE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== payload
        ),
      };
    case "UPDATE_FROM_CART":
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
