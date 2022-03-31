import { useState } from "react";
import { useNavigate } from "react-router";
import { useVideo } from "../../../context/";
import classes from "./searchBar.module.css";

const Searchbar = () => {
  const { videoLists } = useVideo();
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    let searchString = e.target.value.trim().toLowerCase();
    let queryLen = searchString.length;
    if (queryLen === 0) {
      setSearchList([]);
      return;
    }
    let lists = videoLists.videos.filter((video) => {
      return (
        video.category.substring(0, queryLen) === searchString ||
        video.title.toLowerCase().match(searchString)
      );
    });
    setSearchList(lists);
  };

  const clickHandler = (id) => {
    navigate(`/explore/${id}`);
    setSearchList([]);
  };
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
        {searchList.map((video) => {
          return (
            <li key={video._id} onClick={() => clickHandler(video._id)}>
              <p className="text-white">{video.title}</p>
              <small className="text-white">in {video.category}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Searchbar;
