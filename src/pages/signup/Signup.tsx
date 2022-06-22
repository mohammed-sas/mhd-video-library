import "./signup.css";
import "../login/login.css";
import React, { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";
import { useAuth,useNotes,usePlaylist,useWatchLater,useHistory,useLike } from "../../context";
type LocationState = {
  from: {
    pathname: string;
  }
}

const Signup = ():JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showpass, setShowpass] = useToggle(false);
  const [showConfirmpass, setShowConfirmpass] = useToggle(false);
  const authCtx= useAuth();
  const [passMatch, setPassMatch] = useState<boolean>(true);
  const [passLen, setPassLen] = useState<boolean>(true);
  const historyCtx=useHistory();
  const likeCtx= useLike();
  const playlistCtx= usePlaylist();
  const watchLaterCtx= useWatchLater();
  const notesCtx = useNotes();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const updateUserData=()=>{
    historyCtx?.historyDispatch({type:"UPDATE",payload:[]});
    likeCtx?.likeDispatch({type:"UPDATE",payload:[]});
    notesCtx?.notesDispatch({type:"UPDATE",payload:[]});
    playlistCtx?.playlistDispatch({type:"UPDATE",payload:[]});
    watchLaterCtx?.watchLaterDispatch({type:"UPDATE",payload:[]});
  }
  const submitHandler = async (e:React.SyntheticEvent) => {
    try {
      e.preventDefault();
      if (user.password !== user.confirmPassword) {
        setPassMatch(false);
        return;
      }
      if (user.password.length < 8) {
        setPassLen(false);
        return;
      }
      const status = await authCtx?.signUp(user);
      if (status === 201){
        updateUserData();
        const from = (location.state as LocationState)?.from;
        navigate(from?.pathname || "/", { replace: true });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <main className="login-container">
      <div className="login-form-container bg-black ">
        <h2 className="centered-text text-white">Signup</h2>
        <form action="post" className="login-form" onSubmit={submitHandler}>
          <label className="text-white" htmlFor="email">
            <span>Email address</span>
            <input
              required
              id="email"
              name="email"
              onChange={changeHandler}
              type="email"
              placeholder="abc@neog.com"
            />
          </label>
          <label className="text-white" htmlFor="firstName">
            <span>First Name</span>
            <input
              id="firstName"
              name="firstName"
              required
              onChange={changeHandler}
              type="text"
              placeholder="First Name"
            />
          </label>
          <label className="text-white" htmlFor="lastName">
            <span>Last Name</span>
            <input
              id="lastName"
              name="lastName"
              required
              onChange={changeHandler}
              type="text"
              placeholder="Last Name"
            />
          </label>

          <label className="text-white" htmlFor="password">
            <span>Password</span>
            <div id="password" className="password">
              <input
                name="password"
                type={showpass ? "text" : "password"}
                required
                onChange={changeHandler}
              />
              <i
                onClick={setShowpass}
                className={"fas " + (showpass ? "fa-eye" : "fa-eye-slash")}
              ></i>
            </div>
          </label>
          <label className="text-white" htmlFor="confirmPassword">
            <span>Confirm Password</span>
            <div className="password">
              <input
                name="confirmPassword"
                type={showConfirmpass ? "text" : "password"}
                required
                onChange={changeHandler}
              />
              <i
                onClick={setShowConfirmpass}
                className={
                  "fas " + (showConfirmpass ? "fa-eye" : "fa-eye-slash")
                }
              ></i>
            </div>
          </label>
          {passMatch ? null : (
            <span className="mismatch">Passwords Not Matching</span>
          )}
          {passLen ? null : (
            <span className="mismatch">
              Password must have minimum of 8 characters
            </span>
          )}

          <div>
            <label htmlFor="accept-condition" className="text-white">
              <input id="accept-condition" required type="checkbox" /> I accept
              all Terms & Conditions
            </label>
          </div>
          <input
            type="submit"
            value="Create New Account"
            className="btn btn-primary bg-primary text-grey"
          />
          <div>
            <p className="centered-text">
              <Link to="/login" className="text-primary">
                Already have an account <i className="fas fa-chevron-right"></i>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
