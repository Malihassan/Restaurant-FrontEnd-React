import classes from "./headerButton.module.css";
import { BsHouse } from "react-icons/bs";
import { useRouter } from "next/router";

function HomeButton() {
    const router = useRouter()
    const forwardToHomeHandler =()=>{
        router.push('/')
    }
    return (
        <button className={classes.button} onClick ={forwardToHomeHandler}>
            <BsHouse className={classes.icon}/>
            <span className={classes.title}>Home</span>
        </button>
    )
}
export default HomeButton