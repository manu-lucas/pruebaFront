import { Button, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { FaFileDownload, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { FaFile } from "react-icons/fa";
import { BsFillClipboard2Fill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import { AiFillEdit } from 'react-icons/ai'
import { RiEdit2Fill } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { CiSearch } from 'react-icons/ci'
import SelectComponent from '../../../../components/Select/SelectComponent'
import Filter from '../../../../components/Filter/Filter'
import SelectComp from '../../../../components/Select/SelectComp'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppContext } from '../../../../context/AppContext'
import { updateSubMenuAsideOptions } from '../../../../utils/helpers'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../../../../components/Loader/Loader'
import { TableReusable } from '../../../../components/Table/TableReusable'

const Detalles = ({project}) =>{

  const { condicionesDePago } = useContext(AppContext)
  
  useEffect(() => {
    //console.log(project.condicion_pago)
    //matchCondicionDePago (project.condicion_pago)
  }, [])

  function formatedDate (project) {
    const date = new Date(project.fecha.split("T")[0])

    return project.fecha.split("T")[0]
    //console.log(date.getDate())
  }

  function matchCondicionDePago (id) {
    const condicion = condicionesDePago.find((item)=>item.id === id)    
    let value;

    if(condicion.nombre === null){
      value = `${condicion.numero_dias} días`
    }else{
      value = condicion.nombre
    }

    return value
    
  }
  
  return(
    <PrincipalCard>
      <div className='column' style={{gap:30,boxSizing:"border-box"}}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end",fontSize:23,color:"grey"}}>
          <RiEdit2Fill/>
        </div>
        <div className='row-space-btw' style={{fontSize:20,color:"grey"}}>
          <span>N° {project.numero}</span>
          <span>{formatedDate(project)}</span>
        </div>
        <h2>{project.cliente.cliente.razon_social}</h2>
        <h2>Datos principales</h2>
        <div className='proyectos-detail-grid-data'>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.cliente.cliente.direccion} - {project.cliente.cliente.comuna} - {project.cliente.cliente.ciudad}</span>
            <span>Dirección</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.cliente.contactos[0].email}</span>
            <span>Email</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.cliente.contactos[0].celular}</span>
            <span>N° de celular</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.vendedor.replace(",", " ")}</span>
            <span>Vendedor</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{project.comision}</span>
            <span>Comisión</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>{ matchCondicionDePago (project.condicion_pago)}</span>
            <span>Condición de pago</span>
          </div>
        </div>
        <h2>Ítems</h2>
        <TableReusable
          columns={[
            {
              title: 'Producto/Servicio',
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
              dataIndex: 'porcentaje_descuento',
              key: 'porcentaje_descuento',
              
            },
            {
              title: 'Neto',
              dataIndex: 'precio',
              key: 'precio',
            },
            {
              title: 'IVA',
              render: (text,record) => (
                <>
                  {record.impuesto * 100}
                </>
              ),
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
            },
          ]}
          dataSource={project.productos_servicios.productos}
        />
        

        <div className='row-space-btw' style={{width:"90%",margin:"0 auto"}}>
          <div className='column'>
            <h3>Dirección de despacho</h3>
            <div className='row'>
              <span>Direccion:</span>
              <span>{project.cliente.puntos[0].direccion}</span>
            </div>
            <div className='row'>
              <span>Comuna:</span>
              <span>{project.cliente.puntos[0].comuna}</span>
            </div>
            <div className='row'>
              <span>Ciudad:</span>
              <span>{project.cliente.puntos[0].ciudad}</span>
            </div>
          </div>
          <div className='column'>
            <h3>Plazo de entrega</h3>
            <div className='row'>
              <span>Días hábiles:</span>
              <span>{project.plazo_de_entrega_dias}</span>
            </div>
            <div className='row'>
              <span>Fecha:</span>
              <span>{project.plazo_de_entrega.split("T")[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </PrincipalCard>
  )
}


