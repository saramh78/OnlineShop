import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import HttpError from "../components/ui/HttpError";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AuthContext from "../store/auth-context";
import BasketDealItem from "../components/basket/BasketDealItem";
import BasketContext from "../store/basket-context";

const BasketPage = () => {
  const authCtx = useContext(AuthContext);
  const basketContext = useContext(BasketContext);

  const [basketItems, setBasketItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${authCtx.localId}/Basket.json`
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
        acc[cur.id] ? acc[cur.id].quantity += cur.quantity : acc[cur.id] = cur;
        return acc;
      },{});

      const output = Object.values(reducedArr);

     // console.log(reducedArr);

      setBasketItems(output);
    };

    if (authCtx.isLoggedIn) {
      fetchItems();
    }
    setIsLoading(false);
    
  }, [authCtx.isLoggedIn,authCtx.localId]);

  

  let deals=[];

  if (basketItems ) {
   deals = basketItems.map((dl) => (
      <BasketDealItem key={dl.deal_id} deal={dl} />
   ));
  }
  //const aaa = deals.map((dl) => <div>{dl.name}</div>);

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (!isLoading) {
    content = deals;
  }

  return <Fragment>
    <div className="pageTitle">
      سبد خرید
    </div>{content}</Fragment>;
};

export default BasketPage;
