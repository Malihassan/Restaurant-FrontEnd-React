import reactDom from "react-dom";
import { Fragment } from "react";
import classes from "./Modal.module.css";
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const Layout = (props) => {
  return <div className={`${classes.layout} ${classes.modal} ${props.className} `}>{props.children}</div>;
};
function Modal(props) {
  const overlays =document.getElementById("overlays")
  return (
    <Fragment>
      {reactDom.createPortal(<BackDrop onClose={props.onClose} />, overlays)}
      {reactDom.createPortal(<Layout className={props.className} >{props.children}</Layout>, overlays)}
    </Fragment>
  );
} 
export default Modal;
