import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authReducer } from "../reducer/authReducer";
import { Prop } from "../context types/common.types";
import {
  ContextInterface,
  LoginData,
  SignupData,
} from "../context types/auth.types";
let initialState = {
  user: null,
};

const AuthContext = createContext<ContextInterface | null>(null);

const AuthProvider = ({ children }: Prop) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [currentUserState, authDispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const signUp = async (user: SignupData): Promise<any> => {
    try {
      const response = await axios.post("/api/auth/signup", user);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.encodedToken);
        authDispatch({ type: "SET_USER", payload: response.data.createdUser });
        navigate(-2);
      }
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user: LoginData): Promise<any> => {
    try {
      const response = await axios.post("/api/auth/login", user);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.encodedToken);
        authDispatch({ type: "SET_USER", payload: response.data.foundUser });
      }
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.setItem("token", "");
    authDispatch({ type: "DELETE_USER", payload: null });
    navigate("/");
  };

  return {
    currentUserState,
    signUp,
    login,
    logout,
  };
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
