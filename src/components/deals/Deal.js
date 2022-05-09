import classes from "./Deal.module.css";
import defaultImg from "../../assets/defaultImg.jpg";
import { useParams } from "react-router-dom";

const Deal = (props) => {
  const params = useParams();
  const { categoryslug } = params;
  const { subcategoryslug } = params;

  const moreThanTen = "10+";
  const imageErrorHandler = (event) => {
    event.target.onerror = null;
    event.target.src = defaultImg;
  };

  return (
    <a href={`/${categoryslug}/${subcategoryslug}/${props.slug}`}>
      <div className={classes.deal}>
        <div className={classes.dealImg}>
          <img
            src={props.attachment.url}
            alt={props.short_name}
            onError={imageErrorHandler}
          />
        </div>
        <div className={classes.dealName}>{props.short_name}</div>
        <div className={classes.dealCount}>
          موجودی: {props.max_limit > 10 ? moreThanTen : props.max_limit}
        </div>
        <div className={classes.dealPrice}> {props.discounted_price} تومان</div>
      </div>
    </a>
  );
};

export default Deal;
