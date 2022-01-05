import { useDispatch, useSelector } from "react-redux";
import { cartAction_ui } from "../../Store/cart_ui";
import { cartActions } from "../../Store/cart";
import Modal from "../ui/modal/Modal";
import Card from "../ui/card/Card";
import { Fragment, useState } from "react";
import CartItem from "./CartItem";
import classes from "./cart.module.css";
import Price from "../ui/price/Price";
import { useRouter } from "next/router";
import Map from "../Map/Map";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../ui/spinner/LoadingSpinner";

function Cart(props) {
  const  [toggleMap ,setToggleMap]=useState(false)
  const {hasError,isLoading,sendRequest}=useFetch()
  const [responseMessage, setResponseMessage] = useState("");
  const router =useRouter()
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.account.token)
  let location = useSelector((state)=>state.account.LatLng)
  const cartItems = useSelector((state) => state.cart);
  const hideCartHandeler = () => {
    dispatch(cartAction_ui.toggleCart());
  };
  const toggleMapHandeler =()=>{
    setToggleMap((prev) =>prev =!prev)
  }
  let selectedCheckbox =false;
  const checkboxReceiveOrder = (e) =>{
    if (e.target.checked) {
      location =[]
      selectedCheckbox = true ;
    }
  }
  const sendOrderHandeler = async() => {
    if (!auth) {
      hideCartHandeler()
      router.push('/account/login')
    }

    location = location.lat =='' ?[]:location;
    if (!location.length && !selectedCheckbox )  {
      setResponseMessage('Should Choose location or Recive order from restaurant')
      return 
    }    
    await sendRequest({
      url:'https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/sendOrder',
      method:'POST',
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
        'token': auth,
      },
      credentials: "include",
      body:JSON.stringify({Location:{Coordinates:location},Cart:cartItems.items})
    },redirectionHandler)
  };


  let pageContent = <h3>No Items In Cart</h3>;
  async function redirectionHandler(response) {
    if (response.ok) {
      setResponseMessage('thank you ,we will calling in three minutes');
      dispatch(cartActions.clearCart())
    }
    if (!response.ok) {
      setResponseMessage('Server Error');
    }
  }

  if (cartItems.items.length > 0) {
    pageContent = (
      <div className={classes.container}>
        <ul className={classes.cart_items}>
          {cartItems.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
            />
          ))}
        </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <Price className={classes.price} price={cartItems.totalMoney.toFixed(2)} />
        </div>
        
        <div className={classes.locationContainer}>
          <input  name="receiveOrder" type='checkbox' onClick={checkboxReceiveOrder} />
          <label className={classes.locationCheckbox} for='receiveOrder'>Receive Order From Restaurant</label> <br></br>
          <label onClick={toggleMapHandeler} className={classes.location}>Choose Delivery Order Location ?</label> 

        </div>
       
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={hideCartHandeler}>
            Close
          </button>
          <button className={classes.order} onClick={sendOrderHandeler}>
            Checkout
          </button>
        </div>
        <p className={classes.responseMessage}>{responseMessage}</p>      
      </div>
    );
  }

  return <Modal onClose={hideCartHandeler} className ={`${classes.cartDimention} ${toggleMap?classes.modalMapContainer:''}`}>
      {isLoading && <LoadingSpinner/>}
      {!toggleMap && pageContent}
      {toggleMap && <Map className ={classes.mapPage} onBackHandeler={toggleMapHandeler}/>}
    
    </Modal>;
}
export default Cart;
