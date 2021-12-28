import classes from "./MainNavigation.module.css";
import { useDispatch} from "react-redux";
import { bookedtable_ui_action } from "../../../Store/bookedTable-ui";
import CartButton from "./HeaderButton/CartButton";
import AccountButton from "./HeaderButton/AccountButton";
import HomeButton from "./HeaderButton/HomeButton";
import { useCallback, useEffect, useState } from "react";
function MainNavigation(props) {
  const [scroll,setScroll] = useState(false)

  const dispatch = useDispatch();
  const handleScroll = useCallback(()=>{
    // find current scroll position
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 100) {
      setScroll(true);
    } else {
      setScroll(false)
    }
  },[])
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return () =>window.removeEventListener("scroll", handleScroll) ;
  },[handleScroll])
 

  const forwardToBookTable = () => {
    dispatch(bookedtable_ui_action.toggleBookedTablePage());
  };

  return (
    <div className={props.className}>
     <header className={`${classes.header} ${scroll ?classes.scroll:''} `}>
      <span className={classes.logo}>El-HENDAWY.</span>
      <input
        className={classes.booktable}
        type="button"
        value="BOOK TABLE"
        onClick={forwardToBookTable}
      />
      <nav className={`${classes.nav}`}>
        <ul>
          <li>
            <HomeButton />
          </li>
          <li>
            <AccountButton />
          </li>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
      
    </header>
    </div>
  );
}
export default MainNavigation;
