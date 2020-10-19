import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import ProductScreen from './screen/ProductScreen'
import HomeScreen from './screen/HomeScreen'
import './App.css';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screen/RegisterScreen';
import ProductsScreen from './screen/ProductsScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrder from './screen/PlaceOrder';

function App() {
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

  const openSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('sidebar-cliked')
}

const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('sidebar-cliked')
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
                <Link to="/cart/:id?"><span>Cart</span></Link>
                {
                    userInfo ? <Link to='/profile' > {userInfo.name} </Link> : <Link to='/signin' ><span>Sign in</span></Link>
                }
                
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
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/placeorder' component={PlaceOrder} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/signin' component={SigninScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/' exact={true} component={HomeScreen} />
              <Route path='/products' component={ProductsScreen} />
            </div>
        </main>
        <footer className="footer">All Right Reserved</footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
