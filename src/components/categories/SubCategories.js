import SubCategory from "./SubCategory";

import classes from "./SubCategories.module.css";
import { useParams } from "react-router-dom";

const SubCategories = (props) => {
  const params = useParams();
  const { categoryslug } = params;

  const subctgs = props.subCategories.map((subctg) => (
    <SubCategory
      key={subctg.key}
      image={subctg.attachment}
      name={subctg.name}
      slug={subctg.slug}
      categoryslug={categoryslug}
    />
  ));

  return <div className={classes.SubCategoriesHolder}>{subctgs}</div>;
};

export default SubCategories;
