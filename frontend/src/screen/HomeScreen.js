import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productListDispatch } from '../action/productListDispatch'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import Products from '../Components/Products'

function HomeScreen() {  
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  useEffect(() => {
    dispatch(productListDispatch())
  }, [])
  const { loading, products, errorMsg} = productList
  return (
    
    loading ? <LoadingBox /> :
      errorMsg ? <MessageBox> {errorMsg} </MessageBox> : 
      <div>
          <ul className="products">
              {
                products.map(product => 
                  <Products key={product._id} product={product} />
                  )
              }                 
          </ul>
      </div>
     
      
  
  )
}

export default HomeScreen
