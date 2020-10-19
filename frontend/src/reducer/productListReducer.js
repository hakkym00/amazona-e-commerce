
const productListReducer = (state = {products: []}, action) => {
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

export { productListReducer, productSaveReducer, productDeleteReducer}