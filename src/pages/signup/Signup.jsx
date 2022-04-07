import "./signup.css";
import "../login/login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useToggle } from "../../hooks/useToggle";
import { useAuth,useNotes,usePlaylist,useWatchLater,useHistory,useLike } from "../../context";
const Signup = () => {
  const navigate = useNavigate();
  const [showpass, setShowpass] = useToggle(false);
  const [showConfirmpass, setShowConfirmpass] = useToggle(false);
  const { signUp } = useAuth();
  const [passMatch, setPassMatch] = useState(true);
  const [passLen, setPassLen] = useState(true);
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const updateUserData=()=>{
    historyDispatch({type:"UPDATE",payload:[]});
    likeDispatch({type:"UPDATE",payload:[]});
    notesDispatch({type:"UPDATE",payload:[]});
    playlistDispatch({type:"UPDATE",payload:[]});
    watchLaterDispatch({type:"UPDATE",payload:[]});
  }
  const submitHandler = async (e) => {
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
      const status = await signUp(user);
      if (status === 201){
        updateUserData();
        navigate("/");
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
