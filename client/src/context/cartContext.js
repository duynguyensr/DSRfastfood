import axios from "axios";
import { createContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";
import { apiURL } from "./constant";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    products: [],
    userId: null,
  });

  const loadCart = async (userId) => {
    try {
      const res = await axios.get(`${apiURL}/cart/find/${userId}`);
      if (res.data.success) {
        dispatch({ type: "LOAD_CART_SUCCESS", payload: res.data.cart });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createCart = async (userId) => {
    try {
      const res = await axios.post(`${apiURL}/cart`, {
        userId: `${userId}`,
        products: [],
      });
      if (res.data.success) {
        loadCart(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (product, userId) => {
    try {
      if (
        cartState.products.filter(
          (item) => item.productId === product.productId
        ).length === 0
      ) {
        const res = await axios.put(`${apiURL}/cart/${userId}`, {
          userId: userId,
          products: [...cartState.products, product],
        });
        if (res.data.success) {
          dispatch({ type: "ADD_TO_CART", payload: product });
          return {
            success: true,
            message: "Add to cart successfully",
            type: "success",
          };
        }
      } else
        return {
          success: false,
          message: "Already have in your cart",
          type: "warning",
        };
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteProduct = async (productId, userId) => {
  //   try {
  //     const res = await axios.put(`${apiURL}/cart/${userId}`, {
  //       userId: userId,
  //       products: cartState.products.filter(
  //         (product) => product.productId !== productId
  //       ),
  //     });
  //     if (res.data.success) {
  //       dispatch({ type: "DELETE_FROM_CART", payload: productId });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateCart = async (cartUpdate, userId) => {
    try {
      const res = await axios.put(`${apiURL}/cart/${userId}`, {
        userId: userId,
        products: cartUpdate,
      });
      if (res.data.success) {
        dispatch({ type: "UPDATE_FROM_CART", payload: cartUpdate });
        return {
          success: true,
          message: "Update cart successfully",
          type: "success",
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cartData = {
    cartState,
    createCart,
    addProduct,
    updateCart,
    loadCart,
  };

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
