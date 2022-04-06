import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router";
import Mockman from "mockman-js";
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
  SpecificPlaylist
} from "./pages";
import Profile from "./pages/profile/Profile";
function App() {
  return (
    <div className="App bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<VideoListing />} />
        <Route path="/explore/:videoId" element={<SingleVideo />} />
        <Route path="/playlists" element={<Playlist />} />
        <Route path="/playlists/:playlistId" element={<SpecificPlaylist />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/history" element={<History />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/mock-api" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
