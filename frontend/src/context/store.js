import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import Cookies from 'js-cookie'
import cartItemReducer from '../reducer/cartItemReducer'
import thunk from 'redux-thunk'
import { registerReducer, signinReducer } from '../reducer/signinReducer'
import { productDeleteReducer, productListReducer, productSaveReducer } from '../reducer/productListReducer'

const cartItems = Cookies.getJSON('cartItems') || []
const userInfo = Cookies.getJSON('userInfo') || null
const initialState = {
    cart: {cartItems, shipping: {}, payment: {}},
    userSignin: {userInfo}
}
const reducer = combineReducers({
    productList: productListReducer,
    cart: cartItemReducer,
    userSignin: signinReducer,
    userRegister: registerReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export { store}
