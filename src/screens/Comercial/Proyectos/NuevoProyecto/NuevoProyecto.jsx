import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong } from "react-icons/fa6";
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { Button, ConfigProvider, DatePicker, Slider, Space, Spin, Switch, Table } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { FaPlus } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

import { FaCheck, FaTrashAlt, FaUserPlus } from "react-icons/fa";



import Success from '../../../../components/Modals/Success';
import { BsArrowRight, BsBoxSeam } from 'react-icons/bs';


import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import SelectComp from '../../../../components/Select/SelectComp';
import axios from 'axios';
import { MdErrorOutline } from 'react-icons/md';
import { LoadingOutlined } from '@ant-design/icons';
import NuevoCliente from '../../Clientes/NuevoCliente/NuevoCliente';
import NuevoPS from '../../../Empresa/ProductosServicios/NuevoPS/NuevoPS';


const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];


const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());


const FirstStep = ({setStep,data,setData,setClientName,setVendedorName,clientSelected,setClientSelected,contactSelected,setContactSelected, contactosList,setContactosList,vendedorSelected,setVendedorSelected,condicionDePagoSelected,setCondicionDePagoSelected }) => {
  const { clientes,subusuarios } = useContext(AppContext)

  const [disabled, setDisabled] = useState(true);
  
  const [ contactos,setContactos ] = useState([])
  
  const onChange = (checked) => {
    setDisabled(checked);
    setData({...data,boton_de_pago:checked})
  };

 
  function clientesRestructured (arrayClientes) {
    const updateData = arrayClientes.map((item)=>{
      return {
        ...item, value: item.cliente.id, label: item.cliente.razon_social
      }
    })

    return updateData
  }


  function contactosRestructured (arrayContactos) {
    const updateData = arrayContactos.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })

    return updateData
  } 


  const [ contactValue,setContactvalue ] = useState(null)


  const [ clientModal,setClientModal ] = useState(false)

  function restructuredVendedores (arraySubUsuarios) {
    const updateData = arraySubUsuarios.map((item)=>{
      return {...item, value: item.id, label: item.nombre}
    })

    return updateData
  }


  return(
    <>
      <h2 style={{fontSize:20}}>Datos principales</h2>
      <div className='form-grid'>

        <div className='column' style={{gap:5}}>
          
          <div className='row-space-btw'>
            <span className='form-label' style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {}}>Cliente <span style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
            <div style={clientes.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{setClientModal(true)}} >
              <FaUserPlus/>
              <span>Agregar nuevo cliente</span>
            </div>
          </div>
          {
            clientes.length === 0 ?
            <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
              <span>No hay clientes registrados</span>
            </div>
            :
            <SelectComp
              placeholder={'seleccionar cliente'}
              HandleChange={(value,record)=>{
                //console.log(`seleccionado ${value} ${record.label}`)
                //console.log(value)
                const clientContact = clientes.find((item)=>item.cliente.id === value)
                //console.log(clientContact.contactos)
                setContactos(clientContact.contactos)
                //////////////////////////
  
                setContactosList(clientContact.contactos)
  
                setContactSelected(null)
                
                setClientName(record.label)
                setData({
                  ...data, cliente: value
                })
                //setear a null el contacto
                setContactvalue(null)
  
                setClientSelected(record)
              }}
              options={clientesRestructured(clientes)}
              value={clientSelected ? clientSelected.value : null}
              //value={data.cliente ? data.cliemte : null}
            />
          }
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label' style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {}}>Contacto <span style={clientes.length === 0 ? {color:"#b9b9b9c4"} :{color:"red"}}>*</span></span>
          {
            clientes.length === 0 ?
            <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 5px", borderRadius:5}}>
              <span>-</span>
            </div>
            :
            <SelectComp
              //value={contactValue}
              placeholder={'seleccionar contacto'}
              HandleChange={(value,record)=>{
                //console.log(`seleccionado ${value} ${record.label}`)
                setData({
                  ...data, contacto: value
                })
                setContactvalue(value)
                setContactSelected(record)
              }}
              value={contactSelected ? contactSelected.value : null}
              options={contactosRestructured(contactosList)}
            />
          }
        </div>
      </div>

      <div className='column' style={{gap:5}}>
        <span className='form-label'>Nombre de proyecto</span>
        <input style={{padding:8}} value={data.nombre_etiqueta} onChange={(e)=>{setData({...data,nombre_etiqueta:e.target.value})}} placeholder='Ingrese nombre para el proyecto'/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
          {/*Terminar esto*/}
          <SelectComp
          placeholder={'Seleccionar vendedor'}
          HandleChange={(value,record)=>{
            //console.log(`seleccionado ${value} ${record.label}`)
            setVendedorSelected(record)
            ////////////////////////////
            setVendedorName(record.label)
            setData({
              ...data, vendedor: value
            })
          
            //setContactvalue(value)
          }}
          value={vendedorSelected ? vendedorSelected.value : null}
          options={restructuredVendedores(subusuarios)}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comision</span>
          <input style={{padding:6}} type='number'  onChange={(e)=>{
            if(e.target.value.trim().replace(/\s/g, "") === "" ){
              setData({...data,comision:null})
            }else{
              setData({...data,comision:parseFloat(e.target.value)})
            }
            
            
          }} placeholder='Ingrese el valor de la comisión'/>
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Condicion de pago <span style={{color:"red"}}>*</span></span>

            <SelectComp
              placeholder={'Seleccionar condición de pago'}
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
                setData({...data,condicion_de_pago:value})
                setCondicionDePagoSelected(record)
              }}
              value={condicionDePagoSelected ? condicionDePagoSelected.value : null}
            />
          </div>
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Moneda</span>
            <SelectComponent/>
          </div>
          <div  className='column'>
            <span className='form-label'>Botón de pago</span>
            <Switch style={{width:"30px"}} size="small" checked={disabled} onChange={onChange} />
        </div>
      </div>
      

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>
      {
        clientModal === true ?
        <div className='modal-overlay'>
          <div className='modal' style={{minHeight:"90%",minWidth:"95%",padding:"0px 20px"}}>
            <div style={{position:"absolute",top:0,right:10}} onClick={()=>{setClientModal(false)}}>x</div>
            <div style={{width:"100%",border:"1px solid black",height:"95%",overflowY:"scroll"}}>
              <NuevoCliente 
                reference={true}
                setClose={setClientModal}
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

const SecondStep = ({setStep,data,setData,items,setItems}) => {
  //commit
  const { products } = useContext(AppContext);

  const [ bonificacion,setBonificacion ] = useState(null)
  const [disabled, setDisabled] = useState(false);
  

  const currentItemInitialState = {
    product_name: '',
    product_id: '',
    descripcion: '',
    cantidad: null,
    precio: null,
    porcentaje: null,
    neto: null,
    iva: null,
    total: null,
    porcentaje: null
  }

  const [ currentItemData,setCurrentItemData ] = useState(currentItemInitialState)
  
  const onChange = (checked) => {
    setDisabled(checked);
  };

  const [ pslist,setPslist ] = useState([])


  function addProductoServicio (){
    setPslist([...pslist,{...currentItemData,list_id: uuidv4()}])
    setItems([...items,{...currentItemData,list_id: uuidv4()}])
  }


  function deleteProductoServicio (id) {
    const updateData = pslist.filter((item)=>item.list_id !== id)
    setPslist(updateData)
    setItems(updateData)
  }

  function productsRestructured (productsArray) {
    const updateData = productsArray.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })

    return updateData
  }

  const [ productModal,setProductModal ] = useState(false);


  return(
    <>
      
      <div className='row-space-btw form-header-step' >
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
                    dataIndex: 'product_name',
                    key: 'product_name',
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
                        <FaTrashAlt style={{cursor:"pointer"}} onClick={()=>{deleteProductoServicio(record.list_id)}}/>
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
            <div className='row' style={products.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} onClick={()=>{setProductModal(true)}}>
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
              placeholder={'Seleccionar producto/servicio'}
              options={productsRestructured(products)}
              HandleChange={(value,record)=>{
                console.log({
                  product_name: record.nombre,
                  product_id: record.id,
                  descripcion: '',
                  cantidad: 1,
                  precio: record.iva === true ? ((record.precio) - (record.precio*0.19) ).toFixed(2) : record.precio,
                  porcentaje: null,
                  neto: record.iva === true ? ((record.precio) - (record.precio*0.19) ).toFixed(2) : record.precio,
                  iva: record.iva === true ? ( record.precio * 0.19 ).toFixed(2) : null,
                  total: record.precio,
                } )
                setCurrentItemData({
                  product_name: record.nombre,
                  product_id: record.id,
                  descripcion: '',
                  cantidad: 1,
                  precio: record.iva === true ? ((record.precio) - (record.precio*0.19) ).toFixed(2) : record.precio,
                  porcentaje: null,
                  neto: record.iva === true ? ((record.precio) - (record.precio*0.19) ).toFixed(2) : record.precio,
                  iva: record.iva === true ? ( record.precio * 0.19 ).toFixed(2) : null,
                  total: record.precio,
                })
                
              }}
            />

          }
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Descripcion</span>
          <input style={{padding:8}}/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='number' value={currentItemData.cantidad } onChange={(e)=>{
            setCurrentItemData({
              ...currentItemData, cantidad: parseInt(e.target.value)
            })
          }} placeholder='Ingrese la cantidad'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='number' value={currentItemData.precio} placeholder='Ingrese el precio'/>
        </div>
      </div>
      <div className='form-grid-price'>
        <div className='column' style={{gap:5}}>
          <span className='form-label' onChange={(e)=>{
            
          }}>%</span>
          <input style={{padding:9}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Neto</span>
          <input style={{padding:9}} type='number' value={currentItemData.neto} />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>IVA</span>
          <input style={{padding:9}} type='number' value={currentItemData.iva}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Total</span>
          <input style={{padding:9}} type='number' value={currentItemData.total}/>
        </div>
      </div>
      <div className='form-grid-price-footer'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad</span>
          <input style={{padding:9}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ajuste de precio</span>
          <Slider range defaultValue={[0, 230]} disabled={disabled}
           />
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


const ThirdStep = ({setStep,data,setData,direcPrestacion,setDirecPrestacion}) => {
  return(
    <>
      <h2>Direccion de despacho</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Direccion</span>
          <input value={direcPrestacion.direccion} onChange={(e)=>{setDirecPrestacion({...direcPrestacion,direccion:e.target.value})}} style={{padding:6}} placeholder='Ingrese la dirección'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Comuna</span>
          <input value={direcPrestacion.comuna} onChange={(e)=>{setDirecPrestacion({...direcPrestacion,comuna:e.target.value})}} style={{padding:6}} placeholder='Introduce la comuna'/>
        </div>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ciudad</span>
          <input style={{padding:6}} value={direcPrestacion.ciudad} onChange={(e)=>{setDirecPrestacion({...direcPrestacion,ciudad:e.target.value})}} placeholder='Ingrese la ciudad'/>
        </div>
      </div>
      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn setStep={setStep} value={4}/>        
      </div>
    </>
  )
}

const FourthStep = ({setStep,data,setData,items,direcPrestacion,setLoadingScreen,setErrorScreen,directPrestacionInitialState,clientName,vendedorName}) => {

  const { proyectos,setProyectos } = useContext(AppContext);


  const onChange = (date, dateString) => {
    console.log(date, dateString);
    const fecha = new Date(dateString);
    const fechaMod = fecha.toISOString()
    console.log(fechaMod)
    setData({
      ...data,plazo_de_entrega: fechaMod
    })
  };


  function restructuredItems (itemsArray){
    const updateData = itemsArray.map((item)=>{
      return {
        idProducto: item.product_id,
        cantidad: parseInt(item.cantidad),
        porcentaje_descuento: 0,
        nombre_impuesto: 'IVA',
        impuesto: 0.19,
        precio: parseFloat(item.precio),
        total: parseFloat(item.total)
      }
    })
    return updateData
  }


  function restructuredItemSetter (itemsArray) {

    const updateData = itemsArray.map((item)=>{
      return {
        idProducto: item.product_id,
        cantidad: parseInt(item.cantidad),
        porcentaje_descuento: 0,
        nombre_impuesto: 'IVA',
        impuesto: 0.19,
        precio: parseFloat(item.precio),
        total: parseFloat(item.total),
        nombre: item.product_name
      }
    })
    return updateData
  }

  function getTotal (itemsArray){
    let total = 0;
    itemsArray.forEach(element => {
      total = total + parseFloat(element.total)
    });
    return total
  }

  function getNeto (itemsArray){
    let neto = 0;
    itemsArray.forEach(element => {
      neto = neto + parseFloat(element.neto)
    });
    return neto
  }

  function createProject () {
    console.log(data)
    const fecha = new Date()
    const fecha_formated = fecha.toISOString();

    const objtData = {
      proyectos: {...data, fecha: fecha_formated},
      direccion_de_prestacion_proyecto:  {...direcPrestacion, atencion_a: data.cliente },
      item_producto_proyecto: restructuredItems(items)
    }
    const objtArray = {
      ...data,
      numero: data.numero_proyecto,
      fecha: fecha_formated,
      vendedor: vendedorName,
      cliente: clientName,
      nombre: data.nombre_etiqueta,
      productos_servicios: {
        productos: restructuredItemSetter(items),
        servicios: []
      },
      total: getTotal(items),
      neto: getNeto(items)
    }
    console.log('objeto para setear al contexto')
    console.log(objtArray)
    console.log('objeto para mandar al back')
    console.log(objtData)
    
    sendData(objtData,objtArray)
  }


  async function sendData (data,objtArray){
    setLoadingScreen(true)
    try{
      const response = await axios.post(`https://appify-black-side.vercel.app/projects/crearProject`,data)
      console.log(response)
      setProyectos([...proyectos, {...objtArray, id: response.data.payload.proyecto.id} ])
      setErrorScreen(false)
      setData(directPrestacionInitialState)
      setLoadingScreen(false)
      setStep(5)
      setTimeout(() => {
        setStep(1)
      }, 3000); 
    
    }catch(err){
      console.log(err)
      setLoadingScreen(false)
      setErrorScreen(true)
    }
  }

  
  return(
    <>
      <div className='row'>
        <h2>Plazo de entrega</h2>
        <span style={{color:"grey"}}>(Opcional)</span>
      </div>
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Dias</span>
          <input style={{padding:8}} type='number' onChange={(e)=>{
            setData({
              ...data, plazo_de_entrega_dias: parseInt(e.target.value)
            })
          }} placeholder='Ingrese los días hábiles'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha</span>
          <DatePicker onChange={onChange} picker='date'/>
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
  const {menuOptions,setMenuOptions,clientes} = useContext(AppContext);

  const [ loadingScreen,setLoadingScreen ] = useState(false);

  const [ errorScreen,setErrorScreen ] = useState(false);
  

  const [ items,setItems ] = useState([])
  const proyectoInitialState = {
    //id
    user: '1114ad52-f699-4eb8-9a08-ef9e61eaa42a',
    //idVendedor
    vendedor: null,
    //idCliente
    cliente: null,
    //numero de proyecto a partir del ultimo
    numero_proyecto: '1',
    //idContacto
    contacto: null,
    //float
    comision: null,
    //varchar
    nombre_etiqueta: '',
    //varchar
    condicion_de_pago: null,
    boton_de_pago: true,
    //int
    plazo_de_entrega_dias: null,
    //date
    plazo_de_entrega:null,

    nota_interna: '',
    //varchar
    estado: 'Pendiente'
  }


  const [ data,setData ] = useState(proyectoInitialState);

  const [ clientSelected,setClientSelected ] = useState(null)
  const [ contactSelected,setContactSelected ] = useState(null)
  const [ contactosList,setContactosList ] = useState([])

  const [ vendedorSelected,setVendedorSelected ] = useState(null)

  const [ condicionDePagoSelected,setCondicionDePagoSelected ] = useState(null)
  
  const directPrestacionInitialState = {
    punto: null,
    atencion_a: null,
    direccion: null,
    comuna: null,
    ciudad: null,
    duracion:'PT8H'
  }
  const [ direcPrestacion,setDirecPrestacion ] = useState(directPrestacionInitialState)
  
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión','/quotes')
    setMenuOptions(updateData)
  }, [])

  const [ step,setStep ] = useState(1);

  const [ clientName,setClientName ] = useState(null)

  const [ vendedorName,setVendedorName ] = useState(null)

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep} data={data} setData={setData} setClientName={setClientName} setVendedorName={setVendedorName} clientSelected={clientSelected} setClientSelected={setClientSelected} contactSelected={contactSelected} setContactSelected={setContactSelected} contactosList={contactosList} setContactosList={setContactosList} vendedorSelected={vendedorSelected} setVendedorSelected={setVendedorSelected} condicionDePagoSelected={condicionDePagoSelected} setCondicionDePagoSelected={setCondicionDePagoSelected}/>
      case 2:
        return <SecondStep setStep={setStep} data={data} setData={setData} items={items} setItems={setItems}/>
      case 3:
        return <ThirdStep setStep={setStep} data={data} setData={setData} direcPrestacion={direcPrestacion} setDirecPrestacion={setDirecPrestacion}/>
      case 4:
        return <FourthStep setStep={setStep} data={data} setData={setData} items={items} direcPrestacion={direcPrestacion} setLoadingScreen={setLoadingScreen} setErrorScreen={setErrorScreen} directPrestacionInitialState={directPrestacionInitialState} vendedorName={vendedorName} clientName={clientName}/>
      
    }
  }


  

  return (
    <>
    <div className='row' onClick={()=>{navigate('/quotes')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
      <FaArrowLeftLong/>
      <span>Volver a proyectos</span>
    </div>
    <h1>Agregar proyecto</h1>
    {
      loadingScreen === true ?
      <>
          <div style={{height:"80%",width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:85}}>
            <h2>Creando producto...</h2>
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
                <h2>¡Error al crear el producto!</h2>
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
            
          }
        </>
    }
    </>
  )
}

export default NuevoProyecto