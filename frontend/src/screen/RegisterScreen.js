import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {register} from '../action/signinAction'

function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister
    const dispatch = useDispatch()
    const redirect = props.location.search? props.location.search.split('=')[1] : '/'
    console.log(redirect)
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
        return () => {
            
        }
    }, [userInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password, rePassword))
    }
    console.log(error)
    return (
        <div className='form'>
            <form onSubmit={submitHandler} >
                <ul className='form-container'>
                    <li><h2>Create account</h2></li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div> { error } </div>}
                    </li>
                    <li>
                        <label htmlFor='name'>
                            Name
                        </label>
                        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
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
                    <li>
                        <label htmlFor='rePassword'>
                            Re-Enter Password
                        </label>
                        <input type='password' name='rePassword' id='rePassword' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                    </li>
                    <li> <button type='submit' className='form-button'> Register </button> </li>
                    <li> Already registered ? </li>
                    <li> <Link to= {redirect === '/' ? 'signin' : 'signin?redirect=' + redirect} className='button-full-width' > Login here </Link> </li>
                </ul>
            </form>
            
        </div>
    )
}

export default RegisterScreen
