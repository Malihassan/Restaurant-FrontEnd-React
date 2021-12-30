import MainNavigation from "../ui/header/MainNavigation";
import classes from "./Layout.module.css";
import Category from "../category/Category";
import { useSelector } from "react-redux";
import BookTable from "../booktable/BookTable";
import ProductDetails from "../productDetails/ProductDetails";
import Cart from "../cart/Cart";
function Layout(props) {
  const toggleCart = useSelector((state) => state.cart_ui.toggleCart);
  const ProductDetailsPage = useSelector((state) => state.productDetails_ui);
  const toggleReservedTablePage = useSelector(
    (state) => state.bookedTable_ui.showPage
  );


  const productDetailsPage = ProductDetailsPage.togglePage && (
    <ProductDetails
      key={ProductDetailsPage.item.productId}
      item={ProductDetailsPage.item}
    />
  );

  return (
    <div className={classes.layout}>
      {productDetailsPage}

      <MainNavigation className={classes.header} />
      {/* {toggleCategory && <Category />} */}
      {toggleCart && <Cart />}
      {toggleReservedTablePage && <BookTable />}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
export default Layout;
