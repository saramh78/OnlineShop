import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const removeItemHandler = () => {};
  const addItemHandler = () => {};

  return (
    <li className={classes.item}>
      {/* <header>
        <h3>{short_name}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${discounted_price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div> */}
    </li>
  );
};

export default CartItem;
