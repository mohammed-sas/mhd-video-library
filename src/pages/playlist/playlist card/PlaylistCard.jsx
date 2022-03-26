import { useNavigate } from 'react-router-dom'
import classes from './playlistCard.module.css'

const PlaylistCard = ({list}) => {
    const navigate = useNavigate();
    return (
        <div className={classes["playlist-card"]} onClick={()=>navigate(`/playlists/${list._id}`)}>
            {list.title}
        </div>
    )
}

export default PlaylistCard
