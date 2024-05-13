import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoLogin from '../../assets/logo_login.svg';
import IsologoLogin from '../../assets/isologo_login.svg';
import { Loader } from '../../components/Loader/Loader';
//import { decodeToken } from './LoginFunction';
import { jwtDecode } from "jwt-decode";
import { AppContext } from '../../context/AppContext';
import { getAllProductos } from '../../utils/api/Productos/getAllProductos';
import { getAllProducts, getAllProviders, getAllUsers, getClientes, getOCs, getOTs, getProyectos, getVentas } from '../../utils/api/Login/LoginFunction';
import Cookies from 'js-cookie';


const LoginScreen = () => {

  const { setUserLoggedData,setLogged,setProyectos,setClientes,setOrdenesDeTrabajo,setSubusuarios,setProducts,setProveedores,setOrdenesDeCompra,setSignUpCode,setVentas,setLoadingPrivateRoutes } = useContext(AppContext)
  
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const[formData, setFormData]= useState({
    email:'',
    password:'',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = '*El correo electrónico es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '*Ingresa un correo electrónico válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = '*La contraseña es requerida';
    }

    if (Object.keys(newErrors).length === 0) {
      setLoading(true); 
      /*
      setTimeout(() => {
        setLoading(false)
      }, 3000);
      */
      try{
        const response = await axios.post(`https://appify-black-side.vercel.app/user/login`, formData)
        
        console.log('respuesta del login')
        console.log(response)

        
        const tokenDecode = jwtDecode(response.data.payload.token)
        console.log('data del token')
        console.log(tokenDecode)
        //localStorage.setItem('tkn',response.data.payload.token)
        Cookies.set('tkn',response.data.payload.token)
        
        setUserLoggedData(tokenDecode)
        getLoginData(tokenDecode.data.user)
        setLogged(true)
        
      }catch(err){
        console.log(err)
        newErrors.credentials = '*Error al iniciar sesión';
        setErrors(newErrors);
      }finally{
        setLoading(false);  // Terminar la carga
        console.log('peticion finalizada')

      }
    
    } else {
      setErrors(newErrors);
    }
  };



  //Peticiones del login

  async function getLoginData (userId) {
    //Esta funcion es para hacer todas las llamsdas correspondoentes
    //proyectos
    setLoading(true)
    
    getProyectos(userId,setProyectos)
    getClientes(userId,setClientes)
    getOTs(userId,setOrdenesDeTrabajo)
    getAllUsers(userId,setSubusuarios)
    getAllProviders(userId,setProveedores)
    //getAllProductos(userId)
    getAllProducts(userId,setProducts)
    getOCs(userId,setOrdenesDeCompra)
    getVentas(userId,setVentas)
    
    
    setTimeout(() => {
      setLoadingPrivateRoutes(false)
      setLoading(false)
    }, 2000);
    
  }

  function registerAcount (){
    setLoading(true)
    console.log('registrar cuenta')
    setTimeout(() => {
      setSignUpCode(true)
      setLoading(false)
    }, 1000);
  }


 return(
    <>
    {loading && <Loader label={'Cargando...'}/>}
    <div className="login-bg">
      <div className='login-logo-container'>
          <img src={LogoLogin} alt='My SVG' className='login-logo'/>
      </div>

      <div className='login-form-container'>

        <div className='login-isologo-container'>
          <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
          <h1 className='login-title'>Iniciar sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className='login-form'>
        
          <div className='label-email'>
              <label htmlFor="email" className='email'>Email</label>
              <input
              name="email"
              placeholder="Ingrese su email"
               value={formData.email}
              onChange={handleChange}
              />
             {errors.email && <p className='errorInput'>{errors.email}</p>}
          </div>
          <div className='label-password'>
            <label htmlFor="password" className='password'>Contraseña</label>
            <div className='input-password'>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" onClick={handleTogglePassword}className="toggle-password">
              {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
            
             {errors.password && <p className='errorInput'>{errors.password}</p>}
            <div >
            <div className='reset-pass-wrapper'>
              <button type="button"  className='reset-pass' onClick={() => console.log('Botón clickeado!')}>Olvidé mi contraseña</button>
            </div>
          </div>
          </div>
        
          <div>
            <button type="submit" className='login-button'>Iniciar sesión</button>
          </div>

          <div className='login-sign-up' onClick={()=>{registerAcount()}} >Crear cuenta nueva</div>
        </form>

      </div>
    </div>
    </>
  ) 
}


export default LoginScreen