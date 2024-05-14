import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../components/Select/SelectComponent';
import { DatePicker, Radio, Table } from 'antd';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { FiDownload, FiFileText } from 'react-icons/fi';
import SelectComp from '../../../../components/Select/SelectComp';
import { BsBoxSeam } from 'react-icons/bs';
import NuevoPS from '../../../Empresa/ProductosServicios/NuevoPS/NuevoPS';

/*STEPS*/

const FirstStep = ({setStep,tipoDeDocumento,setTipoDeDocumento,tipoDeNota,setTipoDeNota,tipoDeDocumentoRelacionado,setTipoDeDocumentoRelacionado,vendedor,setVendedor,condicionDePago,setCondicionDePago,centoBeneficio,setCentoBeneficio  }) =>{

  const { subusuarios } = useContext(AppContext)


  function restructuredData(subusuarios) {
    const vendedores = subusuarios.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })

    return vendedores
  }

  return(
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Información de documento</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
          <SelectComp
            value={tipoDeDocumento.value}
            options={[
              {
                label:'Factura',
                value:1
              },
              {
                label:'Factura exenta',
                value:2
              },
              {
                label:'Nota de credito',
                value:3
              },
              {
                label:'Nota de debito',
                value:4
              },
              {
                label:'Voucher de venta',
                value:5
              },
            ]}

            HandleChange={(value,record)=>{
              setTipoDeNota(null)
              setTipoDeDocumentoRelacionado(null)
              setVendedor(null)
              setCondicionDePago(null)
              setCentoBeneficio(null)
              setTipoDeDocumento(record)
              
            }}
          />
        </div>
        {
          tipoDeDocumento.value === 3 || tipoDeDocumento.value === 4 ?
          <div className='column' style={{gap:5}}>
            <span className='form-label'>Tipo de nota <span style={{color:"red"}}>*</span></span>
            <SelectComp
              placeholder={'seleccionar el tipo de nota'}
              value={tipoDeNota ? tipoDeNota.value : null} 
              HandleChange={(value,record)=>{
                setTipoDeNota(record)
              }}
              options={[
                {
                  label: 'Anula documento de referencia',
                  value:1
                },
                {
                  label: 'Corrige texto documento de referencia',
                  value:2
                },
                {
                  label: 'Corrige montos en documentos de referencia',
                  value:3
                },
              ]}
            />
          </div>
          :
          <div className='column' style={{gap:5}}>
            <span className='form-label'>N° de documento</span>
            <input style={{padding:8}} placeholder='Ingrese el número del documento'/>
          </div>
        }
      </div>
      {
        tipoDeDocumento.value === 3 || tipoDeDocumento.value === 4 ?
        <>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Tipo de documento relacionado <span style={{color:"red"}}>*</span></span>
              <SelectComp 
                placeholder={'Sleccionat documento relacionado'}
                value={tipoDeDocumentoRelacionado ? tipoDeDocumentoRelacionado.value : null}
                HandleChange={(text,record)=>{
                  setTipoDeDocumentoRelacionado(record)
                }}
                options={ [
                  {
                    label: 'Factura',
                    value:1
                  },
                  {
                    label: 'Factura exenta',
                    value:2
                  },
                  {
                    label: 'Factura de exportacion',
                    value:3
                  },
                  {
                    label: 'Boleta',
                    value:4
                  },
                  {
                    label: 'Boleta exenta',
                    value:5
                  },
                  {
                    label: 'Nota de credito',
                    value:6
                  }
                ]}
              />
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>N° de documento relacionado </span>
              <input style={{padding:8}} placeholder='Ingrese el número del documento'/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Motivo de referencia </span>
              <input style={{padding:8}} placeholder='Ingrese el motivo del documento'/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
              <DatePicker picker='week'/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Centro de beneficio </span>
              <SelectComp
                value={centoBeneficio ? centoBeneficio.value : null}
                HandleChange={(text,record)=>{
                  setCentoBeneficio(record)
                }}
                placeholder={'seleccionar el centro de beneficio'} 
                options={[
                  { label: "Ajustes de centralizacion", value: 1 },
                  { label: "Arriendos y leasing", value: 2 },
                  { label: "Cargos e interes bancarios", value: 3 },
                  { label: "Comidas y entretenimiento", value: 4 },
                  { label: "Contratistas", value: 5 },
                  { label: "Costo insumos, materiales y productos", value: 6 },
                  { label: "Cuentas servicios basicos", value: 7 },
                  { label: "Diferencias tipo cambio", value: 8 },
                  { label: "Gasto sin documento tributario", value: 9 },
                  { label: "Gastos reembolsables", value: 10 },
                  { label: "Gastos sin clasificar", value: 11 },
                  { label: "Impuestos y patentes", value: 12 },
                  { label: "Intereses y gastos financieros", value: 13 },
                  { label: "Iva no recuperable", value: 14 },
                  { label: "Otros gastos de negocio", value: 15 },
                  { label: "Otros gastos misceláneos", value: 16 },
                  { label: "Otros ingresos no operacionales", value: 17 },
                  { label: "Preguntar a mi contador", value: 18 },
                  { label: "Remuneraciones socios", value: 19 },
                  { label: "Seguros", value: 20 },
                  { label: "Servicios Legales y Profesionales", value: 21 },
                  { label: "Sueldos y remuneraciones personal", value: 22 },
                  { label: "Suministros de oficina y software", value: 23 },
                  { label: "Vehiculos y gastos asociados", value: 24 },
                  { label: "Ventas", value: 25 },
                  { label: "Ventas sin documentos tributarios", value: 26 },
                  { label: "Viajes", value: 27 }
                ]}
              />
            </div>
          </div>
        </>
        :
        <>
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
              <SelectComp
                value={vendedor ? vendedor.value : null}
                placeholder={'Seleccionar vendedor'}
                options={restructuredData (subusuarios)}
                HandleChange={(text,record)=>{
                  setVendedor(record)
                }}
              />
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Condición de pago</span>
              <SelectComp
              value={condicionDePago ? condicionDePago.value : null}
              HandleChange={(text,record)=>{
                setCondicionDePago(record)
              }}
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
              />
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Centro de beneficio</span>
              <SelectComp
                value={centoBeneficio ? centoBeneficio.value : null}
                HandleChange={(text,record)=>{
                  setCentoBeneficio(record)
                }}
                placeholder={'seleccionar el centro de beneficio'} 
                options={[
                  { label: "Ajustes de centralizacion", value: 1 },
                  { label: "Arriendos y leasing", value: 2 },
                  { label: "Cargos e interes bancarios", value: 3 },
                  { label: "Comidas y entretenimiento", value: 4 },
                  { label: "Contratistas", value: 5 },
                  { label: "Costo insumos, materiales y productos", value: 6 },
                  { label: "Cuentas servicios basicos", value: 7 },
                  { label: "Diferencias tipo cambio", value: 8 },
                  { label: "Gasto sin documento tributario", value: 9 },
                  { label: "Gastos reembolsables", value: 10 },
                  { label: "Gastos sin clasificar", value: 11 },
                  { label: "Impuestos y patentes", value: 12 },
                  { label: "Intereses y gastos financieros", value: 13 },
                  { label: "Iva no recuperable", value: 14 },
                  { label: "Otros gastos de negocio", value: 15 },
                  { label: "Otros gastos misceláneos", value: 16 },
                  { label: "Otros ingresos no operacionales", value: 17 },
                  { label: "Preguntar a mi contador", value: 18 },
                  { label: "Remuneraciones socios", value: 19 },
                  { label: "Seguros", value: 20 },
                  { label: "Servicios Legales y Profesionales", value: 21 },
                  { label: "Sueldos y remuneraciones personal", value: 22 },
                  { label: "Suministros de oficina y software", value: 23 },
                  { label: "Vehiculos y gastos asociados", value: 24 },
                  { label: "Ventas", value: 25 },
                  { label: "Ventas sin documentos tributarios", value: 26 },
                  { label: "Viajes", value: 27 }
                ]}
              />
            </div>
          </div>
        </>
        
      }


      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </div>
  )
}


