

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

const deliverOrderReducer = (state= {loadind: false}, action) => {
    switch (action.type) {
        case 'DELIVER_ORDER_REQUEST' : 
            return {loading: true}
        case 'DELIVER_ORDER_SUCCESS' :
            return { loading: false, success: true}
        case 'DELIVER_ORDER_FAILED' : 
            return {loading: false, error: action.payload}
        case 'DELIVER_ORDER_RESET' :
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
            return { loading: false, orders: action.payload}
        case 'MY_ORDER_HISTORY_FAILED':
            return { loading: false, error: action.payload}   
        default:
            return state;
    }
}

const orderListReducer = (state ={loading: true, orders: []}, action) => {
    switch (action.type) {
        case 'ORDER_LIST_REQUEST' :
            return {loading: true}
        
        case 'ORDER_LIST_SUCCESS' : 
            return {loading: false, orders: action.payload}

        case 'ORDER_LIST_FAILED' :
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

const deleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_DELETE_REQUEST':
            return {loading: true}

        case 'ORDER_DELETE_SUCCESS':
            return {loading: false, success: true}

        case 'ORDER_DELETE_FAILED':
            return {loading: false, error: action.payload}
        case 'ORDER_DELETE_RESET' :
            return {}
    
        default:
            return state
    }
}

export {orderReducer, payOrderReducer, myOrderHistoryReducer, orderListReducer, deleteOrderReducer, deliverOrderReducer}