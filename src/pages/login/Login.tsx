import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate, useLocation, Location } from "react-router-dom";
import {
  useAuth,
  useNotes,
  usePlaylist,
  useWatchLater,
  useHistory,
  useLike,
} from "../../context";
type LocationProps = {
  state: {
    from: Location;
  };
};
const Login = () => {
  const authCtx = useAuth();
  const navigate = useNavigate();

  const location = useLocation() as unknown as LocationProps;
  const historyCtx = useHistory();
  const likeCtx = useLike();
  const playlistCtx = usePlaylist();
  const watchLaterCtx = useWatchLater();
  const notesCtx = useNotes();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const updateUserData = () => {
    historyCtx?.historyDispatch({ type: "UPDATE", payload: [] });
    likeCtx?.likeDispatch({ type: "UPDATE", payload: [] });
    notesCtx?.notesDispatch({ type: "UPDATE", payload: [] });
    playlistCtx?.playlistDispatch({ type: "UPDATE", payload: [] });
    watchLaterCtx?.watchLaterDispatch({ type: "UPDATE", payload: [] });
  };
  const submitHandler = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      let status = await authCtx?.login(user);

      if (status === 200) {
        updateUserData();
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      }
    } catch (error) {}
  };
  const guestHandler = async () => {
    try {
      let guestUser = {
        email: "mohammed@gmail.com",
        password: "test12345678@",
      };
      let status = await authCtx?.login(guestUser);
      if (status) {
        updateUserData();
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="login-container ">
      <div className="login-form-container bg-black ">
        <h2 className="centered-text text-white">Login</h2>
        <form action="post" className="login-form" onSubmit={submitHandler}>
          <label htmlFor="email" className="text-white">
            Email address
            <br />{" "}
            <input
              id="email"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="abc@neog.com"
            />
          </label>

          <label htmlFor="password" className="text-white">
            Password
            <br />{" "}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="*******"
            />
          </label>

          <div className="remember-me-container">
            <label htmlFor="remember-me" className="text-white">
              <input id="remember-me" type="checkbox" /> Remember me
            </label>
            <span>
              <a href="" className="text-primary">
                Forgot Your Password?
              </a>
            </span>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary bg-primary text-grey"
          />
          <button
            className="btn btn-secondary bg-secondary"
            onClick={guestHandler}
          >
            Login as Guest
          </button>
          <div>
            <p className="centered-text ">
              <Link to="/signup" className="text-primary">
                Create New Account <i className="fas fa-chevron-right"></i>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
