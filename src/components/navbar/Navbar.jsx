import logo from "../../assets/logo.webp";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import {useToggle} from '../../hooks/useToggle';
const Navbar = () => {
  const { currentUser,logout } = useAuth();
  const [showSideBar,setShowSidebar] = useToggle(false);
  const logoutHandler=()=>{
    logout();
  }
  return (
    <nav className="nav-bar bg-black bottom-shadow width-auto">
      <i className={`fas fa-bars drawer-btn ${classes["hamburger-icon"]}`} onClick={setShowSidebar}></i>
      <div className={`nav-brand ${classes["nav-brand-lib"]}`}>
        <h2 className="text-primary">MHD</h2>
        <small className="text-primary">Video Library</small>
      </div>
      <div className="search-bar">
        <i className="fas fa-search text-primary"></i>
        <input
          type="text"
          className="bg-black text-white"
          placeholder="Search..."
        />
      </div>
      <div id={classes["side-bar"]} className={`nav-links ${(showSideBar ? classes["active"] : "")}`}>
        <ul>
          <li>
            {currentUser ? (
              <span className="text-white">{currentUser.firstName}</span>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary bg-primary text-grey">
                  Login
                </button>
              </Link>
            )}
          </li>
          <li>
            <div>
              <span>Explore</span>
            </div>
          </li>
          <li>
            <div>
              <span>Playlist</span>
            </div>
          </li>
          <li>
            {currentUser ? <button className="btn btn-secondary" onClick={logoutHandler}>Logout</button> : null}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
