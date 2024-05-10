import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import IsologoLogin from '../../assets/isologo_login.svg';
import CodigoVerificacion from '../../components/InputCode/CodigoVerificacion';
import axios from 'axios';
import { display } from '@mui/system';
import { DatePicker } from 'antd';
import { Loader } from '../../components/Loader/Loader';
import LogoLogin from '../../assets/assets/logo_login.svg';
import { getAllProducts, getAllProviders, getAllUsers, getClientes, getOCs, getOTs, getProyectos, getVentas } from '../../utils/api/Login/LoginFunction';

const FirstStep = ({setStep}) =>{


  const [ data,setData ] = useState({email:''})

  function sendCode (e) {
    e.preventDefault()
    console.log(data)
    sendEmail()

  }


  async function sendEmail () {
    try{
      const response = await axios.post('https://appify-black-side.vercel.app/user/send-mail',data)
      console.log(response)
    }catch (err){
      console.log(err)
    }finally{
      localStorage.setItem('code_screen',2)
      localStorage.setItem('user_email',data.email)
      setStep(2)
    }
  }


  return(
    <>
      
      <div className='login-form-container'>
        <div className='login-isologo-container'>
          <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
          <h1 className='login-title'>Registrarse</h1>
        </div>
        <form className='login-form' onSubmit={sendCode}>
          <div className='label-email'>
              <label htmlFor="email" className='email'>Email</label>
              <input
              name="email"
              placeholder="Ingrese su email"
              value={data.email}
              onChange={(e)=>{setData({email:e.target.value})}}
              //value={formData.email}
              //onChange={handleChange}
              />
          </div>
          <div className='label-email'>
              <label htmlFor="email" className='email'>Confirme su email</label>
              <input
              name="email"
              placeholder="Confirme su email"
              //value={formData.email}
              //onChange={handleChange}
              />
          </div>

          <div>
            <button 
            type="submit" 
            className='login-button'>Enviar codigo</button>
          </div>
        </form>
      </div>
    </>
  )
}


const SecondStep = ({setStep}) =>{
  const { setSignUpCode } = useContext(AppContext);

  //codigos hardcodeados
  const codigos = [
    "S31D",
    "M14C",
    "P03L",
    "A86M",
    "C8HY",
    "L85S",
    "M21S",
    "M20F",
    "Q20G",
    "P20S",
  ]


  function cancel() {
    localStorage.clear()
    setSignUpCode(false)
  }

  function confirmCode (e){
    e.preventDefault()
    //localStorage.setItem('code_screen', 3);
    //setStep(3)
  }

  /*---------------------*/

  const [inputs, setInputs] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value.slice(0, 1);

    setInputs(newInputs);

    // Mover el enfoque automáticamente
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !inputs[index]) {
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        inputRefs.current[previousIndex].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 4).split('');
    pasteData.forEach((value, i) => {
      handleChange(i, value);
      if (i < 3) inputRefs.current[i + 1].focus();
    });
  };

  const inputStyle = {
    width: '60px', 
    height: '60px',
    marginRight: '10px',
    fontSize: '25px',
    textAlign: 'center',
    border: '2px solid #ccc',
    borderRadius: '8px'
  };

  /*--------------*/

  function verCodigo (e){
    e.preventDefault()
    //console.log(inputs)
    //console.log("Código ingresado:", inputs.join(""));
    let codeConfirm = false;
    const code = inputs.join("")

    codigos.forEach(element => {
      if(element === code){
        codeConfirm = true;
      }
    });

    if(codeConfirm === true){
      console.log('confirmado')
      localStorage.setItem('code_screen', 3);
      setStep(3)
    }else{
      alert('codigo incorrecto')
    }

  }

  return(
    <>
      <div className='login-form-container'>
        <div className='login-isologo-container'>
          <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
          <h1 className='login-title'>Confirmar código</h1>
        </div>
        <form className='login-form' onSubmit={verCodigo}>
          <div style={{width:"100%",boxSizing:"border-box",textAlign:"center",fontSize:12,padding:"0px 10px"}}>
            Te hemos enviado un código a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y tu carpeta de spam si no lo ves.
          </div>
          <div style={{width:"100%",boxSizing:"border-box",display:"flex", alignItems:"center",justifyContent:"center",gap:10, margin:"30px 0px"}}>
            {/*componente imputs*/}
            <div style={{ maxWidth: '300px', margin: 'auto', display: 'flex', justifyContent: 'center' }} onPaste={handlePaste}>
              {inputs.map((value, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  name={`input-${index}`}
                  type="tel"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={inputStyle}
                />
              ))}
            </div>


          </div>

          <div>
            <button 
            type="submit" 
            className='login-button'>Confirmar código</button>
          </div>

          <div className='login-sign-up' 
          onClick={cancel} 
          >Cancelar</div>
        </form>
      </div>

      
    </>
  )
}

