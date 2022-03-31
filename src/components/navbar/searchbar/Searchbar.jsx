import { useState } from "react";
import { useVideo } from "../../../context/";
import classes from './searchBar.module.css'

const Searchbar = () => {
    const {videoLists} = useVideo();
    const [searchList,setSearchList] = useState([]);
    const changeHandler=e=>{
        let query = e.target.value.trim();
        let lists = videoLists.videos.filter(video=>video.category === query);
        setSearchList(lists);
    }
  return (
    <div className={`search-bar ${classes["position-relative"]}`}>
      <i className="fas fa-search text-primary"></i>
      <input
        type="text"
        className="bg-black text-white"
        placeholder="Search..."
        onChange={changeHandler}
      />
      <ul className={classes["search-lists"]}>
          {
              searchList.map(video=>{
                  return(
                      <li>
                          <p className="text-white">{video.title}</p>
                          <small className="text-white">in {video.category}</small>
                      </li>
                  )
              })
          }
      </ul>
    </div>
  );
};

export default Searchbar;
