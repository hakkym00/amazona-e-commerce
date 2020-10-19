import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProduct, productListDispatch, saveProduct } from '../action/productListDispatch'
import {signin} from '../action/signinAction'

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const [_id, set_id] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [availablequantity, setAvailablequantity] = useState('')
    const [description, setDescription] = useState('')
    const productList = useSelector(state => state.productList)
    const {loading, products, errorMsg} = productList
    const productSave = useSelector(state => state.productSave)
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave
    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete
    const dispatch = useDispatch()
    useEffect(() => {
        if(successSave){
            setModalVisible(false)
        }
        dispatch(productListDispatch())
        return () => {
            
        }
    }, [successSave, successDelete])
    const openModal = (product) => {
        setModalVisible(true)
        set_id(product._id)
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setAvailablequantity(product.availablequantity)
        setDescription(product.description)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ 
            _id,
            name, price, image, brand, category, 
            availablequantity, description}))
    }
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id))
    }
    return (
        <div className='content content-margined'>
            <div className='product-header'>
            <h3>Products</h3>
            <button className='btn-color' onClick= {() => openModal({})}>Create product</button>
            </div>
            <div className='product-list'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty In stock</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product =>
                                <tr key= {product._id} >
                                    <td> {product._id} </td>
                                    <td> {product.name} </td>
                                    <td> ${product.price} </td>
                                    <td> {product.availablequantity} </td>
                                    <td> {product.category} </td>
                                    <td> {product.brand} </td>
                                    <td>
                                        <button className='btn' onClick= {() => openModal(product)} >Edit</button>
                                        {' '}
                                        <button className='btn' onClick= {() => deleteHandler(product)} >Delete</button>
                                    </td>
                                    
                                </tr>
                                )
                        }
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        
        {
            modalVisible && <div className='form'>
            <form onSubmit={submitHandler} >
                <ul className='form-container'>
                    <li><h2>Create product</h2></li>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div> { errorSave } </div>}
                    </li>
                    <li>
                        <label htmlFor='name'>
                            Name
                        </label>
                        <input type='text' name='name' value={name} id='name' onChange={(e) => setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='price'>
                            Price
                        </label>
                        <input type='text' name='price' value={price} id='price' onChange={(e) => setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='image'>
                            Image
                        </label>
                        <input type='text' name='image' value={image} id='image' onChange={(e) => setImage(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='brand'>
                            Brand
                        </label>
                        <input type='text' name='brand' value={brand} id='brand' onChange={(e) => setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='category'>
                            Category
                        </label>
                        <input type='text' name='category' value={category} id='category' onChange={(e) => setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='availablequantity'>
                            Quantity avaialable
                        </label>
                        <input type='text' name='availablequantity' value={availablequantity} id='availablequantity' onChange={(e) => setAvailablequantity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea name='description' value={description} id='description' onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </li>

                    <li> <button type='submit' className='form-button'> {_id ? 'Update' : 'Create' } </button> </li>
                    <li> <button type='button' className='button-full-width' onClick={() => setModalVisible(false)}> Close </button> </li>
                </ul>
            </form>
            </div>
        }

         
        </div>
    )
}

export default ProductsScreen
