import Price from '../ui/price/Price'
import OrderItem from './items/OrderItem'
import classes from  './orderHistory.module.css'

const OrderHistory = (props) =>{
    const date = new Date(props.date)
    return (
        <div className={classes.continer}>
            <div className={classes.header}>
                <label className={classes.id}><span>Order #</span>{props.id}</label>
                <label className={classes.date}>{date.toUTCString()}</label>
            </div>
            <OrderItem  className={classes.items} cart={props.cart}/>
            <div className={classes.orderInfo}>
                <div className={classes.totalPriceAndCount}>
                    <label className={classes.countItems}><span>x{props.cart.length}</span> Items</label>
                    <Price className={classes.price} price={props.totalPayment.toFixed(2)} />
                </div>
                <button className={classes.btnReview}>Review</button>
            </div>
        </div>
    )
}

export default OrderHistory