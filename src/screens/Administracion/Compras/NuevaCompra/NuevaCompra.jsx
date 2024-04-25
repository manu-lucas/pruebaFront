import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { DatePicker, Table } from 'antd';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import { FiDownload } from 'react-icons/fi';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';

const FirstStep = ({setStep}) => {
  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Datos principales</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° de documento</span>
          <DatePicker picker="week" />
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='week'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Destinatario <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el nombre del destinatario'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago</span>
          <SelectComponent/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Centro de beneficio</span>
          <SelectComponent/>
        </div>
      </div>


      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </div>
  )
}


const SecondStep = ({setStep}) => {

  const [ pslist,setPslist ] = useState([])


  function addProductoServicio (){
    console.log('agregando')
    setPslist([...pslist,{
      key:1+pslist.length,
      producto: `producto ${1+pslist.length}`,
      cantidad: 1,
      cuenta:'cuenta',
      precio: 2300,
      porcentaje: 0,
      neto: 2450,
      iva: 19,
      total: 2600
    }])
  }



  function createOrder () {
    setStep(3)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  return (
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <div className='row'>
          <h2 style={{fontSize:20}}>Ítems</h2>
          <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
            <FiDownload />
          </div>
        </div>
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
                    title: 'Neto',
                    dataIndex: 'neto',
                    key: 'neto',
                  },
                  {
                    title: 'Cuenta',
                    dataIndex: 'cuenta',
                    key: 'cuenta',
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
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio unitario<span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el precio'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Neto</span>
          <input style={{padding:8}} />
        </div>
      </div>


      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cuenta<span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas</span>
          <textarea style={{height:100}}/>
        </div>
      </div>
      

      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={1}/>
        <CreateBtn label={'Crear orden'} HanldeClick={createOrder}/>
      </div>

    </div>
  )
}



const NuevaCompra = () => {
  const navigate = useNavigate();
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/service_invoices')
    setMenuOptions(updateData)
  }, [])

  const [ step,setStep ] = useState(1);

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      case 2:
        return <SecondStep setStep={setStep}/>
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/service_invoices')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a compras</span>
      </div>
      <h1>Certificado de compra</h1>
      {
        step === 3 ?
        <Success message={'Nuevo documento de compra generado con exito!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-2-steps' >
            <div className='step-container-item'>
              <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
              <div className='step-item-dot-cta' style={{left:-20}}>1</div>
              <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>
            </div>
            
          </div>
          <form className='step-form'>
            {
            formSetupSteps()
            }
          </form>
        </PrincipalCard>
      }
    </>
  )
}

export default NuevaCompra