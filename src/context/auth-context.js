import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {authReducer} from '../reducer/authReducer';
let initialState = {
  user: null,
  token: null,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [currentUser,authDispatch]=useReducer(authReducer,{user:null});
  const navigate = useNavigate();
  const signUp = async (user) => {
    try {
      const response = await axios.post("/api/auth/signup", user);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.encodedToken);
        authDispatch({type:"SET_USER",payload:response.data.createdUser});
        navigate(-2);
      }
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (user) => {
    try {
      const response = await axios.post("/api/auth/login", user);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.encodedToken);
        authDispatch({type:"SET_USER",payload:response.data.foundUser});
      }
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.setItem("token", null);
    authDispatch({type:"DELETE_USER",payload:null});
    navigate("/");
  };

  return {
    currentUser,
    signUp,
    login,
    logout,
  };
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
