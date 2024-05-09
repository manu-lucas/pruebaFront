import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoLogin from '../../assets/logo_login.svg';
import IsologoLogin from '../../assets/isologo_login.svg';
import { Loader } from '../../components/Loader/Loader';
//import { decodeToken } from './LoginFunction';
import { jwtDecode } from "jwt-decode";
import { AppContext } from '../../context/AppContext';
import { getAllProductos } from '../../utils/api/Productos/getAllProductos';


const LoginScreen = () => {

  const { setUserLoggedData,setLogged,setProyectos,setClientes,setOrdenesDeTrabajo,setSubusuarios,setProducts,setProveedores,setOrdenesDeCompra } = useContext(AppContext)
  
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
        console.log(response)
        
        const tokenDecode = jwtDecode(response.data.payload.token)
        console.log(tokenDecode)

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
    
    getProyectos(userId)
    getClientes(userId)
    getOTs(userId)
    getAllUsers(userId)
    getAllProviders(userId)
    //getAllProductos(userId)
    getAllProducts(userId)
    getOCs(userId)
  }


  async function getProyectos (userId){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/projects/alldata/${userId}`)
      //console.log(response)
      setProyectos(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }

  async function getClientes (userId){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/clientes/alldata/${userId}`)
      //console.log(response)
      setClientes(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }


  //Obtener ordenes de trabajp
  async function getOTs (userId){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/ordenTrabajo/alldata/${userId}`)
      //console.log(response)
      setOrdenesDeTrabajo(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }


  //Obtener usuarios
  async function getAllUsers (userId){
    try{
      
      const activeUsers = await getAllUsersActive(userId)
      
      const inactiveUsers = await getAllUsersInactive(userId)

      let array = [...activeUsers,...inactiveUsers]
      array.sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
      });


      console.log('usuarios!')
      console.log(array)
      setSubusuarios(array)
      
    }catch (err) {
      console.log(err)
    }
  }

  async function getAllUsersActive (userId){
    try{
      const responseUsersAct = await axios.get(`https://appify-black-side.vercel.app/user/allUsersAct/${userId}`)
      console.log('usuarios activos')
      const activeUsers = responseUsersAct.data.payload.map((item)=>{
        return {...item, estado: "Activo"}
      })
      console.log(activeUsers)
      return activeUsers
    }catch (err) {
      return []
    }
  }


  async function getAllUsersInactive (userId){
    try{
      const responseUsersInac = await axios.get(`https://appify-black-side.vercel.app/user/allUsersInact/${userId}`)
      console.log('usuarios inactivos')
      const inactiveUsers = responseUsersInac.data.payload.map((item)=>{
        return {...item, estado: "Inactivo"}
      })
      console.log(inactiveUsers)
      return inactiveUsers
    }catch (err) {
      return []
    }
  }




  ///Obtener proveedores

  async function getAllProviders (userId){
    try{
      
      const activeProv = await getAllProvidersActive(userId)

      const inactiveProv = await getAllProvidersInactive(userId)

      
      let array = [...activeProv,...inactiveProv]
      
      array.sort((a, b) => {
        return a.razon_social.localeCompare(b.razon_social);
      });
      console.log('Proveedores todos:')
      console.log(array)
      setProveedores(array)
      
    }catch (err) {
      console.log(err)
    }
  }


  async function getAllProvidersActive (userId){
    try{
      const responseProvAct = await axios.get(`https://appify-black-side.vercel.app/proveedor/allProvAct/${userId}`)
      const activeProv = responseProvAct.data.payload.map((item)=>{
        return {...item, estado: "Activo"}
      })
      return activeProv
    }catch(err){
      return []
    }
  }


  async function getAllProvidersInactive (userId){
    try{
      const responseProvInac = await axios.get(`https://appify-black-side.vercel.app/proveedor/allProvInact/${userId}`)
      const inactiveProv = responseProvInac.data.payload.map((item)=>{
        return {...item, estado: "Inactivo"}
      })
      return inactiveProv
    }catch(err){
      return []
    }
  }


  
  //Obtener productos:

  async function getAllProducts (userId){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/products/products/${userId}`)
      console.log('productos:')
      console.log(response.data.payload)
      setProducts(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }

  //Obtener ordenes de compra
  async function getOCs (userId) {
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/ordenCompra/alldata/${userId}`)
      setOrdenesDeTrabajo(response.data.payload)
    }catch (err){
      console.log(err)
    }
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
              <button className='reset-pass'>Olvidé mi contraseña</button>
            </div>
          </div>
          </div>
        
          <div>
            <button type="submit" className='login-button'>Iniciar sesión</button>
          </div>
        </form>

      </div>
    </div>
    </>
  ) 
}


export default LoginScreen