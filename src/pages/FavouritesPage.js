import { useContext, useEffect, useState } from "react";
import BasketDealItem from "../components/basket/BasketDealItem";
import AuthContext from "../store/auth-context";

const FavouritesPage = () => {
  const authCtx = useContext(AuthContext);
  const [favouriteItems, setFavouriteItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetch(
        `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${authCtx.localId}/Favourites.json`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "authentication failed");
      }

      const transformedItems = [];

      for (const deal in data) {
        const dealObj = {
          id: deal,
          ...data[deal],
        };
        transformedItems.push(dealObj);
      }

      setFavouriteItems(transformedItems);
    };

    fetch().catch((err) => {
      alert(err.message);
    });
  }, [authCtx.localId]);

  //console.log(basketItems);

  const deals = favouriteItems.map((dl) => (
    <BasketDealItem key={dl.id} deal={dl} />
  ));

  // const aaa = deals.map((dl) => (<div>{dl.name}</div>));

  return (
    <div className="contentHolder">
      <div className="pageTitle">مورد علاقه ها</div>
      <ul>{deals}</ul>
    </div>
  );
};

export default FavouritesPage;
