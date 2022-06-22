import classes from "./profile.module.css";
import { useAuth } from "../../context";

const Profile = ():JSX.Element => {
  const authCtx = useAuth();

  return (
    <main className={classes["profile-container"]}>
      <div className={classes["profile-header"]}>
        <div className={classes["user-header"]}>
          <div className={classes["user-header-info"]}>
            <h3 className="text-white">
              {authCtx?.currentUserState?.user?.firstName}{" "}
              {authCtx?.currentUserState?.user?.lastName}
            </h3>
            <p className="text-white">
              {authCtx?.currentUserState?.user?.email}
            </p>
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
            <span>
              {authCtx?.currentUserState?.user?.firstName}{" "}
              {authCtx?.currentUserState?.user?.lastName}
            </span>
          </div>
          <div className={classes["profile-overview-item"]}>
            <span>Mobile Number</span>{" "}
            <span>{authCtx?.currentUserState?.user?.mobile}</span>
          </div>
          <div className={classes["profile-overview-item"]}>
            <span>Email ID</span>{" "}
            <span>{authCtx?.currentUserState?.user?.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
