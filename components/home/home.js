import { useRouter } from "next/router";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import classes from "./home.module.css";
import Footer from '../ui/footer/Footer'
import CustomerReviews from "./customerReviews/CustomerReviews";
import HomeList from "./homeList/HomeList";


function Home(props) {
  let router = useRouter()
  const showMenuHandeler = () => {
    router.push(`/categories/food/pizza`)
  };
  return (
    <div className={classes.MainContainer}>
      <div className={`${classes.bgOverlay}`}>
        <div className={classes.overlay}>
          <div className={classes.headerData}>
            <label>
              Enjoy Time & <br></br>
              Delicious Food
            </label>
            <button onClick={showMenuHandeler}>See Menu</button>
          </div>
        </div>
      </div>
      <ul className={classes.homeList}>
        {props.categoryList.map((item) => (
          <HomeList
            key={item.key}
            subCategoryName={item.subCategory}
            category={item.category}
            image={item.cloudImage}
            description={item.description}
          />
        ))}
      </ul>
      <div className={classes.customerReviews}>
        <div className={classes.customerReviewsLayout}>
          <label className={classes.titleReviews}>Customer Reviews</label>
          <Slider
            autoplay={1000}
            classNames={{
              slider: classes.test,
              nextButton: classes.nextButton,
              previousButton: classes.previousButton,
            }}
          >
            {props.slides.map((item, index) => (
              <div key={item.key}>
                <CustomerReviews
                  key={item.key}
                  rate={item.rate}
                  name={item.name}
                  comment={item.comment}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
