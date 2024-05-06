import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import { Button, Radio, Spin, Switch, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { MdErrorOutline } from 'react-icons/md';
import SelectComp from '../../../../components/Select/SelectComp';

const FirstStep = ({setStep,data,setData}) =>{
  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Datos principales</h2>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Rut <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='text' value={data.rut} onChange={(e)=>{setData({...data,rut: e.target.value})}} placeholder='Ingrese el numero de Rut'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Razón social / Nombre <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='text' value={data.razon_social} onChange={(e)=>{setData({...data,razon_social:e.target.value})}} placeholder='Ingrese la razón social/nombre '/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Giro </span>
          <input style={{padding:8}} value={data.giro} onChange={(e)=>{setData({...data,giro: e.target.value})}} placeholder='Ingrese el giro'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago  </span>
          <SelectComp
            placeholder={'seleccionar condición de pago'}
            HandleChange={(value,record)=>{
              console.log(value)
              setData({...data,condicion_de_pago:value})
            }}
            options={[
              {
                value: '1',
                label: '10 días'
              },
              {
                value: '2',
                label: '15 días'
              },
              {
                value: '3',
                label: '30 días'
              },
              {
                value: '4',
                label: '45 días'
              },
              {
                value: '5',
                label: 'condición creada por el cliente'
              },
            ]}

          />
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Nombre </span>
          <input style={{padding:8}} placeholder='Ingrese el nombre del proveedor'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cuenta contable </span>
          <SelectComp 
            placeholder={'seleccionar cuenta contable'}
            HandleChange={(value,record)=>{
              console.log(value)
              setData({...data, cuenta_contable:value})
            }}
            options={[
              { label: "Activos fijos", value: "Activos fijos" },
              { label: "Ajustes de centralización", value: "Ajustes de centralización" },
              { label: "Anticipo clientes", value: "Anticipo clientes" },
              { label: "Anticipo proveedores", value: "Anticipo proveedores" },
              { label: "Arriendos y leasing", value: "Arriendos y leasing" },
              { label: "Cargos e intereses bancarios", value: "Cargos e intereses bancarios" },
              { label: "Comidas y entretenimiento", value: "Comidas y entretenimiento" },
              { label: "Contratistas", value: "Contratistas" },
              { label: "Costo insumos, materiales y productos", value: "Costo insumos, materiales y productos" },
              { label: "Créditos bancarios", value: "Créditos bancarios" },
              { label: "Cuentas por cobrar", value: "Cuentas por cobrar" },
              { label: "Cuentas por pagar", value: "Cuentas por pagar" },
              { label: "Cuentas servicios básicos", value: "Cuentas servicios básicos" },
              { label: "Dcto fecha cartera", value: "Dcto fecha cartera" },
              { label: "Dctos girados y no cobrados", value: "Dctos girados y no cobrados" },
              { label: "Diferencias tipo cambio", value: "Diferencias tipo cambio" },
              { label: "Gastos sin documento tributario", value: "Gastos sin documento tributario" },
              { label: "Gasros reembolsables", value: "Gasros reembolsables" },
              { label: "Gastos sin clasificar", value: "Gastos sin clasificar" },
              { label: "Honorarios por pagar", value: "Honorarios por pagar" },
              { label: "Impuestos pagados retenidos", value: "Impuestos pagados retenidos" },
              { label: "Impuestos y patentes", value: "Impuestos y patentes" },
              { label: "Intereses y gastos financieros", value: "Intereses y gastos financieros" },
              { label: "Inventarios productos y materias primas", value: "Inventarios productos y materias primas" },
              { label: "Inversión socios", value: "Inversión socios" },
              { label: "Iva no recuperable", value: "Iva no recuperable" },
              { label: "IVA por pagar", value: "IVA por pagar" },
              { label: "Otros activos circulante", value: "Otros activos circulante" },
              { label: "Otros gastos del negocio", value: "Otros gastos del negocio" },
              { label: "Otros gastos misceláneos", value: "Otros gastos misceláneos" },
              { label: "Otros ingresos no operacionales", value: "Otros ingresos no operacionales" },
              { label: "Pagos socios y gastos personales", value: "Pagos socios y gastos personales" },
              { label: "Patrimonio de balance de apertura", value: "Patrimonio de balance de apertura" },
              { label: "Pendiente por revisar", value: "Pendiente por revisar" },
              { label: "Preguntar a mi contador", value: "Preguntar a mi contador" },
              { label: "Prestamos empleados", value: "Prestamos empleados" },
              { label: "Publicidad y marketing", value: "Publicidad y marketing" },
              { label: "Remuneraciones socios", value: "Remuneraciones socios" },
              { label: "Reparaciones y mantenimiento", value: "Reparaciones y mantenimiento" },
              { label: "Retención honorarios", value: "Retención honorarios" },
              { label: "Retiro de socios", value: "Retiro de socios" },
              { label: "Seguros", value: "Seguros" },
              { label: "Servicios Legales y profesionales", value: "Servicios Legales y profesionales" },
              { label: "Sueldos y remuneraciones personales", value: "Sueldos y remuneraciones personales" },
              { label: "Suministros de oficina y software", value: "Suministros de oficina y software" },
              { label: "Varios acreedores", value: "Varios acreedores" },
              { label: "Vehículos y gastos asociados", value: "Vehículos y gastos asociados" },
              { label: "Ventas", value: "Ventas" },
              { label: "Ventas sin documentos tributarios", value: "Ventas sin documentos tributarios" },
              { label: "Viajes", value: "Viajes" }
          ]
          }
          />
        </div>
      </div>

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>


    </div>
  )
}

