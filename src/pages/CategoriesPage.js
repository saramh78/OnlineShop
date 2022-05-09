import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categories from "../components/categories/Categories";
import SubCategories from "../components/categories/SubCategories";
import HttpError from "../components/ui/HttpError";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const params = useParams();
  const { categoryslug } = params;

  let n = 0;
  let s = 0;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://api.shirik.ir/api/categories/list");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch categories.");
      }

      const loadedCategories = [];
      let subCategss = [];
      for (const ctg of data) {
        for (const subctg of ctg.categories) {
          const subCategory = {
            key: "sc" + s,
            ...subctg,
          };
          s++;
          subCategss.push(subCategory);
        }

        const category = {
          key: "c" + n,
          ...ctg,
        };

        category.categories = subCategss;

        subCategss = [];
        n++;
        loadedCategories.push(category);
      }
      setCategories(loadedCategories);
      setIsLoading(false);
    };

    fetchCategories().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [n, s]);

  const activecat = categories.find((ctg) => ctg.slug === categoryslug);
  const subCategories = activecat ? activecat.categories : [];

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (httpError) {
    content = <HttpError errorMessage={httpError} />;
    console.log(httpError)
  }

  if (!httpError && !isLoading ) {
    content = <SubCategories subCategories={subCategories} />;
  }
  
  return (
    <Fragment>
      <Categories categories={categories} />
      {content}
    </Fragment>
  );
};

export default CategoriesPage;
