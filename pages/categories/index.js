import {useRouter} from 'next/router'
function CategoriesPage(props) {
    const router = useRouter()
    console.log(router.query);
    return (
        <span>
            ID OF PRODUCT 
        </span>
    )
}
export default CategoriesPage