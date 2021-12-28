import Price from '../../ui/price/Price'
import classes from './orderItem.module.css'

const OrderItem = (props) =>{
    return(
        <div className={props.className}>
            {props.cart.map((item)=>(
                <div className={classes.item} key={item._id}>
                    <label className={classes.name}>{item.ProductName}</label>
                    <div className={classes.itemInfo}>
                        <Price className={classes.price} price={item.Price.toFixed(2)} />
                        <label className={classes.quantity}>Qty:{item.Amount}</label>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default OrderItem