import React from "react";
import classes from "./Card.module.css";

const Card = (props ,ref) => {
  return (
    <div ref={ref} className={`${props.className}  ${classes.card}`}>
      {props.children}
    </div>
  );
};

export default React.forwardRef(Card);
