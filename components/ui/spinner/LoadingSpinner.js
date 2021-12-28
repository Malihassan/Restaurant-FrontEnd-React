import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return <div className={classes.spinnerContiner}>
    <div className={`${classes.spinner} ${props.className}`}></div>;
  </div>
}

export default LoadingSpinner;
