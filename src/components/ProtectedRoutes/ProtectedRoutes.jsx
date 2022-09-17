import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {



    if(localStorage.getItem('token') === null){
        
        return <Navigate to='/'/>
    }
    else{
        
        return <Outlet />
    }
    
}

export default ProtectedRoutes
