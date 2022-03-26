import classes from './playlistCard.module.css'

const PlaylistCard = ({list}) => {
    return (
        <div className={classes["playlist-card"]}>
            {list.title}
        </div>
    )
}

export default PlaylistCard