const SecondStep = ({setStep,data,setData}) => {
  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Información de contacto</h2>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Persona <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} value={data.persona} onChange={(e)=>{setData({...data, persona: e.target.value})}} placeholder='Ingrese el nombre de la persona'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dirección</span>
          <input style={{padding:8}} value={data.direccion} onChange={(e)=>{setData({...data, direccion :e.target.value})}} placeholder='Ingrese la dirección'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Email</span>
          <input style={{padding:8}} value={data.email} onChange={(e)=>{setData({...data, email: e.target.value})}}  placeholder='Ingrese el email'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna</span>
          <input style={{padding:8}} value={data.comuna} onChange={(e)=>{setData({...data, comuna: e.target.value})}} placeholder='Ingrese la comuna'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Teléfono </span>
          <input style={{padding:8}} value={data.telefono} onChange={(e)=>{setData({...data, telefono: e.target.value})}} placeholder='Ingrese el teléfono '/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad</span>
          <input style={{padding:8}} value={data.ciudad} onChange={(e)=>{setData({...data, ciudad: e.target.value})}} placeholder='Ingrese la ciudad'/>
        </div>
      </div>


      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn setStep={setStep} value={3}/>
      </div>

    </div>
  )
}


const ThirdStep = ({setStep,data,setData,setLoadingScreen,setErrorScreen,dataInitialState}) =>{


  function createProvider  () {
    console.log(data)
    sendData(data)
  }

  async function sendData (data) {
    setLoadingScreen(true)
    try {

      const response = await axios.post(`https://appify-black-side.vercel.app/proveedor/createProv`,data)
      console.log(response)
      //sin error
      setErrorScreen(false)
      ///data inicial
      setData(dataInitialState)
      //modal de producto creado
      setLoadingScreen(false)
      setStep(4)
      setTimeout(() => {
        setStep(1)
      }, 3000);

    } catch ( err ) {
      console.log(err)
      setLoadingScreen(false)
      setErrorScreen(true)
    }
  }


  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Información de contacto</h2>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Banco</span>
          <SelectComp
            placeholder={'Seleccion el banco'}
            HandleChange={(value,record)=>{
              console.log(value)
              setData({...data, banco: value})
            }}
            options={[
              { label: "Abn Amro Bank (Chile)", value: "Abn Amro Bank (Chile)" },
              { label: "Banco Bice", value: "Banco Bice" },
              { label: "Banco Conosur", value: "Banco Conosur" },
              { label: "Banco Crédito e Inversiones", value: "Banco Crédito e Inversiones" },
              { label: "Banco de Chile / A. Edwards / Citibank N.A", value: "Banco de Chile / A. Edwards / Citibank N.A" },
              { label: "Banco de la Nación Argentina", value: "Banco de la Nación Argentina" },
              { label: "Banco del Desarrollo", value: "Banco del Desarrollo" },
              { label: "Banco del Estado de Chile", value: "Banco del Estado de Chile" },
              { label: "Banco Do Brasil S.A.", value: "Banco Do Brasil S.A." },
              { label: "Banco Falabella", value: "Banco Falabella" },
              { label: "Banco Internacional", value: "Banco Internacional" },
              { label: "Banco Itaú", value: "Banco Itaú" },
              { label: "Banco Monex", value: "Banco Monex" },
              { label: "Banco Ripley", value: "Banco Ripley" },
              { label: "Banco Santander - Santiago", value: "Banco Santander - Santiago" },
              { label: "Banco Security", value: "Banco Security" },
              { label: "BBVA Banco Bhif", value: "BBVA Banco Bhif" },
              { label: "Corpbanca", value: "Corpbanca" },
              { label: "Deutsche Bank (Chile)", value: "Deutsche Bank (Chile)" },
              { label: "Dresdener Bank Lateinamerika", value: "Dresdener Bank Lateinamerika" },
              { label: "HSN Banco", value: "HSN Banco" },
              { label: "HSBC Bank Chile", value: "HSBC Bank Chile" },
              { label: "JP Morgan Chase Bank", value: "JP Morgan Chase Bank" },
              { label: "Scotiabank", value: "Scotiabank" },
              { label: "The Bank od Tokio - Mitsubishi", value: "The Bank od Tokio - Mitsubishi" }
          ]
          }
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Beneficiario</span>
          <input style={{padding:8}} value={data.nombre_beneficiario} onChange={(e)=>[setData({...data, nombre_beneficiario: e.target.value})]} placeholder='Ingrese el nombre del beneficiario'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Nombre </span>
          <input style={{padding:8}} value={data.nombre_cuenta} onChange={(e)=>[setData({...data,nombre_cuenta: e.target.value})]} placeholder='Ingrese el nombre de la cuenta'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Rut </span>
          <input style={{padding:8}} value={data.rut_beneficiario} onChange={(e)=>[setData({...data, rut_beneficiario: e.target.value})]} placeholder='Ingrese el rut del beneficiario'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cuenta corriente</span>
          <input style={{padding:8}} value={data.nro_cta_corriente} onChange={(e)=>{setData({...data,nro_cta_corriente: e.target.value})}} placeholder='Ingrese el numero de la cuenta corriente'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Email</span>
          <input style={{padding:8}} value={data.correo_cobranzas} onChange={(e)=>{setData({...data, correo_cobranzas: e.target.value})}} placeholder='Ingrese el email'/>
        </div>
      </div>

      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <CreateBtn label={'Crear guía'} HanldeClick={createProvider}/>
      </div>
    
    </div>
  )
}


