
const productListReducer = (state = {loading: true, products: [] }, action) => {
    switch (action.type) {
      case 'FETCH__REQUEST' :
        return{loading: true, products: []}
      case 'FETCH__SUCCESS' :
        return {
          loading: false,
          products: action.payload,
          errorMsg: ''
        }
      case 'FETCH__FAILED' :
        return {
          loading: false,
          products: [],
          errorMsg: 'Something went wrong'
        }
  
      default :
      return state
    }
}

const singleProductReducer = (state = {loading: true, product: {} }, action) => {
  switch (action.type) {
    case 'REQUEST__SINGLE__PRODUCT' :
      return{loading: true, product: {}}
    case 'REQUEST__SINGLE__PRODUCT__SUCCESS' :
      return {
        loading: false,
        product: action.payload,
        errorMsg: ''
      }
    case 'REQUEST__SINGLE__PRODUCT__FAILED' :
      return {
        loading: false,
        product: {},
        errorMsg: action.payload
      }

    default :
    return state 
  }

}

const createOrderReducer = (state = {loading:false, order: {}}, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST' :
      return {loading: true}
    case 'CREATE_ORDER_SUCCESS' :
      return {loading: false, success: true, order: action.payload}
    case 'CREATE_ORDER_FAILED' :
      return {loading: false, error: action.payload}
    case 'CREATE_ORDER_RESET' :
      return {}
    default :
    return state
  }
}

const productSaveReducer = (state = {product : {} }, action) => {
    switch (action.type) {
      case 'SAVE_PRODUCT_REQUEST' :
        return { loading: true }
      case 'SAVE_PRODUCT_SUCCESS' :
        return { loading: false, success: true, product: action.payload }
      case 'SAVE_PRODUCT_FAILED' :
        return { loading: false, error: action.payload }
      default :
      return state
    }
}

const productDeleteReducer = (state = {product : {} }, action) => {
    switch (action.type) {
      case 'DELETE_PRODUCT_REQUEST' :
        return { loading: true }
      case 'DELETE_PRODUCT_REQUEST' :
        return { loading: false, success: true, product: action.payload }
      case 'DELETE_PRODUCT_REQUEST' :
        return { loading: false, error: action.payload }
      default :
      return state
    }
}

export { productListReducer, productSaveReducer, productDeleteReducer, singleProductReducer, createOrderReducer}