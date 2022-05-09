import React, { useState } from "react";

const BasketContext = React.createContext({
  items: [],
  fetch: () => {},
  addToBasket: () => {},
});

export default BasketContext;

const localId = localStorage.getItem("localId");

export const BasketContextProvider = (props) => {
  const [basketItems, setBasketItems] = useState([]);

  const fetchHandler =async () => {
    const response = await fetch(
      `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${localId}/Basket.json`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "authentication failed");
    }

    //console.log(data);
    const transformedItems = [];

    for (const deal in data) {
      const dealObj = {
        ...data[deal],
      };
      transformedItems.push(dealObj);
    }

    const reducedArr = transformedItems.reduce((acc, cur) => {
      acc[cur.id]
        ? (acc[cur.id].quantity += cur.quantity)
        : (acc[cur.id] = cur);
      return acc;
    }, {});

    const output = Object.values(reducedArr);

     

    setBasketItems(output);

    console.log(basketItems);
  };

  const contextValue = {
    items: basketItems,
    fetch: fetchHandler,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {props.children}
    </BasketContext.Provider>
  );
};
