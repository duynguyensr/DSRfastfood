import axios from "axios";
import { authReducer } from "../reducer/authReducer";
import { setAuthToken } from "../utils/setAuthToken";
import { apiURL, TOKEN_NAME } from "./constant";

const { createContext, useReducer, useEffect } = require("react");

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    authLoading: true,
    user: null,
  });

  const loadUser = async () => {
    if (localStorage[TOKEN_NAME]) {
      setAuthToken(localStorage[TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiURL}/auth/`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loginUser = async (loginForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, loginForm);
      if (response.data.success) {
        localStorage.setItem(TOKEN_NAME, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const register = async (registerForm) => {
    try {
      const response = await axios.post(
        `${apiURL}/auth/register`,
        registerForm
      );
      if (response.data.success) {
        localStorage.setItem(TOKEN_NAME, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  const authContextData = { authState, loginUser, register, logout };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
