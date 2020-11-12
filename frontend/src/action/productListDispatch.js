import { FETCH__FAILED, FETCH__SUCCESS } from '../constant/constant'
import Axios from 'axios'
import Cookies from 'js-cookie'
const productListDispatch = (category = '', searchKeyword = '', sortBy = 'newest') => (dispatch) => {
  console.log( `searchKeyword is ${searchKeyword} . sortBy is ${sortBy} , category is ${category}`)
      dispatch({type: 'FETCH__REQUEST'})
  Axios.get(`/api/products?category=${category}&searchKeyword=${searchKeyword}&sortBy=${sortBy}`).then((response) => {
      const {data} = response
      dispatch({type: FETCH__SUCCESS, payload: data})
    })
    .catch((error) => {
      dispatch({type: FETCH__FAILED , payload: error.response && error.response.data.message? error.response.data.message : error.message })
    })
}

const singleProductDispatch = (id) => (dispatch) => {
    dispatch({type: 'REQUEST__SINGLE__PRODUCT'})
  Axios.get('/api/products/' + id).then((response) => {
    const {data} = response
    dispatch({type: 'REQUEST__SINGLE__PRODUCT__SUCCESS', payload: data})
  })
  .catch((error) => {
    dispatch({type: 'REQUEST__SINGLE__PRODUCT__FAILED' , payload: error.response && error.response.data.message? error.response.data.message : error.message})
  })
}


const createOrder = (order) => async (dispatch, getState) => {
  dispatch({type: 'CREATE_ORDER_REQUEST', payload: order})
  try {
    const {userSignin} = getState()
    const {userInfo} = userSignin
    const {data} = await Axios.post('/api/order', order, {
      headers: {
        'Authorization': 'Bearer ' + userInfo.token
      }
    })
    dispatch({type: 'CREATE_ORDER_SUCCESS', payload: data.order})
    Cookies.remove('cartItems')
    dispatch({type: 'DELETE_CART'})
    
  } catch (error) {
    
    dispatch({type: 'CREATE_ORDER_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message})
    
  }
}

const saveProduct = (product) => async (dispatch, getState) => {
  try {    
    dispatch({type: 'SAVE_PRODUCT_REQUEST', payload: product})
    const {userSignin} = getState()
    const {userInfo} = userSignin
    if(!product._id){
      const { data } = await Axios.post('/api/products', product,{
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      })
      dispatch({type: 'SAVE_PRODUCT_SUCCESS', payload: data})
    }else{
      const { data } = await Axios.put('/api/products/'+ product._id, product,{
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      })
      dispatch({type: 'SAVE_PRODUCT_SUCCESS', payload: data})
    }
  
  } catch (error) {
    dispatch({type: 'SAVE_PRODUCT_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message })
  }
}


const deleteProduct = (id) => async (dispatch, getState) => {
  try {   
  dispatch({type: 'DELETE_PRODUCT_REQUEST'})
  const {userSignin} = getState()
  const {userInfo} = userSignin
  const {data} = await Axios.delete('api/products/' + id, {
    headers: {
      'Authorization': 'Bearer ' + userInfo.token
    }
  })
  dispatch({type: 'DELETE_PRODUCT_SUCCESS', payload: data, success: true})
  } catch (error) {
    dispatch({type: 'DELETE_PRODUCT_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message })
  }
}

export { productListDispatch, singleProductDispatch, saveProduct, deleteProduct, createOrder}