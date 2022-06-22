import classes from "./liked.module.css";
import SideNavbar from "../../components/side navbar/SideNavbar";
import { useLike } from "../../context/like-context";
import VideoCard from "../../components/video card/VideoCard";
const Liked = (): JSX.Element => {
  const likeContext = useLike();
  return (
    <main className={classes["likes-page"]}>
      <SideNavbar />
      <div className={classes["liked-video-container"]}>
        {likeContext?.likeState.likes?.length === 0 && (
          <h2 className="text-white">Liked videos are none</h2>
        )}
        {likeContext?.likeState.likes.map((video) => {
          return <VideoCard key={video._id} video={video} />;
        })}
      </div>
    </main>
  );
};

export default Liked;
