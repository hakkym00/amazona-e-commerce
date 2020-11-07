import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {signin} from '../action/signinAction'

function SigninScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const {loading, userInfo, error} = userSignin
    const dispatch = useDispatch()
    const redirect = props.location.search? props.location.search.split('=')[1] : '/'
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
        return () => {
            
        }
    }, [userInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }
    
    return (
        <div className='form'>
            <form onSubmit={submitHandler} >
                <ul className='form-container'>
                    <li><h2>Sign in</h2></li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div className="danger"> { error } </div>}
                    </li>
                    <li>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='password'>
                            Password
                        </label>
                        <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </li>
                    <li> <button type='submit' className='form-button'> Sign in </button> </li>
                    <li> New to amazona ? </li>
                    <li> <Link to= {redirect === '/' ? '/register' : '/register?redirect=' + redirect} className='button-full-width' >Create your amazona account </Link> </li>
                </ul>
            </form>
            
        </div>
    )
}

export default SigninScreen
