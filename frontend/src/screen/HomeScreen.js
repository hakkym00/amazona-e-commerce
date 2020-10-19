import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { productListDispatch } from '../action/productListDispatch'

function HomeScreen() {  
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  useEffect(() => {
    dispatch(productListDispatch())
  }, [])
  const { loading, products, errorMsg} = productList
  return (
    <div>        
    {loading ? 'Loading....' :
      errorMsg ? errorMsg : 
      <div>
          <ul className="products">
              {
                products.map(product => 
                  <li key={product._id}>
                    <div className="product">
                        <Link to={'/product/' + product._id} > <img src={product.image} alt="" /> </Link>
                        <div className="product-name"> <Link to={'/product/' + product._id} > {product.name}</Link> </div>
                        <div className="product-brand"> {product.brand} </div>
                        <div className="price"> ${product.price} </div>
                        <div className="product-rating"> {product.ratings} ({product.numReviews} Reviews)</div>

                    </div>
                </li>
                  )
              }
                  
            </ul>
      </div>
      }
      </div>
  )
}

export default HomeScreen
