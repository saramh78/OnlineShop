// import { useReducer } from "react";
// import CartContext from "./cart-context";

// const defaultCartState = {
//   items: [],
//   totalPrice: 0,
// };

// const localId = localStorage.getItem("localId");

// // const fetchBasket = async () => {
// //   const response = await fetch(
// //     `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${localId}/Basket.json`
// //   );

// //   const data = await response.json();

// //   if (!response.ok) {
// //     throw new Error(data.message || "authentication failed");
// //   }

// //   const transformedItems = [];

// //   console.log(data);
// //   // for (const deal in data) {
// //   //   const dealObj = {

// //   //     ...data[deal],
// //   //   };
// //   transformedItems.push(data);
// //   //}
// // };

// const updateBasket = async (deal) => {
//   const response = await fetch(
//     `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${localId}/Basket.json`,
//     {
//       method: "PUT",
//       body: JSON.stringify({}),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "authentication failed");
//   }

//   console.log("send data response:");
//   console.log(data);
// };

// const cartReducer = (state, action) => {
//   if (action.type === "ADD") {
//     const updatedTotalPrice = state.totalPrice + action.item.discounted_price;

//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.deal_id === action.item.deal_id
//     );
//     const existingCartItem = state.items[existingCartItemIndex];
//     let updatedItems;

//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         quantity: existingCartItem.quantity + 1,
//       };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItems = state.items.concat(action.item);
//     }

//     updateBasket(action.item).catch((err) => {
//       alert(err.message);
//     });

//     return {
//       items: updatedItems,
//       totalPrice: updatedTotalPrice,
//     };
//   }
//   if (action.type === "REMOVE") {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.deal_id === action.deal_id
//     );
//     const existingItem = state.items[existingCartItemIndex];
//     const updatedTotalPrice = state.totalPrice - existingItem.price;
//     let updatedItems;
//     if (existingItem.quantity === 1) {
//       updatedItems = state.items.filter(
//         (item) => item.deal_id !== action.deal_id
//       );
//     } else {
//       const updatedItem = {
//         ...existingItem,
//         amount: existingItem.quantity - 1,
//       };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }

//     updateBasket(action.item).catch((err) => {
//       alert(err.message);
//     });

//     return {
//       items: updatedItems,
//       totalPrice: updatedTotalPrice,
//     };
//   }

//   if (action.type === "FETCH") {
//     const response = fetch(
//       `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${localId}/Basket.json`
//     );

//     const data = response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "authentication failed");
//     }

//     const transformedItems = [];

//     console.log(data);
//     transformedItems.push(data);

//     return {
//       items: transformedItems,
//     totalPrice:state.totalPrice}
//   }

//   return defaultCartState;
// };

// export const CartProvider = (props) => {
//   const [cartState, dispatchCartAction] = useReducer(
//     cartReducer,
//     defaultCartState
//   );

//   const addItemToCartHandler = (item) => {
//     dispatchCartAction({ type: "ADD", item: item });
//   };

//   const removeItemFromCartHandler = (deal_id) => {
//     dispatchCartAction({ type: "REMOVE", deal_id: deal_id });
//   };

//   const fetchBasketHandler = () => {
//     dispatchCartAction({ type: "FETCH" });
//   };

//   const cartContext = {
//     items: cartState.items,
//     totalPrice: cartState.totalPrice,
//     addItem: addItemToCartHandler,
//     removeItem: removeItemFromCartHandler,
//     fetchBasket: fetchBasketHandler,
//   };

//   return (
//     <CartContext.Provider value={cartContext}>
//       {props.children}
//     </CartContext.Provider>
//   );
// };
