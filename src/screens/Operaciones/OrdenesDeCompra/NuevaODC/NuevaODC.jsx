import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong, FaUserPlus } from 'react-icons/fa6';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { DatePicker, Table } from 'antd';
import SelectComponent from '../../../../components/Select/SelectComponent';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import { FiDownload } from 'react-icons/fi';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { Radio } from 'antd';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import SelectComp from '../../../../components/Select/SelectComp';
import NuevoProveedor from '../../../Empresa/Proveedores/NuevoProveedor/NuevoProveedor';
import { BsBoxSeam } from 'react-icons/bs';
import NuevoPS from '../../../Empresa/ProductosServicios/NuevoPS/NuevoPS';



const FirstStep = ({setStep}) =>{
  const { proveedores } = useContext(AppContext);

  const [ proveedorModal,setProveedorModal ] = useState(false)

  function proveedoresRestructured (proveedoresArray) {
    const updateData = proveedoresArray.map((item)=>{
      return {
        ...item, label: item.razon_social, value: item.id
      }
    })
    return updateData
  }

  return(
    <>
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Datos principales</h2>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° documento</span>
          <input style={{padding:8}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
          <DatePicker picker="date" />
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <div className='row-space-btw'>
            <span className='form-label' style={proveedores.length === 0 ? {color:"#b9b9b9c4"} : {}}>Proveedor </span>
            <div style={proveedores.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{
                setProveedorModal(true)
              }} >
              <FaUserPlus/>
              <span>Agregar nuevo proveedor</span>
            </div>
          </div>
          {
            proveedores.length === 0 ?
            <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
              <span>No hay proveedores registrados</span>
            </div>
            :
            <SelectComp 
              placeholder={'seleccionar proveedor'}
              options={proveedoresRestructured(proveedores)}
            />
          }
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago </span>
          <SelectComp
                placeholder={'Seleccionar condición de pago'}
                //value={proyecto.condicion_de_pago}

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
                HandleChange={(value,record)=>{
                  setProyecto({...proyecto,condicion_de_pago:value})
                }}
            />
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas </span>
          <textarea style={{height:150}}/>
        </div>
      </div>
      

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>


    </div>
    {
      proveedorModal === true ?
      <div className='modal-overlay'>
        <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"0px 20px"}}>
          <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setProveedorModal(false)}}>x</div>
          <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
            <NuevoProveedor
              reference={true}
              setClose={setProveedorModal}
            />
          </div>
        </div>
      </div>
      :
      <></>
    }
    </>
  )

}


const SecondStep = ({setStep}) => {

  const { products,setProducts } = useContext(AppContext);

  const [ pslist,setPslist ] = useState([])


  function productsRestructured (productsArray) {
    const updateData = productsArray.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })

    return updateData
  }


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
  
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


  function createOrder () {
    setStep(3)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  const [ productModal,setProductModal ] = useState(false);


  return(
    <>
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

            
            <div className='row-space-btw'>
              <span className='form-label' style={products.length === 0 ? {color:"#b9b9b9c4"}:{}}>Producto/Servicio <span style={products.length === 0 ? {color:"#b9b9b9c4"} :{color:"red"}}>*</span></span>
              <div className='row' style={products.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} onClick={()=>{
                setProductModal(true)
              }}>
                <BsBoxSeam/>
                <span>Agregar nuevo producto/servicio</span>
              </div>
            </div>


            {
              products.length === 0 ?
              <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
                <span>No hay productos registrados</span>
              </div>
              :
              <SelectComp
                options={productsRestructured(products)}
              />
            }
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
            <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
          </div>
        </div>

        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Precio unitario <span style={{color:"red"}}>*</span></span>
            <input style={{padding:8}} placeholder='Introduce el valor del precio unitario'/>
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Neto </span>
            <input style={{padding:8}} />
          </div>
        </div>

        <div className='form-grid'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Cuenta <span style={{color:"red"}}>*</span></span>
            <SelectComponent/>
          </div>
          <div className='column' style={{gap:15, justifyContent:"center"}}>
            <span className='form-label'>Agregar exención </span>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Si</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </div>
        </div>
        {
          value === 1 ?
          <div className='form-grid' style={{marginTop:"20px"}}>
            <div></div>
            <div>
                  <div className='form-grid'>
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Monto exento</span>
                      <input style={{padding:8}} placeholder='Agregue el monto'/>
                    </div>
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Retención</span>
                      <input style={{padding:8}} placeholder='Agregue la retención'/>
                    </div>
                  </div>
            </div>
          
          </div>
          :
          <></>
        }

        <div className='row-space-btw' style={{marginTop:30}}>
          <FormerBtn setStep={setStep} value={1}/>
          <CreateBtn label={'Crear orden'} HanldeClick={createOrder}/>
        </div>

      </div>

      {
        productModal === true ?
        <div className='modal-overlay'>
          <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"10px 40px"}}>
            <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setProductModal(false)}}>x</div>
            <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
              <NuevoPS
                reference={true}
                setClose={setProductModal}
              />
            </div>
          </div>
        </div>
        :
        <></>
      }
    </>
  )
}

const NuevaODC = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate();
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/purchases')
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
      <div className='row' onClick={()=>{navigate('/purchases')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  órdenes de compra</span>
      </div>
      <h1>Agregar orden de compra</h1>
      {
        step === 3 ?
        <Success message={'Orden de compra creada con éxito!'}/>
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
            {formSetupSteps()}
          </form>

        </PrincipalCard>
      }
    {
      /*
      <div className='row-test'>
        <h3 onClick={()=>{navigate('/purchases')}} style={{color:"red"}}>Ordenes de compra</h3>
        <h3>Nueva Orden de compra</h3>
      </div>
      <h3>Orden de compra Nº 2 04/04/2024</h3>
      <div>Nueva orden de compra</div>
      <form>
        <button>CREAR</button>
      </form>
      */
    }
    </>
  )
}

export default NuevaODC