import classes from "./sideNavbar.module.css";
import { Link,NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
const SideNavbar = () => {
  const authState = useAuth();
  let active = {
    border: "1px solid var(--primary)",
    padding:"1rem",
    background:"var(--black-one)"
  };
  return (
    <aside className={classes["side-navbar"]}>
      <Link to="/" className={classes["home-icon"]}>
        <div>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </div>
      </Link>
      <NavLink style={({isActive})=>isActive ? active : {}} to="/explore" className={classes["explore-icon"]}>
        <div>
          <i className="fas fa-compass"></i>
          <span>Explore</span>
        </div>
      </NavLink>

      <NavLink style={({isActive})=>isActive ? active : {}} to={authState?.currentUserState.user ? "/playlists" : "/login"}>
        <div>
          <i className="fas fa-list"></i>
          <span>Playlist</span>
        </div>
      </NavLink>

      <NavLink style={({isActive})=>isActive ? active : {}} to={authState?.currentUserState.user ? "/liked" : "/login"}>
        <div>
          <i className="fas fa-thumbs-up"></i>
          <span>Liked</span>
        </div>
      </NavLink>
      <NavLink style={({isActive})=>isActive ? active : {}} to={authState?.currentUserState.user ? "/history" : "/login"}>
        <div>
          <i className="fas fa-history"></i>
          <span>History</span>
        </div>
      </NavLink>
      <NavLink style={({isActive})=>isActive ? active : {}} to={authState?.currentUserState.user ? "/watchlater" : "/login"}>
        <div>
          <i className="fas fa-bookmark"></i>
          <span>Watch later</span>
        </div>
      </NavLink>
    </aside>
  );
};

export default SideNavbar;
