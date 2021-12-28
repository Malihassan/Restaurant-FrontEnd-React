import { Fragment, useRef, useState } from "react";
import Card from "../ui/card/Card";
import classes from "./category.module.css";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useSelector } from "react-redux";
import CategoryList from "./CategoryList";
const Category = (props) => {
  const [toggleCategory, setToggleCategory] = useState(false);
  let scrollRef = useRef()
  const toggleHandler = () => {
    setToggleCategory((prev) => !prev);
  };
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;

  };
  
  const categories = useSelector((state) => state.category.categories);
  return (
    <div
      className={`${classes.mainContainer} ${
        toggleCategory ? classes.mainContainerDimention : ""
      }`}
    >
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={toggleHandler}>
          {!toggleCategory && (
            <div>
              <BsFullscreen className={classes.iconButton} />
              <span>Show Category</span>
            </div>
          )}
          {toggleCategory && (
            <div>
              <BsFullscreenExit className={classes.iconButton} />
              <span>Hide Category</span>
            </div>
          )}
        </button>
      </div>

      {toggleCategory && (
        <div className={classes.categoriesContiner}>
          <button onClick={() => scroll(80)} className={`${classes.next} ${classes.directionButton}`}>
            <GrNext className={classes.icon} />
          </button>
          <Card className={`${classes.card}`} ref={scrollRef}>
            {categories.map((element) => (
              <CategoryList
                key={element.subCategory}
                cloudImage={element.cloudImage}
                subCategryName={element.subCategory}
                category={element.category}
              />
            ))}
          </Card>
          <button onClick={() => scroll(-80)} className={`${classes.previous} ${classes.directionButton}`}>
            <GrPrevious className={classes.icon} />
          </button>
        </div>
      )}
    </div>
  );
};
export default Category;
