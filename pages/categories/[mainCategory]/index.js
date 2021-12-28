import {useRouter} from 'next/router'
function MainCategoryPage(props) {
    const router = useRouter()
    console.log(router.query);
    return (
        <span>
            ID OF PRODUCT 
        </span>
    )
}
export default MainCategoryPage