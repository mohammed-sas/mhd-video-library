import classes from "./profile.module.css";
import {useAuth} from '../../context'
import { useRef } from "react";
const Profile = () => {
    const {currentUser} = useAuth();
    const {user} = currentUser;
  return (
    <main class={classes["profile-container"]}>
      <div className={classes["profile-header"]}>
        <div className={classes["user-header"]}>
          <div className={classes["user-header-info"]}>
            <h3 className="text-white">{user.firstName} {user.lastName}</h3>
            <p className="text-white">{user.email}</p>
          </div>
        </div>
      </div>
      <div className={classes["profile-aside"]}>
        <div className={classes["profile-tabs"]}>
          <span className={`${classes["tab-item"]} text-white `}>
            <span className="text-white">Profile</span>
          </span>
        </div>
      </div>
      <div className={classes["profile-main"]}>
        <div className={classes["profile-overview"]}>
          <h2 className="text-white">Profile Details</h2>
          <div className={classes["profile-overview-item"]}>
            <span>Full Name </span>
            <span>{user.firstName} {user.lastName}</span>
          </div>
          <div className={classes["profile-overview-item"]}>
            <span>Mobile Number</span> <span>{user.mobile}</span>
          </div>
          <div className={classes["profile-overview-item"]}>
            <span>Email ID</span> <span>{user.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
