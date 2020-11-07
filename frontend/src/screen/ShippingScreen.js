import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {saveShipping} from '../action/cartAction'
import CheckoutSteps from '../Components/CheckoutSteps'

function ShippingScreen(props) {
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin
    if(!userInfo){
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const cart = useSelector(state => state.cart)
    const {shipping} = cart
    const dispatch = useDispatch()
    useEffect(() => {
        if(shipping){
            setFullName(shipping.fullName)
            setEmail(shipping.email)
            setAddress(shipping.address)
            setCity(shipping.city)
            setCountry(shipping.country)
            setPostalCode(shipping.postalCode)
        }
    }, [shipping])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({fullName, email, address, country, city, postalCode}))
        props.history.push('/payment')
    }
    return ( <div>
        <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className='form'>
            <form onSubmit={submitHandler} >
                <ul className='form-container'>
                    <li><h2>Shipping</h2></li>
                    <li>
                        <label htmlFor='fullName'>
                            Full Name
                        </label>
                        <input type='text' name='fullname' id='fullname' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='address'>
                            Address
                        </label>
                        <input type='text' name='address' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='country'>
                            Country
                        </label>
                        <input type='text' name='country' id='country' value={country} onChange={(e) => setCountry(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='city'>
                            City
                        </label>
                        <input type='text' name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='postalCode'>
                            Postal Code
                        </label>
                        <input type='text' name='postalCode' id='postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </li>
                    <li> <button type='submit' className='form-button'> Continue </button> </li>
                    
                </ul>
            </form>
            
        </div>

    </div>
           )
}

export default ShippingScreen
