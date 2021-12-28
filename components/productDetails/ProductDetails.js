import { useDispatch } from "react-redux";
import { cartActions } from "../../Store/cart";
import { productDetails_ui } from "../../Store/productDetails-ui";
import Modal from "../ui/modal/Modal";
import Counter from "./Counter";
import classes from "./product.module.css";
function ProductDetails(props) {
  const dispatch = useDispatch();

  const onAddHandeler = (item) => {
    dispatch(cartActions.addItem({...item,amonut:1}));
    hideProductDetailsPage();
  };
  const onRemoveHandeler =(id) =>{

  }
  const hideProductDetailsPage = () => {
    dispatch(productDetails_ui.toggleDetailsPage());
  };
  return (
    <Modal onClose={hideProductDetailsPage} className ={classes.container}>
        <div className={classes.item}>
          <img className={classes.orderImage} src={props.item.image} />
          <div className={classes.orderData}>
            <span className={classes.orderName}>{props.item.name}</span>
            <span className={classes.orderDesc}>{props.item.description}</span>

            <Counter
              key={props.item.productId}
              id={props.item.productId}  
              name={props.item.name}
              price={props.item.price}
              intialAmount={0}
            />
          </div>
        </div>

        {/* <div className={classes.actions}>
          <button className={classes.close} onClick={hideProductDetailsPage}>Close</button>
          <button className={classes.order} onClick={addInCartHandeler}>Order</button>
        </div> */}
    </Modal>
  );
}
export default ProductDetails;
