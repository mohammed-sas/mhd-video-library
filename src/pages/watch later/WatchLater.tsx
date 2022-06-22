import classes from "./watchLater.module.css";
import { useWatchLater } from "../../context";
import { SideNavbar, VideoCard } from "../../components";
const WatchLater = ():JSX.Element => {
  const watchLaterCtx = useWatchLater();
  return (
    <main className={classes["watchlater-container"]}>
      <SideNavbar />
      <div className={classes["watchlater-lists"]}>
        {watchLaterCtx?.watchLaterState.watchLater.map((video) => {
          return <VideoCard key={video._id} video={video} />;
        })}
      </div>
    </main>
  );
};

export default WatchLater;
