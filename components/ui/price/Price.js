import classes from './price.module.css'
function Price(props) {
  return (
    <div className={`${props.className}`}>
      <span className={classes.pound}>EGY </span>
      <span className={classes.Gallery_Price}>{`${props.price}`}</span>
    </div>
  );
}
export default Price;
