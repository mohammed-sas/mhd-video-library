import classes from './sideNavbar.module.css';

const SideNavbar = () => {
    return (
        <aside className={classes["side-navbar"]}>
            <div>
            <i className="fas fa-home"></i>
            <span>Home</span>
            </div>
            <div>
            <i className="fas fa-compass"></i>
            <span>Explore</span>
            </div>
            <div>
            <i className="fas fa-list-music"></i>
            <span>Playlist</span>
            </div>
            <div>
            <i className="fas fa-thumbs-up"></i>
            <span>Liked</span>
            </div>
            <div>
            <i className="fas fa-history"></i>
            <span>History</span>
            </div>
        </aside>
    )
}

export default SideNavbar
