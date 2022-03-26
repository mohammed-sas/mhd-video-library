import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes,Route } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import VideoListing from "./pages/video listing/VideoListing";
import Playlist from './pages/playlist/Playlist'
import SpecificPlaylist from "./pages/playlist/specific playlist/SpecificPlaylist";
import Mockman from 'mockman-js'

function App() {
  return (
    <div className="App bg-black">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/explore" element={<VideoListing/>} />
      <Route path="/playlists" element={<Playlist/>}/>
      <Route path="/playlists/:playlistId" element={<SpecificPlaylist/>}/>
      <Route path="/mock-api" element={<Mockman/>}/>
      </Routes>
    </div>
  );
}

export default App;
