import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NuevoProveedor = () => {

  const { userLoggedData } = useContext(AppContext);

  const navigate = useNavigate();

  const [ loading,setLoading ] = useState(false);
  const [ error,setError ] = useState(false);

  const dataInitialState = {
    user: userLoggedData.id,
    rut: "",
    razon_social: "",
    activo: true,
    giro: "",
    condicion_de_pago: "",
    nombre_fantasia: "" ,
    cuenta_contable: "",
    persona: "",
    direccion : "",
    email : "",
    comuna: "",
    telefono: "",
    ciudad: "",
    banco: "",
    nombre_beneficiario: "",
    nombre_cuenta:"",
    rut_beneficiario: "",
    nro_cta_corriente: "",
    correo_cobranzas: ""
  }
  /*
  Data : 

    {
      "user": "sub-user-60ee9e82-04fe-4fb2-9aec-8fe08a3d974c",
      "rut": "1234568-9",
      "razon_social": "hermanosSA",
      "activo": true,
      "giro": "string",
      "condicion_de_pago": "1",
      "nombre_fantasia": "string",
      "cuenta_contable": "string",
      "persona": "string",
      "direccion": "string",
      "email": "user@example.com",
      "comuna": "string",
      "telefono": "string",
      "ciudad": "string",
      "banco": "string",
      "nombre_beneficiario": "string",
      "nombre_cuenta": "string",
      "rut_beneficiario": "string",
      "nro_cta_corriente": "string",
      "correo_cobranzas": "user@example.com"
    }

    CREATE TABLE proveedores (--
    id VARCHAR(100) NOT NULL,
    user VARCHAR(100) NOT NULL,
    rut VARCHAR(20) NOT NULL,
    razon_social VARCHAR(200) NOT NULL,
    activo BOOLEAN,
    giro VARCHAR(200),
    condicion_de_pago VARCHAR(100) NOT NULL,
    nombre_fantasia VARCHAR(200),
    cuenta_contable VARCHAR(100),
    persona VARCHAR(150),
    direccion VARCHAR(200),
    email VARCHAR(200),
    comuna VARCHAR(100),
    telefono VARCHAR(30),
    ciudad VARCHAR(100),
    banco VARCHAR(100),
    nombre_beneficiario VARCHAR(200),
    nombre_cuenta VARCHAR(200),
    rut_beneficiario VARCHAR(20),
    nro_cta_corriente VARCHAR(50),
    correo_cobranzas VARCHAR(200),
    PRIMARY KEY (id),
    KEY condicion_pago(condicion_de_pago),
    KEY usuarios(user)
);

  */


  const [ data,setData ] = useState(dataInitialState)
  
  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    sendData(data)
  }

  async function sendData (data){
    setLoading(true);
    try{
      const response = await axios.post(`https://appify-black-side.vercel.app/proveedor/createProv`,data)
      console.log(response)
      setError(false);
    }catch(err){
      console.log(err)
      setError(true);
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
    {
      
      loading === true ?
      <div>Loading Screen</div>
      :
      <>
        {
          error === true ?
          <>
            <div>Error! </div>
            <button onClick={()=>{navigate('/providers')}}>Volver atras</button>
          </>
          :
          <>
            <div>Nuevo Proveedor</div>
            <form onSubmit={HandleSubmit}>
              <h2>Datos generales</h2>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Rut</label>
                <input value={data.rut} onChange={(e)=>{setData({...data,rut:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Razon social</label>
                <input value={data.razon_social} onChange={(e)=>{setData({...data,razon_social:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Giro</label>
                <input value={data.giro} onChange={(e)=>{setData({...data,giro:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Condicion de pago</label>
                <input value={data.condicion_de_pago} onChange={(e)=>{setData({...data, condicion_de_pago:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Nombre fantasia</label>
                <input value={data.nombre_fantasia} onChange={(e)=>{setData({...data,nombre_fantasia:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Cuenta contable</label>
                <input value={data.cuenta_contable} onChange={(e)=>{setData({...data,cuenta_contable:e.target.value})}}/>
              </div>
              <h2>Informacion de contacto</h2>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Persona</label>
                <input value={data.persona} onChange={(e)=>{setData({...data,persona:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Direccion</label>
                <input value={data.direccion} onChange={(e)=>{setData({...data,direccion:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Email</label>
                <input value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Comuna</label>
                <input value={data.comuna} onChange={(e)=>{setData({...data,comuna:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Telefono</label>
                <input value={data.telefono} onChange={(e)=>{setData({...data,telefono:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Ciudad</label>
                <input value={data.ciudad} onChange={(e)=>{setData({...data,ciudad:e.target.value})}}/>
              </div>
              <h2>Informacion bancaria</h2>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Banco</label>
                <input value={data.banco} onChange={(e)=>{setData({...data,banco:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Nombre beneficiario</label>
                <input value={data.nombre_beneficiario} onChange={(e)=>{setData({...data,nombre_beneficiario:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Nombre cuenta</label>
                <input value={data.nombre_cuenta} onChange={(e)=>{setData({...data,nombre_cuenta:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Rut beneficiario</label>
                <input value={data.rut_beneficiario} onChange={(e)=>{setData({...data,rut_beneficiario:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Nro cuenta corriente</label>
                <input value={data.nro_cta_corriente} onChange={(e)=>{setData({...data,nro_cta_corriente:e.target.value})}}/>
              </div>
              <div style={{display:"flex",width:"300px",flexDirection:"column"}}>
                <label>Correo para cobranzas</label>
                <input value={data.correo_cobranzas} onChange={(e)=>{setData({...data,correo_cobranzas:e.target.value})}}/>
              </div>
              <button type='submit'>Crear</button>
            </form>
          </>
        }
      </>
      
    }
    </>
  )
}

export default NuevoProveedor