const NuevoProveedor = () => {

  const { userLoggedData } = useContext(AppContext);

  const navigate = useNavigate();


  /*
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
  */
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

  /*
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
  */


  const dataProveedorInitialState = {
    user: userLoggedData.id,
    rut: null,
    razon_social: "",
    activo: true,
    giro: null,
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

  const [ data,setData ] = useState(dataProveedorInitialState)

  const [ loadingScreen,setLoadingScreen ] = useState(false);

  const [ errorScreen,setErrorScreen ] = useState(false);
  
  const [ step,setStep ] = useState(1)



  function goBack () {
    navigate('/providers')
  }



  function tryAgain () {
    setData(dataProveedorInitialState)
    setStep(1)
    setLoadingScreen(false)
    setErrorScreen(false)
  }


  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep} data={data} setData={setData}/>
      case 2:
        return <SecondStep setStep={setStep} data={data} setData={setData}/>
      case 3:
        return <ThirdStep setStep={setStep} data={data} setData={setData} setLoadingScreen={setLoadingScreen} setErrorScreen={setErrorScreen} dataInitialState={dataProveedorInitialState}/>
    }
  }


  
  return (
    <>
      <div className='row' onClick={()=>{goBack()}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a proveedores</span>
      </div>
      <h1>Crear proveedor</h1>
      {
        loadingScreen === true ?
        <>
          <div style={{height:"80%",width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:85}}>
            <h2>Registrando proveedor...</h2>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 90,
                  }}
                  spin
                />
              }
            />
          </div>
        </>
        :
        <>
          {
            errorScreen === true ?
            <>
              <div style={{height:"80%",width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:30}}>
                <MdErrorOutline style={{fontSize:100, color:"#EA0234"}}/>
                <h2>¡Error al registrar el proveedor!</h2>
                <span>Vuelve a intentarlo más tarde</span>
                <div className='row'>
                  <Button onClick={()=>{goBack()}} type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
                    <span>Aceptar</span>
                  </Button>
                  <Button onClick={()=>{tryAgain()}} type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
                    <span>Volver a intentar</span>
                  </Button>
                </div>
              </div>
            </>
            :
            <>
              {
                step === 4 ?
                <Success message={'Proveedor creado con exito!'}/>
                :
                <PrincipalCard>
                  <div className='step-container step-container-3-steps'>
                    <div className='step-container-item'>
                      <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
                      <div className='step-item-dot-cta' style={{left:-20}}>1</div>
                      <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>

                    </div>
                    <div className='step-container-item'>
                      <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
                      <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
                    </div>
                  </div>
                  <form className='step-form'>
                    {formSetupSteps()}
                  </form>

                </PrincipalCard>
              }
            </>
          }
        </>
      }
    {
      /*
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
      */
    }
    </>
  )
}

export default NuevoProveedor