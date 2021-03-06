import classes from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useToggle } from "../../hooks/useToggle";
import Searchbar from "./searchbar/Searchbar";
import logo from "../../assets/logo.webp";
const Navbar = ():JSX.Element => {
  const authState = useAuth();

  const [showSideBar, setShowSidebar] = useToggle(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    authState?.logout();
  };
  return (
    <nav className="nav-bar bg-black bottom-shadow width-auto">
      <i
        className={`fas fa-bars drawer-btn ${classes["hamburger-icon"]}`}
        onClick={setShowSidebar}
      ></i>
      <div
        className={`nav-brand ${classes["nav-brand-lib"]}`}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" />
        <div className={classes["logo-header"]}>
          <h2 className="text-primary">MHD</h2>
          <small className="text-primary">Video Library</small>
        </div>
      </div>
      <Searchbar />
      <div
        className={`nav-links ${classes["drawer-lib"]} ${classes["side-bar"]} ${
          showSideBar ? classes["active"] : ""
        }`}
      >
        <ul>
          {showSideBar && (
            <li>
              <i
                className="fas fa-times text-white"
                onClick={setShowSidebar}
              ></i>
            </li>
          )}
          <li>
            {authState?.currentUserState.user ? (
              <Link to="/profile">
                {" "}
                <span className="text-white">{authState?.currentUserState.user.firstName}</span>
              </Link>
            ) : (
              <Link to="/login" onClick={() => showSideBar && setShowSidebar()}>
                <button className="btn btn-primary bg-primary text-grey">
                  Login
                </button>
              </Link>
            )}
          </li>
          <li>
            <Link
              to={authState?.currentUserState.user ? "/explore" : "/login"}
              onClick={() => showSideBar && setShowSidebar()}
            >
              <div>
                <span>Explore</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to={authState?.currentUserState.user ? "/playlists" : "/login"}
              onClick={() => showSideBar && setShowSidebar()}
            >
              <div>
                <span>Playlist</span>
              </div>
            </Link>
          </li>
          <li>
            {authState?.currentUserState.user ? (
              <button className="btn btn-secondary" onClick={logoutHandler}>
                Logout
              </button>
            ) : null}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
