import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginScreen from '../../screens/Login/LoginScreen'

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/*' element={<Navigate to='/login'/>}/>
    </Routes>
  )
}

export default PublicRoutes