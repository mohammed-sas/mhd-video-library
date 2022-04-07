import { useEffect, useState } from 'react';
import classes from '../alert.module.css';

const SuccessAlert = ({message}) => {
    const [hide,setHide] = useState(false);
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