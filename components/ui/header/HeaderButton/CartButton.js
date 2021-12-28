import classes from "./headerButton.module.css";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartAction_ui } from "../../../../Store/cart_ui";

function CartButton(props) {
  const dispatch = useDispatch()
  const totalAmount = useSelector(state=>state.cart.totalAmount)
  const [btnIsHightLight, setBtnIsHightLight] = useState(false);
  useEffect(()=>{
    if (totalAmount == 0) {
      return
    }
    setBtnIsHightLight(true)
    setTimeout(()=>{
      setBtnIsHightLight(false)
    },1000)
  },[totalAmount])
  const toggleCartHandeler = ()=>{
    dispatch(cartAction_ui.toggleCart())
  }
  return (
    <button className={`${classes.button} ${btnIsHightLight ? classes.bump:''}`}
    onClick={toggleCartHandeler}>
      {totalAmount!==0 &&<span className={classes.badge}>{totalAmount}</span> }
        <BsCart3 className={classes.icon} />
      <span className={classes.title}>Cart</span>
    </button>
  );
}
export default CartButton;