const SecondStep = ({setStep,referenciaADocumentosExternos,setReferenciaADocumentosExternos,tipoDeDocumentoExterno,setTipoDeDocumentoExterno }) =>{
  const [value, setValue] = useState(null);
  const [ pslist,setPslist ] = useState([])

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    if(e.target.value === 2){
      setPslist([])
    }
    setReferenciaADocumentosExternos(e.target.value)
  };





  function addDocumentoDeVenta (){
    setPslist([...pslist,{
      key:1+pslist.length,
      tipo: 'Tipo de documento de venta',
      fecha: '02/02/2024',
      folio: '2234',
      razon: 'razon',
    }])
  }

  return(
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h2 style={{fontSize:20}}>Documentos externos</h2>
        {
          value === 1 ?
          <AddMoreBtn label={'Nueva referencia'} HanldeClick={addDocumentoDeVenta}/>
          :
          <></>
        }
      </div>

      {
        value === 1 ?
        <>
        {
          pslist.length === 0 ?
          <></>
          :
          <>
            <h2>Items</h2>
            <div style={{width:"100%",alignItems:"center"}}>
              <Table
                dataSource={pslist}
                columns={
                  [
                    {
                      title: 'Tipo',
                      dataIndex: 'tipo',
                      key: 'tipo',
                    },
                    {
                      title: 'Fecha',
                      dataIndex: 'fecha',
                      key: 'fecha',
                    },
                    {
                      title: 'Folio',
                      dataIndex: 'folio',
                      key: 'folio',
                    },
                    {
                      title: 'Razón',
                      dataIndex: 'razon',
                      key: 'razon',
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
          </>

        }
        </>
        :
        <></>
      }

      <div className='form-grid'>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Referencia a documentos externos</span>
          <Radio.Group onChange={onChange} value={referenciaADocumentosExternos}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>

      {
        referenciaADocumentosExternos === true?
        <>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
              <SelectComp 
              value={tipoDeDocumentoExterno ? tipoDeDocumentoExterno.value : null}
              HandleChange={(text,record)=>{
                setTipoDeDocumentoExterno(record)
              }}
              options={[
                {
                  label:'Factura',
                  value:1
                },
                {
                  label:'Factura exenta',
                  value:2
                },
                {
                  label:'Nota de credito',
                  value:3
                },
                {
                  label:'Nota de debito',
                  value:4
                },
                {
                  label:'Voucher de venta',
                  value:5
                },
              ]}
              
              />
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
              <DatePicker picker='week'/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Folio <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}} placeholder='Ingrese el nombre'/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Razón </span>
              <input style={{padding:8}} placeholder='Ingrese la razón'/>
            </div>
          </div>

        </>
        :
        <>
        
        </>
      }

      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn setStep={setStep} value={3}/>
      </div>
    </div>
  )
}


