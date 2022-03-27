import classes from './singleVideo.module.css'
import SideNavbar from '../../components/side navbar/SideNavbar';

const SingleVideo = ({video}) => {
    return (
        <main className={classes["single-video-container"]}>
            <SideNavbar/>
            <div className={classes["video-container"]}>
                
            </div>
        </main>
    )
}

export default SingleVideo
