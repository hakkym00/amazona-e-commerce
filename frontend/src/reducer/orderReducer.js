

const orderReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case 'FETCH_ORDER_REQUEST' : 
            return {loading: true}
        case 'FETCH_ORDER_SUCCESS' :
            return { loading: false, order: action.payload}
        case 'FETCH_ORDER_FAILED' : 
            return {loading: false, error: action.payload}
        default : 
            return state
    }
}

const payOrderReducer = (state= {}, action) => {
    switch (action.type) {
        case 'PAY_ORDER_REQUEST' : 
            return {loading: true}
        case 'PAY_ORDER_SUCCESS' :
            return { loading: false, success: true}
        case 'PAY_ORDER_FAILED' : 
            return {loading: false, error: action.payload}
        case 'PAY_ORDER_RESET' :
            return {}
        default : 
            return state
    }
}

const myOrderHistoryReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case 'MY_ORDER_HISTORY_REQUEST':
            return { loading: true}
        case 'MY_ORDER_HISTORY_SUCCESS':
            return { loading: false, order: action.payload}
        case 'MY_ORDER_HISTORY_FAILED':
            return { loading: false, error: action.payload}   
        default:
            return state;
    }
}

export {orderReducer, payOrderReducer, myOrderHistoryReducer}