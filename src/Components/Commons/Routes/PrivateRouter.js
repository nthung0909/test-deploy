import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {
    const token = localStorage.getItem('access-token')
    const isLoggedIn =  token ? true: false
    
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute