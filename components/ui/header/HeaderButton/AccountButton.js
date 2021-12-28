import classes from "./headerButton.module.css";
import { BsPerson, BsBagCheck } from "react-icons/bs";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { accountAction } from "../../../../Store/account";
function AccountButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const accountAuth = useSelector((state) => state.account.token);

  const [openMenu, setOpenMenu] = useState(false);

  const openMenuHandeler = () => {
    setOpenMenu(true);
  };
  const hideMenuHandeler = () => {
    setOpenMenu(false);
  };
  const LoginHandeler = () => {
    router.push("/account/login");
  };
  const signUpHandeler = () => {
    router.push("/account/signup");
  };
  const MyOrdersHandler =()=>{
    router.push('/orderHistory')
  }
  const logoutHandeler = async () => {
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

  const menuContent = openMenu && (
    <div
      className={classes.dropdown_wrapper}
      onMouseEnter={openMenuHandeler}
      onMouseLeave={hideMenuHandeler}
    >
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
        onMouseEnter={openMenuHandeler}
        onMouseLeave={hideMenuHandeler}
      >
        <BsPerson className={classes.icon} />
        <span className={classes.title}>Account</span>
      </button>
      {menuContent}
    </div>
  );
}
export default AccountButton;
