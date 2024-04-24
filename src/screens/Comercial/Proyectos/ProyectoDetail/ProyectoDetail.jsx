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


const Detalles = () =>{
  return(
    <PrincipalCard>
      <div className='column' style={{gap:30,boxSizing:"border-box"}}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end",fontSize:23,color:"grey"}}>
          <RiEdit2Fill/>
        </div>
        <div className='row-space-btw' style={{fontSize:20,color:"grey"}}>
          <span>N° 2297</span>
          <span>01/03/2023</span>
        </div>
        <h2>Comercializadora</h2>
        <h2>Datos principales</h2>
        <div className='proyectos-detail-grid-data'>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>Avenida 1193</span>
            <span>Dirección</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>email@mail.com</span>
            <span>Email</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>+5693165215</span>
            <span>N° de celular</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>Vendedor 1</span>
            <span>Vendedor</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>0</span>
            <span>Comisión</span>
          </div>
          <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
            <span className='proyectos-detail-grid-value'>4 cuotas</span>
            <span>Condición de pago</span>
          </div>
        </div>
        <h2>Ítems</h2>
        <Table
              dataSource={
                [
                  {
                    key: 1,
                    producto: `producto ${1}`,
                    cantidad: 1,
                    precio: 2300,
                    porcentaje: 0,
                    neto: 2450,
                    iva: 19,
                    total: 2600
                  }
                ]
              }
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
                  
                ]
              }
        />

        <div className='row-space-btw' style={{width:"90%",margin:"0 auto"}}>
          <div className='column'>
            <h3>Dirección de despacho</h3>
            <div className='row'>
              <span>Direccion:</span>
              <span>Una direc</span>
            </div>
            <div className='row'>
              <span>Comuna:</span>
              <span>Una comuna</span>
            </div>
            <div className='row'>
              <span>Ciudad:</span>
              <span>Una ciudad</span>
            </div>
          </div>
          <div className='column'>
            <h3>Plazo de entrega</h3>
            <div className='row'>
              <span>Días hábiles:</span>
              <span>6</span>
            </div>
            <div className='row'>
              <span>Fecha:</span>
              <span>07/03/2023</span>
            </div>
          </div>
        </div>
      </div>
    </PrincipalCard>
  )
}


const OrdenesDeTrabajo = () =>{
  return(
    <>
      <div className='proyectos-ot-new-bg'>
        <div className='proyectos-ot-new-container'>
            <h3>No hay órdenes de trabajo asociadas al proyecto</h3>
            <HiPlus className='proyectos-ot-new-icon'/>
            <h2>Agregar orden</h2>
        </div>
      </div>
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
  const navigate = useNavigate();
  const [ layout,setLayout ] = useState(0);

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión','/quotes')
    setMenuOptions(updateData)
  }, [])


  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <Detalles/>
      case 1:
        return <OrdenesDeTrabajo/>
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
    <div className='row-space-btw' style={{marginBottom:20}}>
      <div className='row'>
        <h1>Nombre Proyecto</h1>
        <div style={{borderRadius:3,padding:"3px 9px",width:"fit-content",color:"#00B69B",backgroundColor:"#00b69b3f",boxSizing:"border-box"}}>Aceptado</div>
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
  )
}

export default ProyectoDetail