import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import Cookies from 'js-cookie'
import cartItemReducer from '../reducer/cartItemReducer'
import thunk from 'redux-thunk'
import { registerReducer, signinReducer, userDetailsReducer, userUpdateProfileReducer } from '../reducer/signinReducer'
import { createOrderReducer, productDeleteReducer, productListReducer, productSaveReducer, singleProductReducer } from '../reducer/productListReducer'
import { deleteOrderReducer, deliverOrderReducer, myOrderHistoryReducer, orderListReducer, orderReducer, payOrderReducer } from '../reducer/orderReducer'

const cartItems = Cookies.getJSON('cartItems') || []
const userInfo = Cookies.getJSON('userInfo') || null
const shipping = Cookies.getJSON('shipping') || {}
const initialState = {
    cart: {cartItems, shipping, payment: {paymentMethod: 'paystack'}},
    userSignin: {userInfo}
}
const reducer = combineReducers({
    productList: productListReducer,
    singleProduct: singleProductReducer,
    cart: cartItemReducer,
    userSignin: signinReducer,
    userRegister: registerReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    createdOrder: createOrderReducer,
    orderInfo: orderReducer,
    payOrderInfo: payOrderReducer,
    myOrderHistory: myOrderHistoryReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    listOrders: orderListReducer,
    orderDelete: deleteOrderReducer,
    deliverOrderInfo: deliverOrderReducer

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export { store}
