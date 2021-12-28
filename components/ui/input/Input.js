import classes from "./Input.module.css";


export function Textarea(props) {
  return (
    <div
      className={`${classes.control} ${props.invalid ? classes.invalid : ""}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
      className ={`${props.className}`}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
}

function Input(props) {
   
  return (
    <div
      className={`${classes.control} ${props.invalid ? classes.invalid : ""}`}
    >
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input 
        className ={`${props.className}`}
        type={props.type || 'text'}
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
}
export default Input;
