import { Fragment, useState } from "react";
import { RatingView } from "react-simple-star-rating";
import Price from "../ui/price/Price";

import classes from "./itemDetails.module.css";
function ItemDetails(props) {
  return (
    <div className={`${classes.details} ${props.className}`}>
      <RatingView
        fillColor='#ffb326'
        emptyColor='#ffff'
        ratingValue={props.rate}
        size={20}
        stars={5}
        className={classes.rate}
      />
      <span className={classes.Gallery_Name}>{props.name}</span>
      <div className={classes.priceContainer}>
        {props.oldPrice && <del
          className={classes.Gallery_Discount_Price}
        >{`EGY ${props.oldPrice}`}</del>}
        <Price price={props.price} className={classes.price}/>
      </div>
    </div>
  );
}
export default ItemDetails;
