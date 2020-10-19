import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {savePayment} from '../action/cartAction'
import CheckoutSteps from '../Components/CheckoutSteps'

function PaymentScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}))
        props.history.push('/placeorder')
    }
    return ( <div>
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
        <div className='form'>
            <form onSubmit={submitHandler} >
                <ul className='form-container'>
                    <li><h2>Payment</h2></li>
                    <li>
                        <div>
                            <input type='radio' name='paymentMethod' id='paymentMethod' value='paypal' onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor='paymentMethod'>
                                Paypal
                            </label>
                        </div>
                    </li>
                    {/* <li>
                        <div>
                            <input type='radio' name='paymentMethod' id='paymentMethod' value='bitcoin' onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor='address'>
                                Bitcoin
                            </label>
                        </div>
                    </li> */}

                    <li> <button type='submit' className='form-button'> Continue </button> </li>
                    
                </ul>
            </form>
            
        </div>

    </div>
           )
}

export default PaymentScreen
