import classes from './Banner.module.css';

const Banner = (props) => {
    return <div className={classes.banner}><img src={ props.deal.attachment.url} alt='banner'/></div>
};

export default Banner;