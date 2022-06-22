import { Video } from 'context types/common.types';
import { useHistory } from '../../../context';
import classes from './historyCard.module.css';
type Prop={
    video:Video,
}
const HistoryCard = ({video}:Prop):JSX.Element => {
    const historyCtx= useHistory();
    const removeHandler=async (id:string)=>{
        try{
            await historyCtx?.deleteHistory(id);
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className={classes["history-card"]}>
            <div className={classes["card-body"]}>
                <div className={classes["video-thumbnail"]}>
                    <img src={video.videoThumbnail} alt={video.title} />
                </div>
                <div>
                    <span className={`text-white ${classes["video-title"]}`}>{video.title}</span>
                </div>
            </div>
            <button className="btn btn-primary bg-red" onClick={()=>removeHandler(video._id)}>Remove</button>
        </div>
    )
}

export default HistoryCard
