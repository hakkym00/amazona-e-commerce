import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, orderList } from '../action/orderAction'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'

function OrdersList(props) {
    const listOrders = useSelector(state => state.listOrders)
    const {loading, error, orders} = listOrders
    const orderDelete = useSelector(state => state.orderDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = orderDelete
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(orderList())
    }, [dispatch, successDelete])
    const deleteOrderHandler = (order) => {
        dispatch(deleteOrder(order))
        dispatch({type: 'ORDER_DELETE_RESET'})
    }
    return (
        loading ? <LoadingBox /> :
        error ? <MessageBox> {error} </MessageBox> : 
        <div>
            <div className="product-list">
                <h3>Orders</h3>
                {
                    orders.length <= 0? <div className="info-sec"> No orders has been placed</div> :
                    <div className="table-scroll">
                    <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order =>
                                <tr key= {order._id} >
                                    <td> {order._id} </td>
                                    <td> {order.user.name} </td>
                                    <td> {order.createdAt.substring(0, 10)} </td>
                                    <td> {order.totalPrice.toFixed(2)} </td>
                                    <td> {order.isPaid ? order.paidAt.substring(0, 10) : 'No'} </td>
                                    <td> {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'} </td>
                                    <td>
                                        <button className='btn' onClick={() => props.history.push(`/order/${order._id}`)} >Details</button> 
                                        <button className='btn' onClick={() => deleteOrderHandler(order)} >Delete</button>
                                    </td>
                                    
                                    
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

export default OrdersList
