import Counter from "../productDetails/Counter";
import classes from "./cartItem.module.css";
function CartItem(props) {
  return (
    <li className={classes["cart-item"]}>
      <span className ={classes.name}>{props.name}</span>
      <Counter
        price={props.price}
        intialAmount={props.amount}
        id={props.id}
        name={props.name}
      />
    </li>
  );
}
export default CartItem;
