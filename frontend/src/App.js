import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import ProductScreen from './screen/ProductScreen'
import HomeScreen from './screen/HomeScreen'
import './App.css';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from './screen/RegisterScreen';
import ProductsScreen from './screen/ProductsScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrder from './screen/PlaceOrder';
import OrderScreen from './screen/OrderScreen';
import SampleScreen from './screen/SampleScreen';
import OrderHistory from './screen/OrderHistory';
import ProfileScreen from './screen/ProfileScreen';
import { signoutAction } from './action/signinAction';
import PrivateRoute from './Components/PrivateRoute';

function App() {
    const cart = useSelector(state => state.cart)
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const {cartItems} = cart
    const dispatch = useDispatch()

  const openSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('sidebar-cliked')
}

const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('sidebar-cliked')
}
const signoutHandler = () => {
    dispatch(signoutAction())
}
  return (
  <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand-link">
                <button onClick={openSidebar} >&#9776;</button>
                <Link to='/'>amazona</Link>
                 </div>
            <div className="header-links">
                
                {
                    userInfo ? <div className="dropdown">
                        <div className="profile-name"> {userInfo.name} <i className=" fa fa-caret-down"></i> </div>
                        <div className="dropdown-content"> 
                            <Link to='/profile' > {userInfo.name} Profile </Link> 
                            <Link to='/orders/history'>Order history</Link>
                            <Link to='#signout' onClick={signoutHandler} >Sign out</Link>                        
                        </div>
                    </div>
                    : <Link to='/signin' ><span>Sign in</span></Link>
                }
                
                <Link to="/cart/:id?"><span>Cart {cartItems.length > 0 && <span className="badge"> {cartItems.length} </span>} </span></Link>
            </div>
        </header>
        <aside className="sidebar">
        <div className="close-sidebar">
            <h4>Shopping Categories</h4>
            <button onClick={closeSidebar}> &#10005; </button>
        </div>
        <div className="sidebar-links">
            <ul>
                <li> <a href=""> Pants</a></li>
                <li> <a href="">Shirts</a> </li>
            </ul>
        </div>
        </aside>

        {/* <!-- home-screen-product --> */}

        <main className="main">
            <div className="content">
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/placeorder' component={PlaceOrder} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/signin' component={SigninScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/products' component={ProductsScreen} />
              <Route path='/orders/history' component={OrderHistory} />
              <PrivateRoute path='/profile' component={ProfileScreen} />
              <Route path='/' exact={true} component={HomeScreen} />
            </div>
        </main>
        <footer className="footer">All Right Reserved</footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
