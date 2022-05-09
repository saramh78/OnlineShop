import { Fragment } from "react";
import classes from "./Categories.module.css";
import CategoryItem from "./CategoryItem";

const Categories = (props) => {
  
  const catgs = props.categories.map((ctg) => (
    <CategoryItem
      key={ctg.key}
      category={ctg}
    />
  ));

  return (
    <Fragment>
      <ul className={classes.ul}>{catgs}</ul>
    </Fragment>
  );
};
export default Categories;
