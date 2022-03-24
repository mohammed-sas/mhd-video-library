import classes from './featuredCategory.module.css'
import trickShot from '../../../assets/trickshot.webp'
import footwork from '../../../assets/footwork.webp'
import defense from '../../../assets/defense.webp'
import backhand from '../../../assets/backhandSmash.webp'
const FeaturedCategory = () => {
    return (
        <div className={classes["container"]}>
        <h1 className="text-white">Featured Categories</h1>
        <div className={classes["featured-category"]}>
            <div className={classes["featured-item"]}><img src={trickShot} alt="trickshot" /><h3 className="text-white">Trickshot</h3></div>
            <div className={classes["featured-item"]}><img src={footwork} alt="footwork"/><h3 className="text-white">Footwork</h3></div>
            <div className={classes["featured-item"]}><img src={defense} alt="defense"/><h3 className="text-white">Defense</h3></div>
            <div className={classes["featured-item"]}><img src={backhand} alt="backhand"/><h3 className="text-white">Backhand Smash</h3></div>
        </div>
        </div>
    )
}

export default FeaturedCategory
