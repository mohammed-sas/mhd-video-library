import classes from "./specificPlaylist.module.css";
import { useParams } from "react-router-dom";
import SideNavbar from "../../../components/side navbar/SideNavbar";
import { usePlaylist } from "../../../context/playlist-context";
import VideoCard from "../../../components/video card/VideoCard";

const SpecificPlaylist = () => {
  const { playlistState } = usePlaylist();
  const { playlistId } = useParams();
  return (
    <main className={classes["specific-playlist"]}>
      <SideNavbar />
      <div className={classes["lists"]}>
        {playlistState.playlists
          .filter((list) => list._id == playlistId)[0]
          .videos.map((video) => {
            return (
              <VideoCard
                key={video._id}
                video={video}
                playlistId={playlistId}
              />
            );
          })}
      </div>
    </main>
  );
};

export default SpecificPlaylist;
