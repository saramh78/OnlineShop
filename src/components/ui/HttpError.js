import classes from "./HttpError.module.css";

const HttpError = (props) => {
    console.log('error');
    console.log(props.errorMessage);
  return (
    <div className={classes.ErrorDiv}>
      <p>Error: {props.errorMessage}</p>
    </div>
  );
};

export default HttpError;
