import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
const RedirectRoutes = () => {
    let auth = { token: false }
    if (localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY) == null) {
        auth.token = false
    }
    else
        auth.token = true
    return (
        auth.token === false ? <Outlet /> : <Navigate to={'/login'} />
    )
}

export default RedirectRoutes   
