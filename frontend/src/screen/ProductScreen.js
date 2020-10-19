import axios from 'axios'
import React, { useReducer, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const initialState = {
    loading: true,
    product: {},
    errMsg: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_DETAILS_SUCCESS' :
            return {loading: false, product: action.payload}
        case 'FETCH_DETAILS_FAILED' : 
            return { loading: false, errMsg: 'Product Not Found'}
        default:
            return state
    }
}



function ProductScreen(props) { 
    const [qty, setQty] = useState(1)
    const [productDetails , dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
     axios.get('/api/products/' + props.match.params.id ).then((response) => {
        dispatch({ type: 'FETCH_DETAILS_SUCCESS', payload: response.data})
     }).catch((e) => {
         dispatch({type: 'FETCH_DETAILS_FAILED'})
     })
        
    }, [props.match.params.id])
    
    const addToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
    }

const { loading, product, errMsg} = productDetails

return (
    loading ? <div> Loading... </div> :
        errMsg ? errMsg :
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
                            Price: <b> ${product.price}</b>
                        </li>
                        <li>Description: {product.description} Nice Shirt </li>
                        <li>
                          Rating:  {product.ratings === 0 ? 4.5 : product.ratings}
                        </li>
                    </ul>
                </div>
                <div className='details-action' >
                    <ul>
                        <li> Price: <b> ${product.price}</b> </li>
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
