import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PaystackButton } from 'react-paystack'
import { fetchOrder, payOrder } from '../action/orderAction'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import Axios from 'axios'


function OrderScreen(props) {
    const orderId = props.match.params.id
    const dispatch = useDispatch()
    const [publicKey, setPublicKey] = useState('')
    const orderInfo = useSelector(state => state.orderInfo)
    const {loading, error, order} = orderInfo
    const payOrderInfo = useSelector(state => state.payOrderInfo)
    const {loading : loadingPay, success: successPay, error: errorPay} = payOrderInfo

    useEffect(() => {
        const paypalClientId = async () => {
            const {data} = await Axios.get('/api/config/paystack')
            setPublicKey(data)
        }
        if(!order || successPay || (order && order._id != orderId )){
            dispatch({type: 'PAY_ORDER_RESET'})
            dispatch(fetchOrder(orderId))
        }else(
            paypalClientId()
        )
        
    }, [dispatch, orderId, order, successPay])

    const ComponentProps = {
        email: order? order.shippingAddress.email : '',
        amount: order? order.totalPrice * 100 : 0,
        publicKey,
        text: "Pay Now",
        onSuccess: (response) => {
            dispatch(payOrder(order, response))
        },
        onClose: () => alert('Kindly trade with us')
    }
    
    return (
        loading ? <LoadingBox /> :
        error ? <MessageBox> {error} </MessageBox> : order &&
        <div>
            <h3 className="order-heading">Order : {order._id}</h3>
            <div className='placeorder'>
            <div className='placeorder-info'>
                <div>
                    <h3> Shipping</h3>
                    <div>
                        Name : {order.shippingAddress.fullName}
                    </div>
                    <br></br>
                    <div>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, 
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </div>
                    <div>
                        {order.isDelivered ? <div className='success-sec'> Delivered at {order.deliveredAt.substring(0, 10)} </div> : <div className='danger-sec'> Not Delivered</div>}
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {order.paymentMethod}
                        {order.isPaid ? <div className="success-sec">Paid at {order.paidAt.substring(0, 10)} </div> : <div className="danger-sec">Not Paid</div>}
                    </div>
                </div>
                <div>
                <ul className='cart-list-container'>
                <li>
                    <h3> Shopping Cart </h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    order.orderItems.length === 0 ? 
                    <div> Cart is empty </div> :
                    order.orderItems.map(item => 
                    <li key={item.product}>
                        <div className='cart-image'>
                        <img src={item.image} alt='' />
                        </div>
                        <div className='cart-name'>
                            <div>
                                <Link to={'/product/' + item.product} >{item.name}</Link>
                            </div>
                            <div>
                                Qty: {item.qty}
                            </div>
                        </div>
                        <div className='cart-price'>
                            #{item.price}
                        </div>
                    </li>
                    )
                }
                </ul>
                </div>
            </div>
            <div className='placeorder-action'>
                <ul>
                    <li>Order Summary: </li>
                    <li>
                        <div>Items</div>
                        <div> #{order.itemsPrice} </div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div> #{order.shippingPrice} </div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div> #{order.taxPrice} </div>
                    </li>
                    <li>
                        <div>Total Order</div>
                        <div> #{order.totalPrice} </div>
                    </li>
                    {
                        !order.isPaid && 
                            <li>
                                {
                                    <>
                                    {errorPay && <MessageBox> {errorPay} </MessageBox>}
                                    {loadingPay && <LoadingBox />}
                                    <PaystackButton {...ComponentProps} className="form-button"  />
                                    </>
                                }
                            </li>
                        
                    }
                    
                </ul>
            </div>
            
        </div>


        </div>
        
        )
}

export default OrderScreen 
