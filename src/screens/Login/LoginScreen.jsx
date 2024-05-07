import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoLogin from '../../assets/logo_login.svg';
import IsologoLogin from '../../assets/isologo_login.svg';
import { Loader } from '../../components/Loader/Loader';
const LoginScreen = () => {
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
      setTimeout(() => {
        setLoading(false)
      }, 3000);
      /*
      try {
        // Llamada API usando axios
        const response = await axios.post('http://localhost:8080/login', formData);
        console.log(response.data);
        // Almacenamiento del userId y redirección, asumiendo que estos datos vienen en la respuesta.
        localStorage.setItem('userId', response.data.userId);
        navigate('/'); // Redireccionar al usuario a la página de inicio
      } catch (err) {
        // Manejo simple del error
        console.error('Error de autenticación:', err);
        newErrors.credentials = '*Error al iniciar sesión';
        setErrors(newErrors);
      } finally {
        setLoading(false);  // Terminar la carga

    }*/
    
    } else {
      setErrors(newErrors);
    }
  };
 return(
    <>
    {loading && <Loader/>}
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