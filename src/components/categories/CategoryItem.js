import { useParams } from "react-router-dom";

import classes from "./CategoryItem.module.css";

const CategoryItem = (props) => {
  const params = useParams();
  const { categoryslug } = params;

  const itemClass =
    categoryslug === props.category.slug
      ? `${classes.item} ${classes.selected}`
      : `${classes.item}`;

  const itemLinkClass =
    categoryslug === props.category.slug
      ? `${classes.itemLink} ${classes.Linkselected}`
      : `${classes.itemLink}`;

  return (
    <li className={itemClass}>
      <a className={itemLinkClass} href={`/${props.category.slug}`}>
        {props.category.name}
      </a>
    </li>
  );
};

export default CategoryItem;

/* <NavLink
        className={() =>
          slug === props.category.slug
            ? classes.activeCat
            : classes.categoryItem
        }
        to={`/categories/${props.category.slug}`}
      >
        {props.category.name}
      </NavLink> */
