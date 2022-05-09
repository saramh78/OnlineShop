import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Deal from "../components/deals/Deal";
import Banner from "../components/home/Banner";
import HttpError from "../components/ui/HttpError";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const params = useParams();
  const { subcategoryslug } = params;

  useEffect(() => {
    const fetchDeals = async () => {
      const loadedDeals = [];
      const response = await fetch(
        "https://api.shirik.ir/api/deals/home-page/tehran/1/?user_agent=Mozilla/5.0%20(iPhone;%20CPU%20iPhone%20OS%2013_2_3%20like%20Mac%20OS%20X)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/13.0.3%20Mobile/15E148%20Safari/604.1&version=47&city_id=1"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch categories.");
      }

      for (const dl of data.data) {
        if (dl.type !== "slider" && dl.type !== "productBox") {
          const newDeal = {
            key: dl.id ? dl.id : dl.tag_id,
            ...dl,
          };
          loadedDeals.push(newDeal);
        }
      }

      setDeals(loadedDeals);
      setIsLoading(false);
    };
    fetchDeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [subcategoryslug]);

  const dealsList = deals.map((deal) => (
    <Deal
      key={deal.key}
      attachment={deal.attachment}
      short_name={deal.short_name}
      max_limit={deal.max_limit}
      discounted_price={deal.discounted_price}
      slug={deal.slug}
    />
  ));

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (httpError) {
    content = <HttpError errorMessage={httpError} />;
    console.log(httpError);
  }

  if (!httpError && !isLoading) {
    content = dealsList;
  }

  return <Fragment>{content}</Fragment>;
};

export default HomePage;
