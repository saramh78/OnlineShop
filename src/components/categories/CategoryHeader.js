
import classes from './CategoryHeader.module.css';

const CategoryHeader = () => {
  
    return (
      <div className={classes.header}>
        <div className={classes.text}>
          <a href='/profile'>پروفایل</a>
        </div>
        <div className={classes.text}>
          <a href="/basket">سبد خرید</a>
        </div>
        <div className={classes.text}>
          <a href="/میوه-سبزیجات">دسته بندی ها</a>
        </div>
        <div className={classes.text}>
          <a href="/"> خانه</a>
        </div>
      </div>
    );
};

export default CategoryHeader;