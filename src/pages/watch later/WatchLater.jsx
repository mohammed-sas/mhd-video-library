import classes from './watchLater.module.css'
import {useWatchLater} from '../../context'
import {SideNavbar,VideoCard} from '../../components'
const WatchLater = () => {
    const {watchLaterState} = useWatchLater();
  return (
    <main className={classes["watchlater-container"]}>
      <SideNavbar />
      <div className={classes["watchlater-lists"]}>
        {
            watchLaterState.watchLater.map(video=>{
                return <VideoCard key={video._id} video={video}/>
            })
        }
      </div>
    </main>
  );
};

export default WatchLater;
