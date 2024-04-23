import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong } from "react-icons/fa6";
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { Radio } from 'antd';
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { useNavigate } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import SelectComponent from '../../../../components/Select/SelectComponent';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import FormerBtn from '../../../../components/Form/FormPrivateButtons/FormerBtn';
import FollowingBtn from '../../../../components/Form/FormPrivateButtons/FollowingBtn';
import AddMoreBtn from '../../../../components/Form/FormPrivateButtons/AddMoreBtn';
import CreateBtn from '../../../../components/Form/FormPrivateButtons/CreateBtn';
import Success from '../../../../components/Modals/Success';



const FirstStep = ({setStep}) =>{
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return(
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Datos principales</h2>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Razón Social / Nombre <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la razón social o nombre'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Rut</span>
          <input style={{padding:8}}/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Giro <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}}/>
        </div>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Estado del cliente</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Cliente activo</Radio>
            <Radio value={2}>Cliente no activo</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dirección</span>
          <input style={{padding:8}} placeholder='Ingrese la dirección'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna</span>
          <input style={{padding:8}} placeholder='Ingrese la comuna'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad</span>
          <input style={{padding:8}} placeholder='Ingrese la ciudad'/>
        </div>
      </div>
      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>
    </div>
  )
}


const SecondStep = ({setStep}) => {
  function AddData () {
    console.log('agregar mas datos')
  }
  return (
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h2 style={{fontSize:20}}>Datos de contacto</h2>
        <AddMoreBtn label={'Agregar más datos'} HanldeClick={AddData}/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese nombre del contacto'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° de celular </span>
          <input style={{padding:8}} placeholder='Ingrese número de celular del contacto'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Email <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el email del contacto'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° de teléfono </span>
          <input style={{padding:8}} placeholder='Ingrese número de teléfono del contacto'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor 1</span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor 2</span>
          <SelectComponent/>
        </div>
      </div>

      
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn setStep={setStep} value={3}/>
      </div>
    </div>
  )
}

const ThirdStep = ({setStep}) => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const [value, setValue] = useState(1);

  const onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return(
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <div className='column'>
          <h2 style={{fontSize:20}}>Datos de pago</h2>
          <span>(Opcional)</span>
        </div>
        <div className='row'>
          <span>Agregar datos de pago</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago</span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Línea de crédito </span>
          <input style={{padding:8}}/>
        </div>
      </div>
      

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Lista de precio</span>
          <input style={{padding:8}}/>
        </div>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Exención de impuesto</span>
          <Radio.Group onChange={onChange2} value={value}>
            <Radio value={1}>Si</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas</span>
          <input style={{padding:8}} placeholder='Ingrese las notas que considere necesarias'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Pie de pagina</span>
          <input style={{padding:8}} placeholder='Ingrese el  pie de pagina de proyecto'/>
        </div>
      </div>

      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn setStep={setStep} value={4}/>
      </div>      

    </div>
  )
}

const FourthStep = ({setStep}) => {


  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  function createClient () {
    //console.log('crear cliente')
    
    setStep(5)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
    
  }

  return(
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <div className='column'>
          <h2 style={{fontSize:20}}>Dirección de despacho</h2>
          <span>(Opcional)</span>
        </div>
        <div className='row'>
          <span>Agregar datos de pago</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Punto <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Atención a <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Introduce el nombre'/>
        </div>
      </div>


      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Lugar <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la dirección'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la comuna'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la ciudad'/>
        </div>
      </div>

      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <CreateBtn label={'Crear cliente'} HanldeClick={createClient}/>
      </div>      


    </div>
  )
}

const NuevoCliente = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate()
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Comercial','/clients/dashboard')
    setMenuOptions(updateData)
  }, [])

  const [step,setStep] = useState(1)


  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      
      case 2:
        return <SecondStep setStep={setStep}/>
      
      case 3:
        return <ThirdStep setStep={setStep}/>
        
      case 4:
        return <FourthStep setStep={setStep}/>
     
    }
  }
  
  return (
    <>  
      <div className='row' onClick={()=>{navigate('/clients/dashboard')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a clientes</span>
      </div>
      <h1>Agregar cliente</h1>
      {
        step === 5 ?
        <Success message={'Cliente creado con éxito!'}
        />
        :
        <PrincipalCard>
          <div className='step-container'>
            <div className='step-container-item'>
              <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
              <div className='step-item-dot-cta' style={{left:-20}}>1</div>
              <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>

            </div>
            <div className='step-container-item'>
              <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
              <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
            </div>
            <div className='step-container-item'>
              <div className={step >= 4 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
              <div className={step >= 4 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>4</div>
            </div>
          </div>
          <form className='step-form'>
            {formSetupSteps()}
          </form>
        </PrincipalCard>
        
      }
    {
      /*
      <div className='row-test'>
        <h3 onClick={()=>{navigate('/clients/dashboard')}} style={{color:"red"}}>Clientes</h3>
        <h3>Nuevo cliente</h3>
      </div>
      <form style={{display:"flex",flexDirection:"column"}}>
          <h3>Datos Generales</h3>

          <label>Razon social o nombre</label>
          <input style={{width:"300px"}}/>

          <label>RUT</label>
          <input style={{width:"300px"}}/>

          <label>Giro</label>
          <input style={{width:"300px"}}/>

          <label>Direccion</label>
          <input style={{width:"300px"}}/>

          <label>Comuna</label>
          <input style={{width:"300px"}}/>

          <label>Ciudad</label>
          <input style={{width:"300px"}}/>

          <h3>Contacto</h3>

          <label>Nombre</label>
          <input style={{width:"300px"}}/>

          <label>Email</label>
          <input style={{width:"300px"}}/>

          <label>Celular</label>
          <input style={{width:"300px"}}/>

          <label>Teléfono</label>
          <input style={{width:"300px"}}/>

          <label>Vendedor</label>
          <input style={{width:"300px"}}/>


          <button>EVIAR</button>    
      </form>
      */
    }

    </>
  )
}

export default NuevoCliente