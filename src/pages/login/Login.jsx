import { useState } from "react";
import "./login.css";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useAuth,useNotes,usePlaylist,useWatchLater,useHistory,useLike } from "../../context";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {historyDispatch}=useHistory();
  const {likeDispatch} = useLike();
  const {playlistDispatch} = usePlaylist();
  const {watchLaterDispatch} = useWatchLater();
  const {notesDispatch} = useNotes();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
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
      let status = await login(user);

      if (status === 200){
        updateUserData();
        navigate(location?.state?.from?.pathname || -1, { replace: true });
      }  
    } catch (error) {}
  };
  const guestHandler = async () => {
    try {
      let guestUser = {
        email: "mohammed@gmail.com",
        password: "test12345678@",
      };
      let status = await login(guestUser);
      if (status) {
        updateUserData();
        navigate(location?.state?.from?.pathname || -1, { replace: true });
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
