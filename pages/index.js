import dynamic from "next/dynamic";
import Head from "next/head";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { categoryAction } from "../Store/category";
import LoadingSpinner from "../components/ui/spinner/LoadingSpinner";

const Home = dynamic(() => import("../components/home/home"), {
  loading: () => <LoadingSpinner className="LoadingSpinner" />,
});

const HomePage = (props) => {
  const slides = [
    {
      key: "First item",
      rate: 5,
      name: "Hassan Alhendawy",
      comment: "beautiful product and awesome customer service!",
    },
    {
      key: "First item",
      rate: 5,
      name: "Karem ALi",
      comment: "beautiful product with much attention to details ",
    },
    {
      key: "third item",
      rate: 5,
      name: "Mohammed Hassan",
      comment: "Hands down the best chicken wings I have ever eaten",
    },
  ];
  const dispatch = useDispatch();
  if (typeof window !== "undefined") {
    dispatch(categoryAction.addCategories(props.categories));
  }
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = (url) => {
  //     url !== router.pathname ? setLoading(true) : setLoading(false);
  //   };
  //   const handleComplete = (url) => setLoading(false);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);
  // }, [router]);

  return (
    <Fragment>
      <Head>
        <title>El-Hendawy Restaurant</title>
        <meta
          name="description"
          content="The Elhendawy was founded in 1996 by momen and alhendawy . the taste
            of an excellent meat dish."
        />
      </Head>
      <Home slides={slides} categoryList={props.categories.slice(0, 3)} />
    </Fragment>
  );
};

export async function getServerSideProps({ req, res }) {
  try {
    const categoriesResponse = await fetch(
      "https://alhendawy-node-server.herokuapp.com/ElhendawyRestaurant/category",
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
      props: {
        categories: category.map((element) => ({
          key: element.item.Type,
          cloudImage: element.item.SubCategoryUrls.Cloudinary,
          subCategory: element.item.Type,
          category: element.CategoryName,
          description: element.item.CategoryDescription,
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default HomePage;
