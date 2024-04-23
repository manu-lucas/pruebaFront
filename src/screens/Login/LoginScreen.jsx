import axios from 'axios';
import React, { useContext, useState } from 'react'
import Logo from '../../assets/logoappify.svg'
import { AppContext } from '../../context/AppContext';


const LoginScreen = () => {
  const { logged,setLogged } = useContext(AppContext);

  const [ userData,setUserData ] = useState({email:'',password:''});
  
  const HandleSubmit = (e) =>{
    e.preventDefault();
    console.log(userData)
    //login(userData)
    testLogin()
  }

  async function login (data) {
    try{
      const response = await axios.post('http://localhost:8080/login',data)
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }

  function testLogin () {
    setLogged(true)
  }

  return (
    <div className='login-bg'> 
        <div className='login-logo-container'>
          <img src={Logo} alt='My SVG' className='login-logo'/>
          <span className='login-ttl'>Tu gestión en un solo lugar</span>
        </div>
        <form onSubmit={HandleSubmit} className='login-form'>
            <span>Iniciar Sesion</span>
            <div className='login-form-input-container'>
                <label>Email</label>
                <input type='email' value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}/>
            </div>
            <div className='login-form-input-container'>
                <label>Contraseña</label>
                <input type='password' value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}}/>
            </div>
            <button type='submit'>Ingresar</button>
        </form>
    </div> 
  )
}

export default LoginScreen