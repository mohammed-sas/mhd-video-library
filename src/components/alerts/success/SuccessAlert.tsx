import { useEffect, useState } from 'react';
import classes from '../alert.module.css';

type SuccessProp={
  message:string
}
const SuccessAlert = ({message}:SuccessProp) => {
    const [hide,setHide] = useState<boolean>(false);
    useEffect(()=>{
        let id = setTimeout(()=>{
            setHide(true);
        },1000)

        return ()=>clearTimeout(id);
    })

  return (
      <>
    { !hide && <div className={"alert alert-success "+classes["top-6"]}>
      <i className="fas fa-check-circle"></i>
      <p>{message}</p>
    </div>}
    </>
  );
};

export default SuccessAlert;