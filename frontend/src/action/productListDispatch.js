import { FETCH__FAILED, FETCH__SUCCESS } from '../constant/constant'
import Axios from 'axios'

const productListDispatch = () => (dispatch) => {
      dispatch({type: 'FETCH__REQUEST'})
  Axios.get('/api/products').then((response) => {
      const {data} = response
      dispatch({type: FETCH__SUCCESS, payload: data})
    })
    .catch(() => {
      dispatch({type: FETCH__FAILED })
    })
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
    dispatch({type: 'SAVE_PRODUCT_FAILED', payload: error.message })
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
    dispatch({type: 'DELETE_PRODUCT_FAILED', payload: error.message })
  }
}

export { productListDispatch, saveProduct, deleteProduct}