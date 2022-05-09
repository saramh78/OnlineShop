import { Fragment, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './BasketDealItem.module.css';

const BasketDealItem = (props) => {
  const authCtx = useContext(AuthContext);

  
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


  const addToCartHandler = () => {
  addToBasket().catch((err) => {
    alert(err.message);
  });
}

    return (
      <Fragment>
        <div className={classes.deal}>
          <div className={classes.name}>{props.deal.name}</div>
          <div className={classes.quantityprice}>
            قیمت: {props.deal.discounted_price * props.deal.quantity}
          </div>
          <div className={classes.quantityprice}>
            تعداد:{props.deal.quantity}
          </div>
          <div className={classes.actions}>
            <button>-</button>
            <button onClick={addToCartHandler}>+</button>
          </div>
        </div>
      </Fragment>
    );
}

export default BasketDealItem;