const ThirdStep = ({setStep}) =>{


  const { setUserLoggedData,setLogged,setProyectos,setClientes,setOrdenesDeTrabajo,setSubusuarios,setProducts,setProveedores,setOrdenesDeCompra,setSignUpCode,setVentas } = useContext(AppContext)

  
  const [ loading,setLoading ] = useState(false);
  const dataInitialState = {
      nombre: null,
      apellido: null,
      email: null,
      celular: null,
      fecha_de_nacimiento: "1997/02/20",
      password: null,
      passwordConfirm: null
  }
  const [ data,setData ] = useState(dataInitialState)

  useEffect(() => {
    getEmailData()
  }, [])
  
  function getEmailData () {
    const email = localStorage.getItem('user_email')
    console.log(email)
    console.log({...data,email:email})
    setData({...data,email:email})
  }
  
  
  function registrarUsuario (e) {
    e.preventDefault()
    console.log(data)
    //sendData(data)
  }

  async function sendData (data) {
    setLoading(true)
    try{
      const response = await axios.post('https://appify-black-side.vercel.app/user/register',data)
      console.log('usuario creado')
      console.log(response)

    }catch (err){
      console.log('error')
      console.log(err)
    }finally{
      console.log('peticion finalizada')
    }
  }


  async function getLoginData (userId){
    //Esta funcion es para hacer todas las llamsdas correspondoentes
    //proyectos
    
    getProyectos(userId,setProyectos)
    getClientes(userId,setClientes)
    getOTs(userId,setOrdenesDeTrabajo)
    getAllUsers(userId,setSubusuarios)
    getAllProviders(userId,setProveedores)
    //getAllProductos(userId)
    getAllProducts(userId,setProducts)
    getOCs(userId,setOrdenesDeCompra)
    getVentas(userId,setVentas)
  }

  return(
    <>
    <div className='container-register-form'>
      <div className='login-register-container'>
      <div className='login-isologo-container'>
          <img src={IsologoLogin} alt='isologoAppify' className='login-isologo' />
          <h1 className='login-title'>Registrarse</h1>
        </div>
        <form onSubmit={registrarUsuario} className='login-form-register'>
          <div className='columnRegister'>
              <div className='labelR label-register-name'>
                <label className='nombre'>Nombre</label>
                <input  name='nombre' value={data.nombre} onChange={((e)=>{
                  if( e.target.value.trim().replace(/\s/g, "") === ""){
                    setData({...data,nombre:null})
                  }else{
                    setData({...data,nombre:e.target.value})
                  }
                })} placeholder='ingrese su nombre'/>
              </div>
              <div className='labelR label-register-apellido'>
                <label className='apellido'>Apellido</label>
                <input name='apellido' value={data.apellido}  onChange={((e)=>{
                  if( e.target.value.trim().replace(/\s/g, "") === ""){
                    setData({...data,apellido:null})
                  }else{
                    setData({...data,apellido:e.target.value})
                  }
                })} placeholder='ingrese su apellido'/>
              </div>
          </div>
          <div className='columnRegister'>
            <div className='labelR label-register-numero'>
              <label className='numero'>Numero</label>
              <input name="numero"value={data.celular} onChange={((e)=>{
                if( e.target.value.trim().replace(/\s/g, "") === ""){
                  setData({...data,celular:null})
                }else{
                  setData({...data,celular:e.target.value})
                }
              })}  placeholder='ingrese su numero'/>
            </div>
            
            <div className='labelR label-register-date'>
              <label className='nacimiento'>Fecha de nacimiento</label>
              <DatePicker picker='date' className='picker'/>
            </div>
          </div>
          <div className='columnRegister'>
             <div className='labelR label-register-pass'>
            <label className='passRegister'>Contraseña</label>
            <input name="passRegister"type='password' value={data.password} onChange={((e)=>{
              if( e.target.value.trim().replace(/\s/g, "") === ""){
                setData({...data,password:null})
              }else{
                setData({...data,password:e.target.value})
              }
            })}  placeholder='ingrese su contraseña'/>
          </div>
          <div className='labelR label-register-pass2'>
            <label className='passRegister2'>Confirmar contraseña</label>
            <input name="passRegister2" type='password' value={data.passwordConfirm} onChange={((e)=>{
              if( e.target.value.trim().replace(/\s/g, "") === ""){
                setData({...data,passwordConfirm:null})
              }else{
                setData({...data,passwordConfirm:e.target.value})
              }
            })} placeholder='confirmar contraseña'/>
          </div>
          </div>
         
          <button type='submit' className='btn-register-user login-button'>Registrar usuario</button>
        </form>
      </div>
    </div>
      
      {
        loading === true ?
        <Loader label={'Creando perfil'}/>
        :
        <></>
      }

      
    </>

  )
}

const FourthStep = ({setStep}) =>{
  return(
    <>
      <h1>Daashboard</h1>
    </>

  )
}


const SignUpScreen = () => {

  const [ loading,setLoading ] = useState(true)
  const [ step,setStep ] = useState(1)


  useEffect(() => {
    getStepData()
  }, [])
  

  function getStepData () {
    const codeScreen = localStorage.getItem('code_screen')
    if(codeScreen){
      console.log(typeof codeScreen)
      const nmr = parseInt(codeScreen)
      setStep(nmr)
    }else{
      setStep(1)
    }
    
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    
    
  }

  function renderPrincipalComponent () {
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      case 2:
        return <SecondStep setStep={setStep}/>
      case 3:
        return <ThirdStep setStep={setStep} />
      case 4:
        return <FourthStep setStep={setStep}/>
   
    }
  }

  


  return (
    <>
      {
        loading === true ?
        <div>Loading...</div>
        :
        <div className="login-bg">
          {renderPrincipalComponent()}
        </div>
      }
    </>
  )
}

export default SignUpScreen