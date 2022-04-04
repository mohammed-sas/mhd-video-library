import classes from "../alert.module.css";
import {useState,useEffect} from 'react';
const InfoAlert = ({ message }) => {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    let id = setTimeout(() => {
      setHide(true);
    }, 1000);

    return () => clearTimeout(id);
  });
  return (
    <>
      {!hide && (
        <div class={"alert alert-info " + classes["top-6"]}>
          <i class="fas fa-info-circle"></i>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default InfoAlert;