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
import SelectComp from '../../../../components/Select/SelectComp';
import { padding } from '@mui/system';


const FirstStep = ({setStep,clienteValue,setClientevalue,contactValue,setContactvalue,proyecto,setProyecto,vendedorValue,setVendedorvalue}) =>{

  const [ error,setError ] = useState(false)

  //Cliente
  const { clientes,subusuarios } = useContext(AppContext);

  function clientesRestructured (arrayClientes) {
    const updateData = arrayClientes.map((item)=>{
      return {
        ...item, value: item.cliente.id, label: item.cliente.razon_social
      }
    })
    return updateData
  }

  //Contacto
  const [ contactos,setContactos ] = useState([]);

  function contactosRestructured (arrayContactos) {
    const updateData = arrayContactos.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })
    return updateData
  } 
  
  //Vendedor
  function vendedoresRestructured (arrayVendedores) {
    const filterData = arrayVendedores.filter((item)=>item.estado === "Activo")
    const updateData = filterData.map((item)=>{ 
      return {
        ...item, value: item.id, label: item.nombre
      }
    })
    return updateData
  } 

  const [disabled, setDisabled] = useState(false);

  const onChange = (checked) => {
    setDisabled(checked);
  };

  
  function nextStep () {

    if( proyecto.nombre_etiqueta !== null && contactValue !== null && clienteValue !== null && vendedorValue !== null && proyecto.comision !== null && proyecto.condicion_de_pago !== null ){
      console.log('no hay error')
      setError(false)
      setStep(2)
    }else{
      console.log('error')
      setError(true)
    }
  }
  

  return (
    <div className='principal-container-column'>
      
      <h2 style={{fontSize:20}}>Datos principales</h2>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cliente <span style={{color:"red"}}>*</span></span>
          <SelectComp
            placeholder={'seleccionar cliente'}
            options={clientesRestructured(clientes)}
            value={clienteValue ? clienteValue.value : null}
            HandleChange={(value,record)=>{
              setClientevalue(record)
              setContactvalue(null)
              setContactos(record.contactos)
            }}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Contacto <span style={{color:"red"}}>*</span></span>
          <SelectComp
            placeholder={'seleccionar contacto'}
            options={contactosRestructured(contactos)}
            value={ contactValue ? contactValue.label : null }
            HandleChange={(value,record)=>{
              console.log(record)
              setContactvalue(record)
            }}
          />
        </div>
      </div>

      <div className='column' style={{gap:5}}>
        <span className='form-label'>Nombre de proyecto</span>
        <input style={{padding:8}} value={proyecto.nombre_etiqueta} onChange={(e)=>{
          if(e.target.value.trim().replace(/\s/g, "") === ""){
            console.log('valor nulo')
            setProyecto({...proyecto,nombre_etiqueta: null})
          }else{
            setProyecto({...proyecto,nombre_etiqueta: e.target.value})}
          }
        } placeholder='Ingrese nombre para el proyecto'/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
          <SelectComp
            placeholder={'Seleccionar vendedor'}
            options={vendedoresRestructured(subusuarios)}
            value={vendedorValue ? vendedorValue.value : null}
            HandleChange={(value,record)=>{
              console.log(record)
              setVendedorvalue(record)
            }}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comisión <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='number' value={proyecto.comision} onChange={(e)=>{
            if(e.target.value.trim().replace(/\s/g, "") === ""){
              console.log('valor nulo')
              setProyecto({...proyecto,comision: null})
            }else{              
              setProyecto({...proyecto,comision: e.target.value})
            }
          }} placeholder='Ingrese el valor de la comisión' />
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago <span style={{color:"red"}}>*</span></span>
          <SelectComp
              placeholder={'Seleccionar condición de pago'}
              value={proyecto.condicion_de_pago}

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
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Moneda</span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Botón de pago</span>
          <Switch style={{width:"30px"}} size="small" checked={disabled} onChange={onChange} />
        </div>
      </div>
      {
        error === true ?
        <div style={{color:"red"}}>Rellena todo hdp</div>
        :
        <></>
      }


      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn handleClick={nextStep}/>
      </div>

    </div>
  )
}