const ThirdStep = ({setStep,vincularOT, setVincularOT,ordenesDeTrabajoList,setOrdenesDeTrabajoList,ordenDeTrabajoSelected,setOrdenDeTrabajoSelected }) =>{

  const { ordenesDeTrabajo,products } = useContext(AppContext)
  
  const [selectedProduct,setSelectedProduct] = useState(null)
  
  const [ loading,setLoading ] = useState(false)

  useEffect(() => {
    console.log(ordenesDeTrabajo)
  }, [])
  

  function restructuredOTs () {
    const updateData = ordenesDeTrabajo.map((item)=>{
      return {
        ...item, label: `OT-${item.orden.slice(-4)} | ${item.cliente}`,
        value: item.orden
      }
    })

    return updateData
  }

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

  const [value, setValue] = useState(1);

  const [ pslist,setPslist ] = useState([])


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setPslist([])
    setOrdenDeTrabajoSelected(null)
    setValue(e.target.value);
    setVincularOT(e.target.value)
  };



  function addOT (){
    if(ordenDeTrabajoSelected){
      setOrdenesDeTrabajoList([...ordenesDeTrabajoList,ordenDeTrabajoSelected])
    }
    /*
    setPslist([...pslist,{
      key:1+pslist.length,
      ot: 'N-1232',
      id: '12388',
      producto: 'Producto 1',
      cantidad: 1,
      porcentaje: 0,
      neto:1400,
      bruto:1400
    }])
    */
  }

  function addItem (){
    setPslist([...pslist,{
      key:1+pslist.length,
      cod: '12388',
      nombre: 'Nombre',
      cantidad: 1,
      porcentaje: 0,
      neto:1400,
      bruto:1400
    }])
  }


  const [ productModal,setProductModal ] = useState(false);


  return(
    <>
    <div className='principal-container-column'>
      
      <div className='row-space-btw'>
        <div className='row'>
          <h2 style={{fontSize:20}}>Orden de trabajo</h2>
          <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
            <FiDownload />
          </div>
        </div>
        {
          value === true ?
          <AddMoreBtn label={'Vincular nueva'} HanldeClick={addOT}/>
          :
          <></>

        }
      </div>
      
      
      <div className='form-grid'>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Vincular a orden de trabajo</span>
          <Radio.Group onChange={onChange} value={vincularOT}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
        <div className='column' style={{gap:5}}>
          {
            vincularOT === true?
            <>
              <div className='row-space-btw'>
                <span className='form-label' style={ordenesDeTrabajo.length === 0 ? {color:"#b9b9b9c4"} : {}}>Orden de trabajo <span style={ordenesDeTrabajo.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
                <div style={ordenesDeTrabajo.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{
                  //setClientModal(true)
                  }} >
                  <FiFileText/>
                  <span>Agregar nuevo OT</span>
                </div>
              </div>
              {
                ordenesDeTrabajo.length === 0 ?
                <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
                  <span>No hay ordenes de trabajo registradas</span>
                </div>
                :
                <SelectComp 
                  value={ordenDeTrabajoSelected ? ordenDeTrabajoSelected.value : null}
                  HandleChange={(text,record)=>{
                    console.log(record)
                    setOrdenDeTrabajoSelected(record)
                  }}
                  options={restructuredOTs(ordenesDeTrabajo)}
                />

              }
            </>
            :
            <>
              <div></div>
            </>
          }
        </div>
      </div>
      {
        pslist.length === 0 ?
        <></>
        :
        <>
          {
            value === true?
            <>
              <h2>Ítems</h2>
              <div style={{width:"100%",alignItems:"center"}}>
                <Table
                  dataSource={pslist}
                  columns={
                    [
                      {
                        title: 'Orden de trabajo',
                        dataIndex: 'ot',
                        key: 'ot',
                      },
                      {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                      },
                      {
                        title: 'Producto/Servico',
                        dataIndex: 'producto',
                        key: 'producto',
                      },
                      {
                        title: 'Cantidad',
                        dataIndex: 'cantidad',
                        key: 'cantidad',
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
                        title: 'Bruto',
                        dataIndex: 'bruto',
                        key: 'bruto',
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
            </>
            :
            <>
              <h2>Ítems</h2>
              <div style={{width:"100%",alignItems:"center"}}>
                <Table
                  dataSource={pslist}
                  columns={
                    [
                      {
                        title: 'Código',
                        dataIndex: 'cod',
                        key: 'cod',
                      },
                      {
                        title: 'Nombre',
                        dataIndex: 'nombre',
                        key: 'nombre',
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
                        title: 'Bruto',
                        dataIndex: 'bruto',
                        key: 'bruto',
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
            </>
          }
        </>
      }

      {
        vincularOT === true ?
        <>
          {
            ordenDeTrabajoSelected ?
            <>
              {
                ordenDeTrabajoSelected.productos_servicios.productos.map((item)=>
                <>
                  <div className='principal-grid grid-3-columns'>
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Id</span>
                      <input style={{padding:8}} value={item.id}/>
                    </div>

                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Producto/Servicio</span>
                      <input style={{padding:8}} value={item.nombre}/>
                    </div>
                    
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
                      <input style={{padding:8}} placeholder='Ingrese la cantidad' value={item.cantidad}/>
                    </div>        
                  </div>
                  <div className='principal-grid grid-3-columns' style={{marginBottom:30}}>
            
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>%</span>
                      <input style={{padding:8}} value={item.porcentaje_descuento}/>
                    </div>

                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Neto</span>
                      <input style={{padding:8}} value={(item.total - item.precio).toFixed(2)}/>
                    </div>
                    
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Bruto </span>
                      <input style={{padding:8}} value={item.total}/>
                    </div>

                  </div>
                </>
                
                )
              }

            </>
            :
            <>
              <div className='principal-grid grid-3-columns'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Id</span>
                  <input style={{padding:8}}/>
                </div>

                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Producto/Servicio</span>
                  <input style={{padding:8}}/>
                </div>
                  
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
                </div>              

              </div>

              <div className='principal-grid grid-3-columns'>
            
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>%</span>
                      <input style={{padding:8}}/>
                    </div>

                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Neto</span>
                      <input style={{padding:8}}/>
                    </div>
                    
                    <div className='column' style={{gap:5}}>
                      <span className='form-label'>Bruto </span>
                      <input style={{padding:8}}/>
                    </div>

              </div>
            </>
          }
          
          {
            /*
            <div className='form-grid'>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Condición de pago</span>
                <SelectComponent/>
              </div>
              
            </div>
            
            */
          }


        </>
        :
        <>
          <div className='container-item-flex-end'>
            <AddMoreBtn label={'Agregar'} HanldeClick={addItem}/>
          </div>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <div className='row-space-btw'>
                <span className='form-label' style={products.length === 0 ? {color:"#b9b9b9c4"} : {}}>Producto/Servicio <span style={products.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
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
                  placeholder={'Seleccionar producto/servicio'}
                  //value={selectedProduct ? selectedProduct.value : null}
                  options={productosRestructured(products)}
                  HandleChange={(value,record)=>{
                    //setSelectedProduct(record)
                    //console.log('pruducto seleccionado')
                    //console.log(record)
                  }}
                />
              }
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Descripción</span>
              <input style={{padding:8}} placeholder='Introduce una descripción'/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} placeholder='Ingrese la cantidad' type='number' value={selectedProduct !== null ? selectedProduct.cantidad : null}/>

              }
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} type='number' placeholder='Ingrese el precio' value={selectedProduct ? selectedProduct.precio : null}/>
              }
            </div>
          </div>
        
          <div className='principal-grid grid-4-columns'>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>%</span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Neto</span>
              {
                loading === true ?
                <div>Load</div>
                :
                <input style={{padding:8}} type='number' value={selectedProduct ? selectedProduct.neto : null} />
              }
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>IVA</span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} type='number' 
                value={selectedProduct ? selectedProduct.iva_value : null}
                />
              }
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Total</span>
              {
                loading === true ?
                <div>char</div>
                :
                <input style={{padding:8}} value={selectedProduct ? selectedProduct.total : null}/>
              }
            </div>

          </div>


          {
            /*
          <div className='principal-grid grid-3-columns'>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Nombreee <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}}/>
            </div>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Precio unitario <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
            </div>

          </div>
          
          <div className='principal-grid grid-3-columns'>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>%</span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Neto</span>
              <input style={{padding:8}}/>
            </div>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Bruto </span>
              <input style={{padding:8}}/>
            </div>

          </div>
          
          <div className='container-item-flex-end'>
              <div className='column' style={{boxSizing:"border-box",padding:20}}>
                <div className='row'>
                  <span style={{fontWeight:600}}>SubTotal: </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>IVA (19%): </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>Total: </span>
                  <span>$</span>
                </div>
              </div>
          </div>
            */
          }
          {
            /*
            <div className='form-grid'>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Condición de pago</span>
                <SelectComponent/>
              </div>
              
            </div>
            
            */
          }
        </>
      }


      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn setStep={setStep} value={4}/>
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

const FourthStep = ({setStep}) =>{


  function createDV () {
    setStep(6)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Orden de trabajo</h2>

      <div className='column' style={{gap:5}}>
        <span className='form-label'>Asociar guía</span>
        <SelectComponent/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Orden de trabajo <span style={{color:"red"}}>*</span></span>
          <input style={{padding:6}} placeholder='Ingrese la orden de trabajo'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ítem <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:6}} placeholder='Ingrese la cantidad'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha recepción  <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='week'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas</span>
          <textarea style={{height:100}}/>
        </div>
      </div>

      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={3}/>
        <CreateBtn label={'Crear documento'} HanldeClick={createDV}/>
      </div>

    </div>
  )
}