const OrdenesDeTrabajo = ({project}) =>{
  return(
    <>
      
        {
          project.orden_trabajo === null? 
          <PrincipalCard>
            <div className='principal-container-column'>
              <div style={{width:"100%",display:"flex",justifyContent:"flex-end",fontSize:23,color:"grey"}}>
                <RiEdit2Fill/>
              </div>
              <div className='row-space-btw' style={{fontSize:20,color:"grey"}}>
                <span>N° {project.numero}</span>
                <span></span>
              </div>
            </div>
          </PrincipalCard>
          :
          <div className='proyectos-ot-new-bg'>
            <div className='proyectos-ot-new-container'>
                <h3>No hay órdenes de trabajo asociadas al proyecto</h3>
                <HiPlus className='proyectos-ot-new-icon'/>
                <h2>Agregar orden</h2>
            </div>
          </div>
        }
      
    </>
  )
}


const Costos = () =>{
  return(
    <>
      <div style={{width:"100%",display:"flex",justifyContent:"flex-end",gap:20,boxSizing:"border-box"}}>
        <Button style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <CiSearch/>
        </Button>
        <Button style={{display:"flex",alignItems:"center",justifyContent:"center",gap:15}}>
          <FaPlus/>
          <span>Agregar</span>
        </Button>
      </div>
      <Table
        dataSource={[
          {
            name:'Costo 1',
            cantidad:2,
            costo: 1300,
            total:3440
          },
          {
            name:'Costo 1',
            cantidad:2,
            costo: 1300,
            total:3440
          },
          {
            name:'Costo 1',
            cantidad:2,
            costo: 1300,
            total:3440
          }
        ]}
        columns={
          [
            {
              title: 'Nombre',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Cantidad',
              dataIndex: 'cantidad',
              key: 'cantidad',
            },
            {
              title: 'Costo unitario',
              dataIndex: 'costo',
              key: 'costo',
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
            },
            {
              title: '',
              render: (text, record) => (
                <div style={{display:"flex",alignItems:"center",gap:15}}>
                  <AiFillEdit style={{cursor:"pointer"}}/>
                  <FaTrashAlt style={{cursor:"pointer"}}/>
                </div>
              ),
            }
          ]
        }
      />

      <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
        <div style={{minWidth:200,padding:20,boxSizing:"border-box",backgroundColor:"#FFFFFF",borderRadius:10}} className='column'>
          <div className='row'>
            <span>Subtotal: </span>
            <span>20000</span>
          </div>
          <div className='row'>
            <span>IVA: </span>
            <span>20000</span>
          </div>
          <div className='row'>
            <span>Total: </span>
            <span>20000</span>
          </div>
        </div>
      </div>
    </>
  )
}


const Facturacion = () =>{
  return (
    <>
      <PrincipalCard>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end",fontSize:23,color:"grey",boxSizing:"border-box"}}>
          <RiEdit2Fill/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <h2>Datos de facturación</h2>

          <div className='proyectos-facturacion-grid-data'>
            
            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>Juan</span>
              <span>Nombre</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>email@mail.com</span>
              <span>Email</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>+5693165215</span>
              <span>N° de celular</span>
            </div>

          </div>

          <h2>Datos de despacho</h2>

          <div className='proyectos-facturacion-grid-data'>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>Juan</span>
              <span>Nombre</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>email@mail.com</span>
              <span>Email</span>
            </div>

            <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
              <span className='proyectos-detail-grid-value'>+5693165215</span>
              <span>N° de celular</span>
            </div>

          </div>

          <div className='row-space-btw' style={{padding:"0px 30px",boxSizing:"border-box"}}>

            <div className='column'>
              <span>-</span>
              <span>Dias habiles</span>
            </div>

            <div className='column'>
              <span>08/04/2023</span>
              <span>Fecha</span>
            </div>

          </div>
        </div>
      </PrincipalCard>
      <PrincipalCard>
        <div className='row-space-btw'>
          <h2>Monto a facturar</h2>
          <span className='proyecto-facturacion-monto-facturacion'>$75.000</span>
        </div>
      </PrincipalCard>
    </>
  )
}

