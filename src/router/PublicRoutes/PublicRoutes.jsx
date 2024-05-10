import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginScreen from '../../screens/Login/LoginScreen'
import SignUpScreen from '../../screens/SignUp/SignUpScreen';
import { AppContext } from '../../context/AppContext';

const PublicRoutes = () => {

  const [ loading,setLoading ] = useState(true);


  const { signUpCode,setSignUpCode } = useContext(AppContext);

  useEffect(() => {
    getValueLocalStorage()
  }, [])


  function getValueLocalStorage () {
    const codeScreen = localStorage.getItem('code_screen')
    if(codeScreen){
      setSignUpCode(true)
    }else{
      setSignUpCode(false)
    }
    setTimeout(() => {
      setLoading(false)      
    }, 1000);
  }
  


  return (
    <Routes>

      {
        loading === true ? 
        <>
          <Route path='/*' element={<div>Loading...</div>}/>
        </>
        :
        <>
          {
            signUpCode === true ?
            <>
              <Route path='/code' element={<SignUpScreen/>}/>
              <Route path='/*' element={<Navigate to='/code'/>}/>
            </>
            :
            <>
              <Route path='/login' element={<LoginScreen/>}/>
              <Route path='/*' element={<Navigate to='/login'/>}/>
            </>
          }
        </>
      }
    </Routes>
  )
}

export default PublicRoutes