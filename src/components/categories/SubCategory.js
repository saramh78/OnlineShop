import classes from "./SubCategory.module.css";
import defaultImg from "../../assets/defaultImg.jpg";

const imageErrorHandler = (event) => {
  event.target.onerror = null;
  event.target.src = defaultImg;
};

const SubCategory = (props) => {
  return (
    <a href={`/${props.categoryslug}/${props.slug}`}>
      <div className={classes.subctg}>
        <div className={classes.img}>
          {console.log("image", props.image)}
          <img src={props.image} alt={props.name} onError={imageErrorHandler} />
        </div>
        <div className={classes.name}>{props.name}</div>
      </div>
    </a>
  );
};

export default SubCategory;
