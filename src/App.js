import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import VideoListing from "./pages/video listing/VideoListing";
import Playlist from "./pages/playlist/Playlist";
import SpecificPlaylist from "./pages/playlist/specific playlist/SpecificPlaylist";
import Mockman from "mockman-js";
import Liked from "./pages/liked/Liked";
import SingleVideo from "./pages/single video/SingleVideo";
import History from "./pages/history/History";

function App() {
  return (
    <div className="App bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<VideoListing />} />
        <Route path="/playlists" element={<Playlist />} />
        <Route path="/playlists/:playlistId" element={<SpecificPlaylist />} />
        <Route path="/liked" element={<Liked/>}/>
        <Route path="/explore/:videoId" element={<SingleVideo/>}/>
        <Route path ="/history" element={<History/>}/>
        <Route path="/mock-api" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
