import classes from './featuredCategory.module.css'
import trickShot from '../../../assets/trickshot.webp'
import footwork from '../../../assets/footwork.webp'
import defense from '../../../assets/defense.webp'
import backhand from '../../../assets/backhandSmash.webp'
import { useNavigate } from 'react-router-dom'
const FeaturedCategory = () => {
    const navigate = useNavigate();
    const clickHandler=(category)=>{
        navigate(`/explore/?type=${category}`);
    }
    return (
        <div className={classes["container"]}>
        <h1 className="text-white">Featured Categories</h1>
        <div className={classes["featured-category"]}>
            <div className={classes["featured-item"]} onClick={()=>clickHandler("trickshot")}><img src={trickShot} alt="trickshot" /><h3 className="text-white">Trickshot</h3></div>
            <div className={classes["featured-item"]} onClick={()=>clickHandler("footwork")}><img src={footwork} alt="footwork"/><h3 className="text-white">Footwork</h3></div>
            <div className={classes["featured-item"]} onClick={()=>clickHandler("defense")}><img src={defense} alt="defense"/><h3 className="text-white">Defense</h3></div>
            <div className={classes["featured-item"]} onClick={()=>clickHandler("bio-mechanics")}><img src={backhand} alt="bio-mechanics"/><h3 className="text-white">Bio-Mechanics</h3></div>
        </div>
        </div>
    )
}

export default FeaturedCategory
