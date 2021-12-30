import dynamic from "next/dynamic";
import Head from "next/head";
import Category from "../../../../components/category/Category";
import LoadingSpinner from "../../../../components/ui/spinner/LoadingSpinner";

const ProductItem = dynamic(
  () => import("../../../../components/gallery/ProductItem"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);
const Card = dynamic(() => import("../../../../components/ui/card/Card"), {
  loading: () => <LoadingSpinner className="LoadingSpinner" />,
});

function SubCategoryPage(props) {
  let gallery = "";

  if (props.products.length == 0) {
    gallery = (
      <Card className="notFoundItems">
        <span>No Items In this Category</span>
      </Card>
    );
  } else if (props.products.length > 0) {
    gallery = props.products.map((item) => (
      <ProductItem
        productId={item.productId}
        name={item.name}
        price={item.price}
        image={item.image}
        description={item.description}
        oldPrice={item.oldPrice}
        rate={item.rate}
        key={item.productId}
      />
    ));
  }
  return (
    <div className="gallery">
      <Head>
        <title>{`Category of ${props.category} `}</title>
        <meta name="description" content={props.description}></meta>
      </Head>
      <Category />
      {gallery}
    </div>
  );
}
export async function getStaticPaths() {
  const categoriesResponse = await fetch(
    `https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/category`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const category = await categoriesResponse.json();
  return {
    paths: category.map((element) => ({
      params: {
        mainCategory: element.CategoryName,
        subCategory: element.item.Type,
      },
    })),
    fallback: false,

  };
}
export async function getStaticProps(context) {
  const { mainCategory, subCategory } = context.params;
  const productResponse = await fetch(
    //http://localhost:7000/
    //https://alhendawy-node-server.herokuapp.com/
    `https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/menu/${mainCategory}/${subCategory}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const productItems = await productResponse.json();
  return {
    props: {
      products: productItems.items.map((item) => ({
        productId: item._id.toString(),
        name: item.ProductName,
        price: item.Size.Price,
        oldPrice: item.Size.OldPrice,
        image: item.Urls.CloudinaryImage,
        description: item.Describe,
        rate: item.Rate,
      })),
      description:productItems.description,
      category:subCategory,
    },
  };
}
export default SubCategoryPage;