const SecondStep = ({setStep,productsList,setProductsList}) => {


  //Productos
  const { products } = useContext(AppContext)

  const [ selectedProduct,setSelectedProduct ] = useState(null)

  function productosRestructured (arrayProductos) {
    const filterProducts = arrayProductos.filter((item)=>item.activo === true) 
    const updateData = filterProducts.map((item)=>{
      return {
        ...item, 
        value: item.id, 
        label: item.nombre, 
        cantidad: 1,
        total: item.precio,
        precio: item.iva === true ? ((item.precio) - (item.precio*0.19) ).toFixed(2) : item.precio,
        neto: item.iva === true ? ((item.precio) - (item.precio*0.19) ).toFixed(2) : item.precio,
        iva_value :  item.iva === true ? ( item.precio * 0.19 ).toFixed(2) : "0",
        
      }
    })
    //console.log('data actualizada')
    //console.log(updateData)
    return updateData
  }


  //PIE DE PAGINA
  function subtotal () {
    let total = 0
    if(selectedProduct){
      total = total + parseFloat(selectedProduct.total)
    }
    if(productsList.length !== 0){
      productsList.forEach(element => {
        total = total += parseFloat(element.total)
      });
    }
    return total
  }


  function cantidadTotal () {
    let total = 0
    if(selectedProduct){
      total = total + parseInt(selectedProduct.cantidad)
    }
    if(productsList.length !== 0){
      productsList.forEach(element => {
        total = total += parseInt(element.cantidad)
      });
    }
    return total

  }


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
      <div className='row-space-btw form-header-step'>

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
          <SelectComp
            placeholder={'Seleccionar producto/servicio'}
            value={selectedProduct ? selectedProduct.value : null}
            options={productosRestructured(products)}
            HandleChange={(value,record)=>{
              setSelectedProduct(record)
              console.log('pruducto seleccionado')
              console.log(record)
            }}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Descripción</span>
          <input style={{padding:8}} placeholder='Introduce una descripción'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese la cantidad' type='number' value={selectedProduct ? selectedProduct.cantidad : null}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='number' placeholder='Ingrese el precio' value={selectedProduct ? selectedProduct.precio : null}/>
        </div>
      </div>

      <div className='principal-grid grid-4-columns'>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>%</span>
          <input style={{padding:8}}/>
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>Neto</span>
          <input style={{padding:8}} type='number' value={selectedProduct ? selectedProduct.neto : null} />
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>IVA</span>
          <input style={{padding:8}} type='number' //value={selectedProduct ? (selectedProduct.iva === true ? "19" : "0" ) : null}
          value={selectedProduct ? selectedProduct.iva_value : null}
          />
        </div>
      
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Total</span>
          <input style={{padding:8}} value={selectedProduct ? selectedProduct.total : null}/>
        </div>

      </div>

      <div className='principal-grid grid-3-columns' style={{marginTop:80}}>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad</span>
          <div style={{padding:"8px", width:"90%",border:"1px solid grey"}}>{cantidadTotal()}</div>
        </div>

        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ajuste de precio</span>
          <Slider range defaultValue={[0, 50]} disabled={disabled} />
          <span>Subtotal: $ {subtotal()} </span>
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

  const {menuOptions,setMenuOptions,userLoggedData} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/work_orders')
    setMenuOptions(updateData)
  }, [])


  const navigate = useNavigate()

  const [step,setStep] = useState(1)


  //CLIENTE
  const [ clienteValue,setClientevalue ] = useState(null)
  
  //CONTACTO
  const [ contactValue,setContactvalue ] = useState(null)
  

  //VENDEDOR
  const [ vendedorValue,setVendedorvalue ] = useState(null)
  

  //PROYECTO
  const proyectoInitialState = {
    //id
    user: userLoggedData.data.id,
    //idVendedor
    //vendedor: null,
    //idCliente
    //cliente: null,
    //numero de proyecto a partir del ultimo
    numero_proyecto: '1',
    //idContacto
    //contacto: null,
    //float
    comision: null,
    //varchar
    nombre_etiqueta: null,
    //varchar
    condicion_de_pago: null,
    boton_de_pago: true,
    //int
    plazo_de_entrega_dias: null,
    //date
    plazo_de_entrega:null,

    nota_interna: null,
    //varchar
    estado: 'Pendiente'
  }

  const [ proyecto,setProyecto ] = useState(proyectoInitialState)

  //PRODUCTOS
  const [ productsList,setProductsList ] = useState([])

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep} clienteValue={clienteValue} setClientevalue={setClientevalue} contactValue={contactValue} setContactvalue={setContactvalue} proyecto={proyecto} setProyecto={setProyecto} vendedorValue={vendedorValue} setVendedorvalue={setVendedorvalue}/>
      
      case 2:
        return <SecondStep setStep={setStep} productsList={productsList} setProductsList={setProductsList}/>
      
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