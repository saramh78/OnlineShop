import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Deal from "../components/deals/Deal";
import HttpError from "../components/ui/HttpError";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProductsList = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const params = useParams();
  const { subcategoryslug } = params;

  useEffect(() => {
    const fetchDeals = async () => {
      const loadedDeals = [];
      let counter = 1;
      let isFinished = false;
      while (!isFinished) {
        const response = await fetch(
          `https://api.shirik.ir/api/deals/get-deal-category/tehran/${subcategoryslug}/${counter}?user_agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/100.0.4896.127%20Safari/537.36&version=41&city_id=1&city_id=1`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not fetch categories.");
        }

        if (data.deals.length === 0) {
          isFinished = true;
        }

        for (const dl of data.deals) {
          const newDeal = {
            ...dl,
          };
          loadedDeals.push(newDeal);
        }

        counter++;
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
      key={deal.deal_id}
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

export default ProductsList;
