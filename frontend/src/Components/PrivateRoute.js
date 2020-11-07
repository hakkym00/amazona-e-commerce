import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    console.log(userInfo)
    console.log(Component)
    console.log(rest)
    return (
        <Route {...rest} render={(props) => userInfo? ( <Component {...props} ></Component > ) :
        (
            <Redirect to="/signin" />
        ) 
        }
        ></Route> 
    )
}

export default PrivateRoute
