import React from 'react'
import { Link } from 'react-router-dom'
import RatingBox from './RatingBox'
function Products(props) {
    const {product} = props
    return (
        <li key={product._id}>
                    <div className="product">
                        <div className="product-image"><Link to={'/product/' + product._id} > <img src={product.image} alt="" /> </Link></div>
                        <div className="product-body">
                        <div className="product-name"> <Link to={'/product/' + product._id} > {product.name}</Link> </div>
                        <div className="product-brand"> {product.brand} </div>
                        <div className="price"> #{product.price} </div>
                        <div className="product-rating"> <RatingBox ratings={product.ratings} numReviews={product.numReviews} /> </div>
                        </div>
                    </div>
                </li>
    )
}

export default Products
