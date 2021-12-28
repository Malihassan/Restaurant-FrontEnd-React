import { useRouter } from "next/router";
import classes from "./homeList.module.css";
function HomeList(props) {
  let router = useRouter()
  let categoryHandeler = () =>{
    // console.log(`${props.category}/${props.subCategoryName}`);

    router.push(`/categories/${props.category}/${props.subCategoryName}`)
  }
  return (
      <li className={classes.listContainer}>
        <img src={props.image}/>
        <label className={classes.name}>{props.subCategoryName}</label>
        <label className={classes.description}>{props.description}
        </label>
        <button onClick={categoryHandeler}>Show Orders</button>
      </li> 
  );
}
export default HomeList;