const Tesoreria = () =>{
  return(
    <>
      <div className='row-space-btw' style={{marginBottom:20}}>
        <Filter>
          <div className='filter-menu-item'>
            <SelectComp
                placeholder={'Estado'}
                options={[
                  {
                    value: 'Aprobado',
                    label: 'Aprobado',
                  },
                  {
                    value: 'Pendiente',
                    label: 'Pendiente',
                  },
                  {
                    value: 'En proceso',
                    label: 'En proceso',
                  },
                ]}
            />
          </div>
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Tipo'}
              options={[
                {
                  value: 'Aprobado',
                  label: 'Aprobado',
                },
                {
                  value: 'Pendiente',
                  label: 'Pendiente',
                },
                {
                  value: 'En proceso',
                  label: 'En proceso',
                },
              ]}
            />
          </div>
        </Filter>
        <Button>
          Buscar
        </Button>
      </div>
      
      <Table
        dataSource={[]}
        columns={
          [
            {
              title: 'N°',
              dataIndex: 'number',
              key: 'number',
            },
            {
              title: 'Cliente',
              dataIndex: 'cliente',
              key: 'cliente',
            },
            {
              title: 'Vencimiento',
              dataIndex: 'vencimiento',
              key: 'vencimiento',
            },
            {
              title: 'Condicion',
              dataIndex: 'condicion',
              key: 'condicion',
            },
            {
              title: 'Mensaje',
              dataIndex: 'mensaje',
              key: 'mensaje',
            },
            {
              title: 'Bruto',
              dataIndex: 'bruto',
              key: 'bruto',
            },
            {
              title: 'Monto pendiente',
              dataIndex: 'monto pendiente',
              key: 'monto pendiente',
            },
            {
              title: 'Pendiente de deposito',
              dataIndex: 'pendiente',
              key: 'pendiente',
            },
          ]
        }
      />
    </>
  )
}


const ProyectoDetail = () => {
  const { proyectos,menuOptions,setMenuOptions } = useContext(AppContext)
  const navigate = useNavigate();

  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);
  
  const [ project,setProject ] = useState(null)

  const [ layout,setLayout ] = useState(0);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión','/quotes')
    setMenuOptions(updateData)
  }, [])

  const params = useParams()

  useEffect(() => {
    const findProyect = proyectos.find((item)=>item.id === params.id)
    console.log(params.id)
    console.log(findProyect)
  }, [])
  
  useEffect(() => {
    getData()
  }, [])
  

  /*Traer la data del proyecto*/
  async function getData (){
    try {
      const response = await axios.get(`https://appify-black-side.vercel.app/projects/project/${params.id}`)
      console.log(response)
      console.log(response.data.payload[0])
      setProject(response.data.payload[0])
      setError(false)
    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  /*Renderizado de la pantalla*/
  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <Detalles project={project}/>
      case 1:
        return <OrdenesDeTrabajo project={project}/>
      case 2:
        return <Costos/>
      case 3:
        return <Facturacion/>
      case 4:
        return <Tesoreria/>
      case 5:
        return <Navigate to='/clients/detail/1'/>
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/quotes')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver</span>
      </div>
    {
      loading === true ?
      <>
        <Loader/>
      </>
      :
      <>
        {
          error === true ?
          <div>Error!</div>
          :
          <>
            <div className='row-space-btw' style={{marginBottom:20}}>
              <div className='row'>
                <h1>{project.nombre}</h1>
                <div className={project.estado === 'Pendiente' ? 'item-red' : (project.estado === 'Aceptado' ? 'item-green' : 'item-yellow')}>{project.estado}</div>
              </div>
        
              <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
                <FaFileDownload/>
                <span>Reporte</span>
              </Button>
            </div>
            <div style={{width:"97%",margin:"0px auto"}}>
              <div className='row-space-btw proyectos-detail-header'>
                <div onClick={()=>{setLayout(0)}} className={layout === 0 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                  <FaFile/>
                  <span>Detalles</span>
                </div>
                <div onClick={()=>{setLayout(1)}} className={layout === 1 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                  <BsFillClipboard2Fill/>
                  <span>Ordenes de trabajo</span>
                </div>
                <div onClick={()=>{setLayout(2)}} className={layout === 2 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                  <FaMoneyBill/>
                  <span>Costos</span>
                </div>
                <div onClick={()=>{setLayout(3)}} className={layout === 3 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                  <FaFileInvoiceDollar/>
                  <span>Facturacion</span>
                </div>
                <div onClick={()=>{setLayout(4)}} className={layout === 4 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                  <RiBankFill/>
                  <span>Tesoreria</span>
                </div>
                <div onClick={()=>{setLayout(5)}} className={layout === 5 ? 'proyectos-detail-header-item proyectos-detail-header-item-cta row' : 'proyectos-detail-header-item row'}>
                  <FaUserAlt/>
                  <span>Cliente</span>
                </div>
              </div>
              {RenderPrincipalComponent()}
            </div>
          </>
        }
      </>
    }
    
    </>
  )
}

export default ProyectoDetail