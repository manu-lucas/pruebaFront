import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong } from "react-icons/fa6";
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { FaPlus } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";

import { FaCheck, FaTrashAlt } from "react-icons/fa";



import Success from '../../../../components/Modals/Success';
import { BsArrowRight } from 'react-icons/bs';


import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];


const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());


const FirstStep = ({setStep}) => {
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };
  return(
    <>
      <h2 style={{fontSize:20}}>Datos principales</h2>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cliente <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Contacto <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
      </div>

      <div className='column' style={{gap:5}}>
        <span className='form-label'>Nombre de proyecto</span>
        <input style={{padding:8}}/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>

          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comision</span>
          <input style={{padding:6}}/>
        </div>
      </div>

      <div className='row-space-btw' style={{gap:40}}>
        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Condicion de pago <span style={{color:"red"}}>*</span></span>

            <SelectComponent/>
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Moneda</span>
            <SelectComponent/>
          </div>
        </div>
        <div style={{width:"200px"}} className='column'>
          <span className='form-label'>Boton de pago</span>
          <Switch style={{width:"30px"}} size="small" checked={disabled} onChange={onChange} />

        </div>
      </div>

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </>
  )
}

const SecondStep = ({setStep}) => {
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };

  const [ pslist,setPslist ] = useState([])


  function addProductoServicio (){
    setPslist([...pslist,{
      key:1+pslist.length,
      producto: `producto ${1+pslist.length}`,
      cantidad: 1,
      precio: 2300,
      porcentaje: 0,
      neto: 2450,
      iva: 19,
      total: 2600
    }])
  }

  return(
    <>
      
      <div className='row-space-btw'>
        <>
        </>
        <h2>Items</h2>
        <AddMoreBtn label={'Agregar otro producto/servicio'} HanldeClick={addProductoServicio}/>
      </div>

      {
          pslist.length === 0 ?
          <></>
          :
          <div style={{width:"100%",alignItems:"center"}}>
            <Table
              dataSource={pslist}
              columns={
                [
                  {
                    title: 'Producto/Servicio',
                    dataIndex: 'producto',
                    key: 'producto',
                  },
                  {
                    title: 'Cantidad',
                    dataIndex: 'cantidad',
                    key: 'cantidad',
                  },
                  {
                    title: 'Precio',
                    dataIndex: 'precio',
                    key: 'precio',
                  },
                  {
                    title: '%',
                    dataIndex: 'porcentaje',
                    key: 'porcentaje',
                  },
                  {
                    title: 'Neto',
                    dataIndex: 'neto',
                    key: 'neto',
                  },
                  {
                    title: 'IVA',
                    dataIndex: 'iva',
                    key: 'iva',
                  },
                  {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                  },
                  {
                    title: 'Acciones',
                    key: 'actions',
                    render: (text, record) => (
                      <div style={{display:"flex",alignItems:"center",gap:15}}>
                        <AiFillEdit style={{cursor:"pointer"}}/>
                        <FaTrashAlt style={{cursor:"pointer"}}/>
                      </div>
                    ),
                },
                ]
              }
            />
            
          </div>
      }

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Producto/Servicio <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Descripcion</span>
          <input style={{padding:8}}/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}}/>
        </div>
      </div>
      <div className='form-grid-price'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>%</span>
          <input style={{padding:9}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Neto</span>
          <input style={{padding:9}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>IVA</span>
          <input style={{padding:9}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Total</span>
          <input style={{padding:9}}/>
        </div>
      </div>
      <div className='form-grid-price-footer'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad</span>
          <input style={{padding:9}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ajuste de precio</span>
          <Slider range defaultValue={[0, 50]} disabled={disabled} />
          <span>Subtotal: $</span>
          <span>IVA(19%): $</span>
          <span>Precio: $</span>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>%</span>
          <input style={{padding:9}}/>
        </div>
      </div>
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn setStep={setStep} value={3}/>
      </div>
    </>
  )
}


const ThirdStep = ({setStep}) => {
  return(
    <>
      <h2>Direccion de despacho</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Direccion</span>
          <input style={{padding:6}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna</span>
          <input style={{padding:6}}/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad</span>
          <input style={{padding:6}}/>
        </div>
      </div>
      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn setStep={setStep} value={4}/>        
      </div>
    </>
  )
}

const FourthStep = ({setStep}) => {

  function createProject () {
    setStep(5)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }
  
  return(
    <>
      <h2>Plazo de entrega <span>(Opcional)</span></h2>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dias</span>
          <input style={{padding:8}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha</span>
          <DatePicker/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas </span>
          <textarea style={{height:60}}/>
        </div>
      </div>
      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={3}/>
        <CreateBtn label={'Crear proyecto'} HanldeClick={createProject}/>
      </div>
    </>
  )
}


const NuevoProyecto = () => {
  const navigate = useNavigate();
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Comercial','/quotes')
    setMenuOptions(updateData)
  }, [])

  const [ step,setStep ] = useState(1);

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
    <div className='row' onClick={()=>{navigate('/quotes')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
      <FaArrowLeftLong/>
      <span>Volver a proyectos</span>
    </div>
    <h1>Agregar proyecto</h1>
    <>
      {
        step === 5 ?
        <Success message={'Proyecto creado con éxito!'}
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
    </>
    </>
  )
}

export default NuevoProyecto