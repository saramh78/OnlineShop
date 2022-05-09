import { Fragment } from "react";
import classes from "./DealProperty.module.css";

const DealProperty = (props) => {
    const childprops = props.childprops.map((child) => (
      <div>
        {child.title.localeCompare('-') ? (
          <div className={classes.ctitle}>{child.title}: </div>
        ) : (
          ""
        )}
        <div className={classes.cvalue}> {child.value}</div>
      </div>
    ));
    
    return (<Fragment>
        <div className={classes.ptitle}>{props.title}</div>
        {childprops}
    </Fragment>);
};

export default DealProperty;