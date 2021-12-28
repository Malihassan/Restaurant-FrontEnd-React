import { RatingView } from "react-simple-star-rating";
import classes from "./customerReviews.module.css";
function CustomerReviews(props) {
  return (
    <div className={`${classes.container}`}>
      <RatingView
        fillColor="#ffb326"
        emptyColor="#ffff"
        ratingValue={props.rate}
        size={20}
        stars={5}
      />
      <p className={classes.comment}>{props.comment}</p>
      <label className={classes.userName}>"{props.name}"</label>
    </div>
  );
}
export default CustomerReviews;
