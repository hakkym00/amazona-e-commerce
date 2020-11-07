

const cartItemReducer = (state= {cartItems: [], shipping: {}, payment: {}}, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM' :
            const item = action.payload
            const product = state.cartItems.find(x => x.product === item.product)
            if(product){
            return {...state, cartItems: state.cartItems.map(x => x.product === product.product? item : x) }
            }else{
                return {...state, cartItems: [...state.cartItems, item]}
            }
        case 'REMOVE_ITEM_FROM_CART':
            return{...state, cartItems: state.cartItems.filter(x => x.product !== action.payload )}
        case 'CART_SAVE_SHIPPING' :
            return {...state, shipping: action.payload}
        case 'CART_SAVE_PAYMENT' :
            return {...state, payment: action.payload}
        case 'DELETE_CART' :
            return {...state, cartItems: []}
        default:
            return state
    }
}


export default cartItemReducer