import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store/cart";
import Price from "../ui/price/Price";
import classes from "./counter.module.css";
const Counter = (props) => {
  const router = useRouter()
  const [enteredAmount, setEnteredAmount] = useState(props.intialAmount);
  const dispatch =useDispatch()
  const updateAmountHandeler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const decrementCounter = () => {
    let x = enteredAmount;
    if (enteredAmount < 11 && enteredAmount > 0) {
      x--;
    } else if (enteredAmount === 0) {
      x = 10;
    }
    setEnteredAmount(x);
  };
  const onRemoveHandeler =() =>{
    dispatch(cartActions.removeItem({id:props.id}))
    decrementCounter()
  }
  const incrementCounter = () => {
    let y = enteredAmount;
    if (enteredAmount >= 0 && enteredAmount < 10) {
      y++;
    } else if (enteredAmount === 10) {
      y = 0;
    }
    setEnteredAmount(y);
  };
  const onAddHandeler =()=>{
    const item ={
      id: props.id,
      mainCategory:router.query.mainCategory,
      subCategory:router.query.subCategory,
      name: props.name,
      price: props.price
    }
    dispatch(cartActions.addItem(item))
    incrementCounter()
}
let incrementIsAvalible = enteredAmount <= 0
let decrementIsAvalible=  enteredAmount >=10
// let incrementIsAvalible = false
// let decrementIsAvalible=  false
  return (
    <div className={classes.divCounter}>
      <div className={classes.summary}>
        <Price className={classes.price} price={props.price} />
        <span
          className={classes.amount}
          onChange={updateAmountHandeler}
        >{`x ${enteredAmount}`}</span>
      </div>
      <div className={classes.counterActions}>
        <button disabled={incrementIsAvalible} onClick={onRemoveHandeler}>−</button>
        <button disabled={decrementIsAvalible} onClick={onAddHandeler}>+</button>
      </div>
    </div>
  );
};
export default Counter;
