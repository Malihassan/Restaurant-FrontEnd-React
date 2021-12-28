import MainNavigation from "../ui/header/MainNavigation";
import classes from "./Layout.module.css";
import Category from "../category/Category";
import { useSelector } from "react-redux";
import BookTable from "../BookTable/BookTable";
import ProductDetails from "../productDetails/ProductDetails";
import Cart from "../cart/Cart";
import { Fragment } from "react";
function Layout(props) {
  const toggleCart = useSelector((state) => state.cart_ui.toggleCart);
  const ProductDetailsPage = useSelector((state) => state.productDetails_ui);
  const toggleReservedTablePage = useSelector(
    (state) => state.bookedTable_ui.showPage
  );
  let shareContent = true ,toggleCategory = true ;
  const pageName =props.children.type.name
  if ( pageName == "LoginPage" || pageName == "SignupPage"|| pageName == 'forgetPassword') {
    shareContent = false
  }
  if (pageName == "HomePage" || pageName == "LoginPage" || pageName == "SignupPage"|| pageName == 'forgetPassword'  ) {
    toggleCategory = false
  }
  return (
    <div className={classes.layout}>
      {shareContent &&<Fragment>        
        {ProductDetailsPage.togglePage && (
          <ProductDetails
            key={ProductDetailsPage.item.productId}
            item={ProductDetailsPage.item}
          />
        )}
      </Fragment>}

      <MainNavigation className={classes.header} />
      {toggleCategory && <Category />}
      {toggleCart && <Cart />}
      {toggleReservedTablePage && <BookTable />}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
export default Layout;
