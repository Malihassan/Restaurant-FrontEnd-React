import classes from "./headerButton.module.css";
import { BsPerson, BsBagCheck ,BsChevronDown } from "react-icons/bs";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { accountAction } from "../../../../Store/account";
function AccountButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const accountAuth = useSelector((state) => state.account.token);
  const [hovered, setHovered] = useState(false);
  const DropMenuHandeler =()=>{
    // setHovered((prev)=>!prev)
    setHovered(true)
  }

  const toogleMenu = ()=>{
    setHovered(true)
  }
  const hiddenMenu = ()=>{
    setHovered(false)
  }

  const LoginHandeler = () => {
    hiddenMenu()
    router.push("/account/login");
  };
  const signUpHandeler = () => {
    hiddenMenu()
    router.push("/account/signup");
  };
  const MyOrdersHandler =()=>{
    hiddenMenu()
    router.push('/orderHistory')
  }
  const logoutHandeler = async () => {
    hiddenMenu()
    const res = await fetch(
      "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/logout",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'token': accountAuth,
        },
      }
    );
    if (res.ok) {
      dispatch(accountAction.logout());
      router.replace("/account/login");
    }
  };

  const menuContent = hovered && (
    <div
      onMouseEnter={toogleMenu}
      onMouseLeave={hiddenMenu}
      className={classes.dropdown_wrapper}>
      <ul className={classes.dropdown_menu}>
        {!accountAuth && (
          <button
            className={classes.dropdown_menu__button}
            onClick={LoginHandeler}
          >
            <IoIosLogIn className={classes.menu_icon} />
            Login
          </button>
        )}
        {!accountAuth && (
          <button
            className={classes.dropdown_menu__button}
            onClick={signUpHandeler}
          >
            <RiUserAddLine className={classes.menu_icon} />
            Sign up
          </button>
        )}
        {accountAuth && (
          <button className={classes.dropdown_menu__button} onClick={MyOrdersHandler}>
            <BsBagCheck className={classes.menu_icon} />
            My Orders
          </button>
        )}
        {accountAuth && (
          <button
            className={classes.dropdown_menu__button}
            onClick={logoutHandeler}
          >
            <IoIosLogOut className={classes.menu_icon} />
            Logout
          </button>
        )}
      </ul>
    </div>
  );
  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        onMouseEnter={toogleMenu}
        onMouseLeave={hiddenMenu}
        onClick={DropMenuHandeler}
      >
        <BsPerson className={classes.icon} />
        <span className={classes.title}>Account</span>
        <BsChevronDown className={`${classes.dropdownArrow} ${hovered && classes.rotateArrow}`}/>
      </button>
      
      {menuContent}
    </div>
  );
}
export default AccountButton;
