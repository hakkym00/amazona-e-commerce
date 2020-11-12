import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productListDispatch } from '../action/productListDispatch'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import Products from '../Components/Products'

function HomeScreen(props) {  
  const category = props.match.params.id
  const [searchKeyword, setSearchKeyword] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  useEffect(() => {
    dispatch(productListDispatch(category, searchKeyword, sortBy))
  }, [dispatch, category, sortBy])
  const { loading, products, errorMsg} = productList
  const submitHandler = ()  => {
    dispatch(productListDispatch(category, searchKeyword, sortBy))
  }
  const sortByHandler = (e) => {
    setSortBy(e.target.value)
    dispatch(productListDispatch(category, searchKeyword, sortBy))
  }
  console.log( `searchKeyword is ${searchKeyword} . sortBy is ${sortBy} , category is ${category}`)
  return (

      loading ? <LoadingBox /> :
        errorMsg ? <MessageBox> {errorMsg} </MessageBox> : 
        <div>
        {category && <h3> {category} </h3>}

        <ul className='filter'>
            <li>
              <form onSubmit={submitHandler}>
                <input type='text' placeholder='Search product name ' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value) } />

                <button type='submit' className="search-btn"> Search </button>
              </form>
            </li>
            <li>
              <select value={sortBy} onChange={sortByHandler}>
                <option value='newest'>Newest</option>
                <option value='lowest'>Lowest</option>
                <option value='highest'>Highest</option>
              </select>
            </li>
          </ul>
          <div>
            <ul className="products">
                {
                  products.map(product => 
                    <Products key={product._id} product={product} />
                    )
                }                 
            </ul>
        </div>
        </div>
  
  )
}

export default HomeScreen
