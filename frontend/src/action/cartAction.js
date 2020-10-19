import Cookie from 'js-cookie'
import axios from 'axios'

const addToCart = (productID, qty) => (dispatch, getState) => {
    axios.get('/api/products/' + productID).then((response) => {
        const {data} = response
        dispatch({type: 'CART_ADD_ITEM', payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            availablequantity: data.availablequantity,
            qty
        }});
        const { cart: {cartItems} } = getState()
        Cookie.set('cartItems', JSON.stringify(cartItems))
    })
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: 'REMOVE_ITEM_FROM_CART', payload: productId})
    const { cart: {cartItems} } = getState()
    Cookie.set('cartItems', JSON.stringify(cartItems))
}

const saveShipping = (data) => (dispatch) => {
    dispatch({type: 'CART_SAVE_SHIPPING', payload: data})
}
const savePayment = (data) => (dispatch) => {
    dispatch({type: 'CART_SAVE_PAYMENT', payload: data})
}


export { addToCart , removeFromCart, saveShipping, savePayment}