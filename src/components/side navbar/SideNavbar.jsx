import classes from "./sideNavbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
const SideNavbar = () => {
  const { currentUser } = useAuth();
  return (
    <aside className={classes["side-navbar"]}>
      <Link to="/" className={classes["home-icon"]}>
        <div>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </div>
      </Link>
      <Link to="/explore" className={classes["explore-icon"]}>
        <div>
          <i className="fas fa-compass"></i>
          <span>Explore</span>
        </div>
      </Link>

      <Link to={currentUser ? "/playlists" : "/login"}>
        <div>
          <i className="fas fa-list"></i>
          <span>Playlist</span>
        </div>
      </Link>

      <Link to={currentUser ? "/liked" : "/login"}>
        <div>
          <i className="fas fa-thumbs-up"></i>
          <span>Liked</span>
        </div>
      </Link>
      <Link to={currentUser ? "/history": "/login"}>
        <div>
          <i className="fas fa-history"></i>
          <span>History</span>
        </div>
      </Link>
    </aside>
  );
};

export default SideNavbar;
