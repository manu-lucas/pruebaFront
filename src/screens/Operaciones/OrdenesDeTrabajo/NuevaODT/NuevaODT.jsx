import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { DatePicker, Slider, Switch, Table } from 'antd';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import { FiDownload } from 'react-icons/fi';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import CreateBtn from '../../../../components/Buttons/CreateBtn';


const FirstStep = ({setStep}) =>{
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };
  return (
    <div className='principal-container-column'>
      
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
        <input style={{padding:8}} placeholder='Ingrese nombre para el proyecto'/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comisión <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el valor de la comisión'/>
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Moneda</span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Botón de pago</span>
          <Switch style={{width:"30px"}} size="small" checked={disabled} onChange={onChange} />
        </div>
      </div>

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </div>
  )
}

const SecondStep = ({setStep}) => {
  const [disabled, setDisabled] = useState(false);
  
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
          <span className='form-label'>Descripción</span>
          <input style={{padding:8}} placeholder='Introduce una descripción'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el precio'/>
        </div>
      </div>

      <div className='principal-grid grid-4-columns'>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>%</span>
          <input style={{padding:8}}/>
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>Neto</span>
          <input style={{padding:8}}/>
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>IVA</span>
          <input style={{padding:8}}/>
        </div>
      
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Total</span>
          <input style={{padding:8}}/>
        </div>

      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad</span>
          <input style={{padding:8}}/>
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
          <input style={{padding:8}}/>
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
  return(
    <div className='principal-container-column'>
      <div className='row'>
        <h2>Dirección de despacho</h2>
        <span style={{color:"grey"}}>(Opcional)</span>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Direccion</span>
          <input style={{padding:6}} placeholder='Ingrese la dirección'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna</span>
          <input style={{padding:6}} placeholder='Introduce la comuna'/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad</span>
          <input style={{padding:6}} placeholder='Ingrese la ciudad'/>
        </div>
      </div>
      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn setStep={setStep} value={4}/>        
      </div>
    </div>
  )
}

const FourthStep = ({setStep}) => {

  function createOrder () {
    setStep(5)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }
  return(
    <div className='principal-container-column'>
      <div className='row'>
        <h2>Plazo de entrega</h2>
        <span style={{color:"grey"}}>(Opcional)</span>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dias</span>
          <input style={{padding:8}} placeholder='Ingrese los días hábiles'/>
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
        <CreateBtn label={'Crear orden'} HanldeClick={createOrder}/>
      </div>
    </div>
  )
}



const NuevaODT = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/work_orders')
    setMenuOptions(updateData)
  }, [])

  const navigate = useNavigate()

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
      <div className='row' onClick={()=>{navigate('/work_orders')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  órdenes de trabajo</span>
      </div>
      <h1>Agregar orden de trabajo</h1>
      {
        step === 5 ?
        <Success message={'Orden de trabajo creada con éxito!'}/>
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
          <h3>Proyecto Nº 0000000 04/04/2024</h3>
          <div>Nueva orden de trabajo</div>
          <form>
              <button>CREAR</button>
          </form>
        */
      }
    </>
  )
}

export default NuevaODT