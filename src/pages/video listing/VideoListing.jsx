import classes from "./videoListing.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../../components/video card/VideoCard";
import SideNavbar from "../../components/side navbar/SideNavbar";
import { useToggle } from "../../hooks/useToggle";
import ActionsModal from "../../components/video actions modal/ActionsModal";
const VideoListing = () => {
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useToggle(false);
  const [playlistVideo, setPlaylistVideo] = useState(null);
  const [categoryVideos,setCategoryVideos] = useState([]);
  const [category,setCategory]=useState("all");
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        if (response.status === 200){
           setLists(response.data.videos)
           setCategoryVideos(response.data.videos);
          };
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);
  const categoryHandler=(category)=>{
    setCategory(category);
    if(category === "all"){
      setCategoryVideos(lists);
      return;
    }
    const result = lists.filter(video=>video.category === category);
    setCategoryVideos(result);
  }
  return (
    <main className={classes["listing-container"]}>
      <SideNavbar />
      <div className={classes["lists"]}>
        <div className={classes["filters"]}>
          <span className={`${classes["filter-category"]} ${category==="all" ? classes["active"] :""}`} onClick={()=>categoryHandler("all")}>All Categories</span>
          <span className={`${classes["filter-category"]} ${category==="trickshot" ? classes["active"] :""}`} onClick={()=>categoryHandler("trickshot")}>Trickshot</span>
          <span className={`${classes["filter-category"]} ${category==="defense" ? classes["active"] :""}`} onClick={()=>categoryHandler("defense")}>Defense</span>
          <span className={`${classes["filter-category"]} ${category==="bio-mechanics" ? classes["active"] :""}`} onClick={()=>categoryHandler("bio-mechanics")}>Bio-mechanics</span>
          <span className={`${classes["filter-category"]} ${category==="footwork" ? classes["active"] :""}`} onClick={()=>categoryHandler("footwork")}>Footwork</span>
        </div>
        <div className={classes["video-cards"]}>
          {categoryVideos.map((video) => {
            return (
              <VideoCard
                key={video._id}
                setPlaylistVideo={setPlaylistVideo}
                video={video}
                setShowModal={setShowModal}
              />
            );
          })}
        </div>
      </div>
      {showModal ? (
        <ActionsModal
          setPlaylistVideo={setPlaylistVideo}
          playlistVideo={playlistVideo}
          setShowModal={setShowModal}
        />
      ) : null}
    </main>
  );
};

export default VideoListing;
