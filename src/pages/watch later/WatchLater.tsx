import classes from "./watchLater.module.css";
import { useWatchLater } from "../../context";
import { SideNavbar, VideoCard } from "../../components";
const WatchLater = (): JSX.Element => {
  const watchLaterCtx = useWatchLater();
  return (
    <main className={classes["watchlater-container"]}>
      <SideNavbar />
      <div className={classes["watchlater-lists"]}>
        {watchLaterCtx?.watchLaterState.watchLater?.length == 0 && (
          <h2 className="text-white">No videos in watch later</h2>
        )}
        {watchLaterCtx?.watchLaterState.watchLater.map((video) => {
          return <VideoCard key={video._id} video={video} />;
        })}
      </div>
    </main>
  );
};

export default WatchLater;
