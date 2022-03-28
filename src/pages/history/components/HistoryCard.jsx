import { useHistory } from '../../../context';
import classes from './historyCard.module.css';

const HistoryCard = ({video}) => {
    const {deleteHistory} = useHistory();
    const removeHandler=async (id)=>{
        try{
            await deleteHistory(id);
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className={classes["history-card"]}>
            <div className={classes["video-thumbnail"]}>
                <img src={video.videoThumbnail} alt={video.title} />
            </div>
            <div>
                <span className="text-white">{video.title}</span>
            </div>
            <button className="btn btn-primary bg-red" onClick={()=>removeHandler(video._id)}>Remove</button>
        </div>
    )
}

export default HistoryCard
