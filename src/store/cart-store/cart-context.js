import React from "react";

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: (items) => {},
  removeItem: (id) => { },
  fetchBasket:()=>{}
});

export default CartContext;
