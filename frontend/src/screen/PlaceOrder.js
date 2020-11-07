import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../Components/CheckoutSteps'
import { createOrder } from '../action/productListDispatch'


function PlaceOrder(props) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const createdOrder = useSelector(state => state.createdOrder)
    const {loading, success, error, order} = createdOrder
    
    const { cartItems, shipping, payment } = cart
    const itemsPrice =  cartItems.reduce((a, c) => a + c.price* c.qty, 0)
    const shippingPrice = itemsPrice > 300 ? 100 : 50
    const taxPrice = 0.15 * itemsPrice
    const totalPrice = itemsPrice + shippingPrice + taxPrice

    if(!shipping.address){
        props.history.push('/shipping')
    }else if(!payment.paymentMethod){
        props.history.push('/payment')
    }
    
    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({type: 'CREATE_ORDER_RESET'})
        }
    }, [success])
    
    const placeorderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice }))
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='placeorder'>
            <div className='placeorder-info'>
                <div>
                    <h3> Shipping</h3>
                    <div>
                        {cart.shipping.address}, {cart.shipping.city}, 
                        {cart.shipping.postalCode}, {cart.shipping.country}
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {cart.payment.paymentMethod}
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
                    cartItems.length === 0 ? 
                    <div> Cart is empty </div> :
                    cartItems.map(item => 
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
                    <li>
                        <div className='primary'>
                        <button onClick={placeorderHandler} > Place Order</button>
                        </div>
                    </li>
                    <li>Order Summary: </li>
                    <li>
                        <div>Items</div>
                        <div> #{itemsPrice} </div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div> #{shippingPrice} </div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div> #{taxPrice} </div>
                    </li>
                    <li>
                        <div>Total Order</div>
                        <div> #{totalPrice} </div>
                    </li>
                    {
                    loading ? <LoadingBox /> :
                    error ? <MessageBox> {error} </MessageBox> : null
                    }
                </ul>
            </div>
            
        </div>


        </div>
        
            )
}

export default PlaceOrder 
