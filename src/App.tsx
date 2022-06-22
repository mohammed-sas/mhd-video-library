import "./App.css";
import { Navbar, RequireAuth } from "./components";
import { Routes, Route } from "react-router";
import {
  Home,
  Login,
  Signup,
  VideoListing,
  Playlist,
  Liked,
  SingleVideo,
  History,
  WatchLater,
  SpecificPlaylist,
  NotFound
} from "./pages";
import Profile from "./pages/profile/Profile";
function App():JSX.Element {
  return (
    <div className="App bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<VideoListing />} />
        <Route path="/explore/:videoId" element={<SingleVideo />} />
        <Route
          path="/playlists/:playlistId"
          element={
            <RequireAuth>
              <SpecificPlaylist />
            </RequireAuth>
          }
        />
        <Route
          path="/playlists"
          element={
            <RequireAuth>
              <Playlist />
            </RequireAuth>
          }
        />
        <Route
          path="/liked"
          element={
            <RequireAuth>
              <Liked />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route
          path="/watchlater"
          element={
            <RequireAuth>
              <WatchLater />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