const NuevoDocumentoDeVenta = () => {

  const navigate = useNavigate()

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/sale_invoices')
    setMenuOptions(updateData)
  }, [])


  //DATA 
  const dataInitialState = {
    numero_documento: null,
    numero_documento_relacionado: null,
    motivo_referencia: null,
    fecha: null
  }
  const [ data,setData ] = useState(dataInitialState)

  //TIPO DE DOCUMENTO
  const tipoDeDocumentoInitialState = {
    label:'Factura',
    value:1
  }
  const [ tipoDeDocumento,setTipoDeDocumento ] = useState(tipoDeDocumentoInitialState)


  //TIPO DE NOTA

  const [ tipoDeNota,setTipoDeNota ] = useState(null)

  //TIPO DE DOCUMENTO RELACIONADO
  
  const [ tipoDeDocumentoRelacionado,setTipoDeDocumentoRelacionado ] = useState(null)



  //VENDEDOR
  const [ vendedor,setVendedor ] = useState(null)


  //CENTRO BENEFICIO
  const [centoBeneficio,setCentoBeneficio ] = useState(null)

  //DOCUMENTOS EXTERNOS
  const [ documentosExternosList,setDocumentosExternosList ] = useState([])

  //ORDENES DE TRABAJO VINCULADAS
  const [ vincularOT, setVincularOT ] = useState(true)


  const [ ordenesDeTrabajoList,setOrdenesDeTrabajoList ] = useState([])

  const [ ordenDeTrabajoSelected,setOrdenDeTrabajoSelected ] = useState(null)

  //ALTERNATIVA A ORDENES DE TRABAJO VINCULADAS

  const [ alterordenesDeTrabajoList,setAlterOrdenesDeTrabajoList ] = useState([])

  //CONDICION DE PAGO

  const [ condicionDePago,setCondicionDePago ] = useState(null)


  //GUIA ASOCIADA

  const [ guia,setGuia ] = useState(null)


  //Referencia a documentos externos value
  const [ referenciaADocumentosExternos,setReferenciaADocumentosExternos ] = useState(null)

  const [ tipoDeDocumentoExterno,setTipoDeDocumentoExterno ] = useState(null)

  const [ step,setStep ] = useState(1);


  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep} tipoDeDocumento={tipoDeDocumento} setTipoDeDocumento={setTipoDeDocumento}tipoDeNota={tipoDeNota} setTipoDeNota={setTipoDeNota} setTipoDeDocumentoRelacionado={setTipoDeDocumentoRelacionado} tipoDeDocumentoRelacionado={tipoDeDocumentoRelacionado} vendedor={vendedor} setVendedor={setVendedor} condicionDePago={condicionDePago} setCondicionDePago={setCondicionDePago} centoBeneficio={centoBeneficio} setCentoBeneficio={setCentoBeneficio}/>
      
      case 2:
        return <SecondStep setStep={setStep} referenciaADocumentosExternos={referenciaADocumentosExternos} setReferenciaADocumentosExternos={setReferenciaADocumentosExternos} tipoDeDocumentoExterno={tipoDeDocumentoExterno} setTipoDeDocumentoExterno={setTipoDeDocumentoExterno}/>
      
      case 3:
        return <ThirdStep setStep={setStep} setVincularOT={setVincularOT} vincularOT={vincularOT} ordenDeTrabajoSelected={ordenDeTrabajoSelected} setOrdenDeTrabajoSelected={setOrdenDeTrabajoSelected} ordenesDeTrabajoList={ordenesDeTrabajoList} setOrdenesDeTrabajoList={setOrdenesDeTrabajoList}/>
        
      case 4:
        return <FourthStep setStep={setStep}/>

      
      
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/sale_invoices')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  ventas</span>
      </div>
      <h1>Agregar documento de venta</h1>
      {
        step === 6 ?
        <Success message={'Documento creado con éxito!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-4-steps'>
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
            {
              formSetupSteps()
            }
          </form>

        </PrincipalCard>
      }
    {
      /*
      <div className='row-test'>
        <h3 onClick={()=>{navigate('/sale_invoices')}} style={{color:"red"}}>Ventas</h3>
        <h3>Nueva Factura</h3>
      </div>
      <h3>Generar documento de venta</h3>
      <div>Formulario para generar un nuevo documento de venta</div>
      <form>
        <button>Previsualizar</button>
        <button>Crear</button>
      </form>
      
      */
    }
    </>
  )
}

export default NuevoDocumentoDeVenta