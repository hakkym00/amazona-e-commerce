import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { orderHistoryMine } from '../action/orderAction'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'

function OrderHistory(props) {
    const dispatch = useDispatch()
    const myOrderHistory = useSelector(state => state.myOrderHistory)
    const {loading, order, error} = myOrderHistory
    useEffect(() => {
        dispatch(orderHistoryMine())
        
    }, [])
    console.log(order)
    return (
        loading ? <LoadingBox /> :
        error ? <MessageBox> {error} </MessageBox> : 
        <div>
            <div className="product-list">
                <h3>Order history</h3>
                {
                    order.length <= 0? <div className="info-sec"> No orders has been placed</div> :
                    <div className="table-scroll">
                    <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map(order =>
                                <tr key= {order._id} >
                                    <td> {order._id} </td>
                                    <td> {order.createdAt.substring(0, 10)} </td>
                                    <td> {order.totalPrice.toFixed(2)} </td>
                                    <td> {order.isPaid ? order.paidAt.substring(0, 10) : 'No'} </td>
                                    <td> {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'} </td>
                                    <td><button className='btn' onClick={() => props.history.push(`/order/${order._id}`)} >Details</button> </td>
                                    
                                </tr>
                                )
                        }
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                }
                
            </div>
        </div>
    )
}

export default OrderHistory
