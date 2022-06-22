import classes from "./playlist.module.css";
import SideNavbar from "../../components/side navbar/SideNavbar";
import { usePlaylist } from "../../context/playlist-context";
import PlaylistCard from "./playlist card/PlaylistCard";
const Playlist = (): JSX.Element => {
  const playlistCtx = usePlaylist();
  return (
    <main className={classes["playlists-container"]}>
      <SideNavbar />

      <div className={classes["playlists"]}>
        {playlistCtx?.playlistState.playlists?.length === 0 && (
          <h2 className="text-white">Playlist is empty!</h2>
        )}
        {playlistCtx?.playlistState.playlists.map((list) => {
          return <PlaylistCard key={list._id} list={list} />;
        })}
      </div>
    </main>
  );
};

export default Playlist;
