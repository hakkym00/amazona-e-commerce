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
        dispatch({type: 'USER_SIGNIN_FAILED', payload: error.message})
    }
}


const register = (name, email, password) => async(dispatch) => {
    dispatch({type: 'USER_REGISTER_REQUEST', payload: {name, email, password}})       
    try {
        const {data} = await Axios.post('/api/users/register', {name, email, password})
        dispatch({type: 'USER_REGISTER_SUCCESS', payload: data})
        Cookies.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({type: 'USER_REGISTER_FAILED', payload: error.message})
    }
}

export { signin, register }