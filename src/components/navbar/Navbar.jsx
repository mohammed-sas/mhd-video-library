import logo from "../../assets/logo.webp";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav-bar bg-black bottom-shadow width-auto">
      <i className="fas fa-bars drawer-btn"></i>
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
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/login">
              <button className="btn btn-primary bg-primary text-grey">
                Login
              </button>
            </Link>
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
