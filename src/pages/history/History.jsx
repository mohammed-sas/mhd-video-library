import { SideNavbar } from "../../components";
import { useHistory } from "../../context";
import classes from "./history.module.css";
import HistoryCard from "./components/HistoryCard";
const History = () => {
    const {historyState} = useHistory();
    console.log(historyState)
  return (
    <main className={classes["history-page"]}>
      <SideNavbar />
      <div className={classes["history-container"]}>
          <div className={classes["history-header"]}>
              <h1 className="text-white">History</h1>
              <button className="btn btn-primary bg-red">Clear History</button>
          </div>
          <div className={classes["history-lists"]}>
              {
                  historyState.history.map(video=>{
                    return  <HistoryCard key={video._id} video={video}/>
                  })
              }
          </div>
      </div>
    </main>
  );
};

export default History;
