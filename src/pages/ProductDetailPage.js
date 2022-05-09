import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DealDetail from "../components/dealdetail/DealDetail";
import HttpError from "../components/ui/HttpError";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProductDetailPage = (props) => {
  const [deal, setDeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const params = useParams();
  const { productslug } = params;

  useEffect(() => {
    const fetchDeal = async () => {
      const response = await fetch(
        `https://api.shirik.ir/api/deals/get-detail/tehran/${productslug}/deal?user_agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/100.0.4896.127%20Safari/537.36&company_id=20`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch categories.");
      }

      setDeal(data.deal);
      setIsLoading(false);
    };

    fetchDeal().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
      
  }, [productslug]);

    let content;

    if (isLoading) {
      content = <LoadingSpinner />;
    }

    if (httpError) {
      content = <HttpError errorMessage={httpError} />;
      console.log(httpError);
    }

    if (!httpError && !isLoading) {
        content = <Fragment><DealDetail deal={deal}/></Fragment>;
    }
    
    return <Fragment>
      {content}
  </Fragment>;
};
export default ProductDetailPage;
