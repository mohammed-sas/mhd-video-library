import { Video } from "context types/common.types";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useVideo } from "../../../context";
import classes from "./searchBar.module.css";

const Searchbar = ():JSX.Element => {
  const videoState = useVideo();
  const [searchList, setSearchList] = useState<Video[]|undefined>([]);
  const navigate = useNavigate();
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    let searchString = e.target.value.trim().toLowerCase();
    let queryLen = searchString.length;
    if (queryLen === 0) {
      setSearchList([]);
      return;
    }
    let lists = videoState?.videoLists.videos.filter((video:Video) => {
      return (
        video.category.substring(0, queryLen) === searchString ||
        video.title.toLowerCase().match(searchString)
      );
    });
    setSearchList(lists);
  };

  const clickHandler = (id:string) => {
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
        {searchList?.map((video) => {
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
