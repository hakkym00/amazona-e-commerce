const { default: Axios } = require("axios")

const fetchOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: 'FETCH_ORDER_REQUEST'})
    try {
        const {userSignin} = getState()
        const { userInfo } = userSignin
        const {data} = await Axios.get(`/api/order/${orderId}`, {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: 'FETCH_ORDER_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'FETCH_ORDER_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message })
    }
}

const payOrder = (order, response) => async (dispatch, getState) => {
    dispatch({type: 'PAY_ORDER_REQUEST'})
    try {
        const {userSignin} = getState()
        const { userInfo } = userSignin
        const {data} = await Axios.put(`/api/order/${order._id}/pay`, response , {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: 'PAY_ORDER_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'PAY_ORDER_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message })
    }

}

const orderHistoryMine = () => async (dispatch, getState) => {
    dispatch({type: 'MY_ORDER_HISTORY_REQUEST'})
    try {
        const {userSignin} = getState()
        const { userInfo } = userSignin
        const {data} = await Axios.get(`/api/order/mine` , {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: 'MY_ORDER_HISTORY_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'MY_ORDER_HISTORY_FAILED', payload: error.response && error.response.data.message? error.response.data.message : error.message })
    }
}

export { fetchOrder, payOrder, orderHistoryMine }