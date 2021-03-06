import cookie from "cookie";
import Head from "next/head";
import dynamic from "next/dynamic";
import LoadingSpinner from "../../components/ui/spinner/LoadingSpinner";

const OrderHistory = dynamic(
  () => import("../../components/OderHistory/OrderHistory"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);
const Card = dynamic(() => import("../../components/ui/card/Card"), {
  loading: () => <LoadingSpinner className="LoadingSpinner" />,
});
const MyOrders = (props) => {
  let ordersContent =
    props.orders.length === 0 ? (
      <Card className="notFoundItems">
        <span> No Order Yet !!</span>
      </Card>
    ) : (
      props.orders.map((item) => (
        <OrderHistory
          key={item._id}
          date={item.Timestamp}
          totalPayment={item.TotalPaymentPrice}
          location={item.Location}
          cart={item.Cart}
          id={item._id.substring(item._id.length / 2)}
        />
      ))
    );

  // if (props.orders.length === 0) {
  //   ordersContent = (
  //     <Card className="notFoundItems">
  //       <span> No Order Yet !!</span>
  //     </Card>
  //   );
  // }
  // ordersContent = props.orders.map((item) => (
  //   <OrderHistory
  //     key={item._id}
  //     date={item.Timestamp}
  //     totalPayment={item.TotalPaymentPrice}
  //     location={item.Location}
  //     cart={item.Cart}
  //     id={item._id.substring(item._id.length / 2)}
  //   />
  // ));
  return (
    <div className="orderHistory">
      <Head>
        <title>Order History</title>
        <meta
          name="description"
          content=" All Excellent Order Dish that you Deliver ."
        />
      </Head>
      {ordersContent}
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  try {
    const token = parseCookies(req).RTU;
    const res = await fetch(
      "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/getOrders",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    // if (!res.ok) {
    //   return {
    //     notFound: true,
    //   };
    // }
    const orders = await res.json();
    return {
      props: {
        orders,
      },
    };
  } catch (error) {
    return {
      props: {
        orders: [],
      },
    };
  }
}

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export default MyOrders;
