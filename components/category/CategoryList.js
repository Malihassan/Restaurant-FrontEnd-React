import { useRouter } from 'next/router';
import classes from './categorylist.module.css'
const CategoryList = (props) => {
    const router =useRouter()
    let selectedStyle
    const forwardToCategoryHandler =()=>{
        router.push(`/categories/${props.category}/${props.subCategryName}`)
        selectedStyle = classes.selectedCategory
    }
  return (
    <div className={`${classes.list} ${selectedStyle}`} onClick={forwardToCategoryHandler}>
      <div className={classes.imageContainer}>
        <img src={props.cloudImage} />
      </div>
      <div className={classes.categoryDetails}>
        <span>{props.subCategryName}</span>
      </div>
    </div>
  );
};

export default CategoryList