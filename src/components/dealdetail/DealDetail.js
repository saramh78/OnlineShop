import classes from "./DealDetail.module.css";
import DealProperty from "./DealProperty";
import defaultImg from "../../assets/defaultImg.jpg";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const DealDetail = (props) => {
  const authCtx = useContext(AuthContext);

  const [currentImage, setCurrentImage] = useState(props.deal.attachment[0]);

  const changeImageHandler = (event) => {
    console.log(imgs[event.target.id]);

    setCurrentImage(imgs[event.target.id].url.url);
  };

  const addToBasket = async () => {
    const response = await fetch(
      `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${authCtx.localId}/Basket.json`,
      {
        method: "POST",
        body: JSON.stringify({ quantity: 1, ...props.deal }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "authentication failed");
    }

    console.log(data);
  };

  const addToBasketHandler = () => {
    if (authCtx.isLoggedIn) {
      addToBasket().catch((err) => {
        alert(err.message);
      });
    }
  };

  const imgs = [];
  let i = 0;
  for (const img in props.deal.attachment) {
    imgs.push({
      item: (
        <span
          id={i}
          onClick={changeImageHandler}
          className={classes.dot}
        ></span>
      ),
      index: i,
      url: props.deal.attachment[i].url,
    });
    i++;
  }

  const imageErrorHandler = (event) => {
    event.target.onerror = null;
    event.target.src = defaultImg;
  };

  const moreThanTen = "10+";

  const properties = props.deal.properties.map((pr) => (
    <DealProperty title={pr.title} childprops={pr.childProperties} />
  ));

  return (
    <div className={classes.DealDetail}>
      <div className={classes.Img}>
        <img
          src={currentImage}
          onError={imageErrorHandler}
          alt={props.deal.name}
        ></img>
        <div className={classes.imgs}>{imgs.map((img) => img.item)}</div>
      </div>
      <div className={classes.DetailBox}>
        <div className={classes.name}> {props.deal.name}</div>
        <div className={classes.limit}>
          موجودی:{" "}
          {props.deal.max_limit > 10 ? moreThanTen : props.deal.max_limit}
        </div>

        <div className={classes.send}>
          <span>جزئیات ارسال: </span>
          {props.deal.delivery_text}
        </div>
        <div className={classes.description}>
          <span>توضیحات: </span>
          {props.deal.description}
        </div>
        <hr />
        <div className={classes.company}>
          {" "}
          <span>فروشگاه: </span>
          {props.deal.company.name}
        </div>
        <div className={classes.companyrating}>
          {" "}
          <span>امتیاز فروشگاه: </span>
          {props.deal.company.rating.average}
        </div>
        <hr />
        <div className={classes.properties}>{properties}</div>
      </div>
      <div className={classes.purchase}>
        <button className={classes.addtobasket} onClick={addToBasketHandler}>
          افزودن به سبد خرید
        </button>
        <div className={classes.price}>{props.deal.discounted_price} تومان</div>
      </div>
    </div>
  );
};

export default DealDetail;
