import classes from "../alert.module.css";
import {useState,useEffect} from 'react';

type InfoProp={
  message:string
}
const InfoAlert = ({ message }:InfoProp):JSX.Element => {
  const [hide, setHide] = useState<boolean>(false);
  useEffect(() => {
    let id = setTimeout(() => {
      setHide(true);
    }, 1000);

    return () => clearTimeout(id);
  });
  return (
    <>
      {!hide && (
        <div className={"alert alert-info " + classes["top-6"]}>
          <i className="fas fa-info-circle"></i>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default InfoAlert;