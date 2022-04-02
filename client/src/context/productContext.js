import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { productReducer } from "../reducer/productReducer";
import { apiURL } from "./constant";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, {
    isLoading: true,
    products: [],
    product: null,
  });

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);

  const loadProduct = async () => {
    try {
      const response = await axios.get(`${apiURL}/product`);
      if (response.data.success) {
        dispatch({
          type: "LOAD_PRODUCT_SUCCESS",
          payload: response.data.products,
        });
      }
    } catch (error) {
      dispatch({ type: "LOAD_PRODUCT_FAIL" });
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(`${apiURL}/product`, newProduct);
      if (response.data.success) {
        dispatch({ type: "ADD_PRODUCT", payload: response.data.productInfo });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${apiURL}/product/${productId}`);
      if (response.data.success)
        dispatch({ type: "DELETE_PRODUCT", payload: productId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findProduct = async (productId) => {
    try {
      const response = await axios.get(`${apiURL}/product/find/${productId}`);
      if (response.data.success)
        dispatch({ type: "FIND_PRODUCT", payload: response.data.productInfo });
    } catch (error) {
      console.log(error);
    }
  };

  // Update post
  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `${apiURL}/product/${updatedProduct._id}`,
        updatedProduct
      );
      if (response.data.success) {
        dispatch({ type: "UPDATE_PRODUCT", payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const ProductContextData = {
    productState,
    loadProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    findProduct,
    showAddProduct,
    setShowAddProduct,
    showUpdateProduct,
    setShowUpdateProduct,
  };
  return (
    <ProductContext.Provider value={ProductContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
