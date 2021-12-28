import { Fragment } from "react";
import classes from "./ProductItem.module.css";
import ItemDetails from "./ItemDetails";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { productDetails_ui } from "../../Store/productDetails-ui";

function ProductItem(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { productId, name, price, oldPrice, rate, description, image } = props;

  const toggleProductDetailsPage = () => {
    const item = {
      productId,
      name,
      price,
      description,
      image,
    };
    dispatch(productDetails_ui.toggleDetailsPage());
    dispatch(productDetails_ui.productDetails(item))
  };
  return (
    <div className={classes.allGallery}>
      <div className={classes.itemContainer}>
        <div className={classes.Gallery_Design}>
          <img className={classes.Image_Product} src={image} />
          <button
            className={classes.viewbutton}
            onClick={toggleProductDetailsPage}
          >
            GET ORDER
          </button>
        </div>
        <ItemDetails
          className={classes.itemDetails}
          name={name}
          oldPrice={oldPrice}
          price={price}
          rate={rate}
          key={productId}
        />
      </div>
    </div>
  );
}
export default ProductItem;
