import Axios from "axios"
import Cookies from 'js-cookie'
const signin = (email, password) => async(dispatch) => {
    dispatch({type: 'USER_SIGNIN_REQUEST', payload: {email, password}})       
    try {
        const {data} = await Axios.post('/api/users/signin', {email, password})
        dispatch({type: 'USER_SIGNIN_SUCCESS', payload: data})
        Cookies.set('userInfo', JSON.stringify(data))
        console.log(data)
    } catch (error) {
        dispatch({type: 'USER_SIGNIN_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message })
    }
}


const register = (name, email, password) => async(dispatch) => {
    dispatch({type: 'USER_REGISTER_REQUEST', payload: {name, email, password}})       
    try {
        const {data} = await Axios.post('/api/users/register', {name, email, password})
        dispatch({type: 'USER_REGISTER_SUCCESS', payload: data})
        Cookies.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({type: 'USER_REGISTER_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message })
    }
}

const detailUser = (userId) => async(dispatch,getState) => {
    dispatch({type: 'USER_DETAILS_REQUEST', payload: userId})
    const {userSignin} = getState()
    const { userInfo } = userSignin
    try {
        const {data} = await Axios.get(`/api/users/${userId}` , {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: 'USER_DETAILS_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'USER_DETAILS_FAILED',  payload: error.response && error.response.data.message? error.response.data.message : error.message })
    }
}

const updateUserProfile = (user) => async(dispatch, getState) => {
    dispatch({type: 'UPDATE_USER_PROFILE_REQUEST', payload: user})
    console.log(user)
    const {userSignin} = getState()
    const { userInfo } = userSignin
    try {
        const {data} = await Axios.put(`/api/users/update/${user.userId}`, user , {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: 'UPDATE_USER_PROFILE_SUCCESS', payload: data})
        console.log(data)
        dispatch({type: 'USER_SIGNIN_SUCCESS', payload: data})
        console.log(data)
        Cookies.set('userInfo', JSON.stringify(data))
        console.log(data)
    } catch (error) {
        dispatch({type: 'UPDATE_USER_PROFILE_FAILED',  payload: error.response && error.response.data.message? error.response.data.message : error.message })
    }

}

const signoutAction = () => (dispatch) => {
    Cookies.remove('userInfo')
    Cookies.remove('cartItems')
    Cookies.remove('shipping')
    dispatch({type: 'USER_SIGNOUT'})
}

export { signin, register, detailUser, updateUserProfile, signoutAction }