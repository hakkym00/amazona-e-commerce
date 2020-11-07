import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailUser, updateUserProfile } from '../action/signinAction'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdateProfile

    useEffect(() => {
        if(!user){
            dispatch({type: 'UPDATE_USER_PROFILE_RESET'})
            dispatch(detailUser(userInfo._id))
        }else{        
            setName(user.name)
            setEmail(user.email)
        }
        
    }, [dispatch, userInfo._id, user])
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== rePassword){
            alert('Password doesnot match')
        }else{
            dispatch(updateUserProfile({userId: user._id, name, email, password}))
        }


    }
    return (
        <div>
        <div className='form'>
            <form onSubmit={submitHandler} >
                <ul className='form-container'>
                    <li><h2>User Profile</h2></li>
                        {loading ? <LoadingBox /> :
                     error ? <MessageBox> {error} </MessageBox> :
                     <>
                     {loadingUpdate && <LoadingBox />}
                     {errorUpdate && <MessageBox> {errorUpdate} </MessageBox>}
                     {successUpdate && <div className="success-sec"> Profile updated succesfully </div>}
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
                        <input type='password' name='password' id='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                    </li>
                    <li>
                        <label htmlFor='rePassword'>
                            Re-Enter Password
                        </label>
                        <input type='password' name='rePassword' id='rePassword' placeholder='Re-Enter password' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                    </li>
                    <li> <button type='submit' className='form-button'> Update </button> </li>
                    </>
                    }
                </ul>
            </form>
            
        </div>
        </div>
    )
}

export default ProfileScreen
