import hero from '../../assets/astrox.png'
import FeaturedCategory from './featured categories/FeaturedCategory';
import classes from './home.module.css';
const Home = () => {
    return (
        <main className={`${classes["home-container"]} bg-black`}>
            <div className={`${classes["hero-container"]}  `}>
                <img src={hero} alt="hero-image" />
                <div className={classes["hero-body"]}>
                    <h2 className="text-white">Why and How of Badminton</h2>
                    <p className="text-white">If you want to learn tactical shots and excel in playing badminton then,</p>
                <button className="btn btn-primary bg-primary text-grey">Explore Now</button>
                </div>
            </div>
            <FeaturedCategory/>
        </main>
    )
}

export default Home;
