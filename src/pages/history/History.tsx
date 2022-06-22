import { SideNavbar } from "../../components";
import { useHistory } from "../../context";
import classes from "./history.module.css";
import HistoryCard from "./components/HistoryCard";
const History = ():JSX.Element => {
    const historyCtx = useHistory();
    const clearHistoryHandler=async ()=>{
        try{
          await historyCtx?.clearAllHistory();
        }catch(error){
          console.log(error);
        }
    }
  return (
    <main className={classes["history-page"]}>
      <SideNavbar />
      <div className={classes["history-container"]}>
          <div className={classes["history-header"]}>
              <h1 className="text-white">History</h1>
              <button className="btn btn-primary bg-red" onClick={clearHistoryHandler}>Clear History</button>
          </div>
          <div className={classes["history-lists"]}>
              {
                  historyCtx?.historyState.history.map(video=>{
                    return  <HistoryCard key={video._id} video={video}/>
                  })
              }
          </div>
      </div>
    </main>
  );
};

export default History;
