import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { singleProductDispatch } from '../action/productListDispatch'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import RatingBox from '../Components/RatingBox'

function ProductScreen(props) { 
    const { id } = props.match.params
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)  
    
    const singleProduct = useSelector(state => state.singleProduct)
    useEffect(() => {
     dispatch(singleProductDispatch(id))

    }, [])
    
    const addToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
    }

const { loading, product, errorMsg} = singleProduct

return (
    loading ? <LoadingBox /> :
      errorMsg ? <MessageBox> {errorMsg} </MessageBox> : 
        <div>
            <div className='back-to-home'>
                <Link to='/' >Back to home </Link>
            </div>
            <div className="details">
                <div className='details-img' >
                    <img src={product.image} alt='products' />
                </div>
                <div className='details-info' >
                    <ul>
                        <li>
                            <h4> {product.name} </h4>
                        </li>                       
                        <li>
                            {product.category}
                        </li>
                        <li>
                            {product.numReviews === 0 ? 5 : product.numReviews} customer reviews
                        </li>
                        <li>
                            Price: <b> #{product.price}</b>
                        </li>
                        <li>Description: {product.description} Nice Shirt </li>
                        <div className="product-rating"> <RatingBox ratings={product.ratings} numReviews={product.numReviews} /> </div>
                    </ul>
                </div>
                <div className='details-action' >
                    <ul>
                        <li> Price: <b> #{product.price}</b> </li>
                        <li>Status: {product.availablequantity <= 0 ? 'Out of Stock' : 'Stock available'} </li>
                        <li>Qty: <select value={qty} onChange={(e) => setQty(e.target.value)} >  
                                    {[...Array(product.availablequantity).keys()].map(x => <option key={x + 1} value={x + 1} > {x + 1} </option> )} 
                                </select>
                        
                        </li>
                        <li className= 'primary'> {product.availablequantity > 0 ? <button onClick={addToCart} >Add to Cart</button> : <button>Disabled</button> }</li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductScreen
