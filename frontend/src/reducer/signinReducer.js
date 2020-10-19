const signinReducer = (state={}, action) => {
    switch (action.type) {
        case 'USER_SIGNIN_REQUEST':
            return {loading: true}

        case 'USER_SIGNIN_SUCCESS':
            return {loading: false, userInfo: action.payload}
        
        case 'USER_SIGNIN_FAILED':
            return {loading: false, error: action.payload}
            
    
        default:
            return state
    }
}

const registerReducer = (state={}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {loading: true}

        case 'USER_REGISTER_SUCCESS':
            return {loading: false, userInfo: action.payload}
        
        case 'USER_REGISTER_FAILED':
            return {loading: false, error: action.payload}
            
    
        default:
            return state
    }
}

export {signinReducer, registerReducer}