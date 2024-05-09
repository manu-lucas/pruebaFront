import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateSubMenuAsideOptions } from '../../../utils/helpers'
import { Button, DatePicker, Space, Table } from 'antd'
import { AppContext } from '../../../context/AppContext'
import { FaDownload } from "react-icons/fa";
import OrdenesDeTrabajoTodas from './OrdenesDeTrabajoTodas'
import OrdenesDeTrabajoPendientes from './OrdenesDeTrabajoPendientes'
import OrdenesDeTrabajoEnProceso from './OrdenesDeTrabajoEnProceso'
import OrdenesDeTrabajoFinalizadas from './OrdenesDeTrabajoFinalizadas'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn'
import SearchBtn from '../../../components/Buttons/SearchBtn'
import Filter from '../../../components/Filter/Filter'
import SelectComp from '../../../components/Select/SelectComp'
import { TableReusable } from '../../../components/Table/TableReusable'
const EnProcesoHeader = () => {
  return (
    <>
      <div style={{display:"flex",alignItems:"center",border:"1px solid black",boxSizing:"border-box",padding:"5px",gap:10}}>
          <FaDownload/>
          <span>REPORTE (en proceso)</span>
      </div>
    </>
  )
}

const FinalizadoHeader = () => {
  return (
    <>
      <div style={{display:"flex",alignItems:"center",border:"1px solid black",boxSizing:"border-box",padding:"5px",gap:10}}>
          <FaDownload/>
          <span>REPORTE (finalizado)</span>
      </div>
    </>
  )
}

const OrdenesDeTrabajoDashboard = () => {
  const {menuOptions,setMenuOptions,ordenesDeTrabajo} = useContext(AppContext);
  const [ layout,setLayout ] = useState(0);
  const navigate = useNavigate();

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/work_orders')
    setMenuOptions(updateData)
  }, [])
  function RenderHeaderComponent (){
    switch (layout){
      case 2:
        return <EnProcesoHeader/>
      case 3:
        return <FinalizadoHeader/>
      default:
        return <></>
    }
  }
  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <OrdenesDeTrabajoTodas/>
      case 1:
        return <OrdenesDeTrabajoPendientes/>
      case 2:
        return <OrdenesDeTrabajoEnProceso/>
      case 3:
        return <OrdenesDeTrabajoFinalizadas/>
    }
  }

  function newOT (){
    navigate('/work_orders/new')
  }


  function renderProducts (productsArray) {
    let char_product = '';
    productsArray.forEach(element => {
      char_product += `${element.nombre} , `
    });
    char_product = char_product.slice(0, -2)
    return char_product
    
  }



  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Órdenes de trabajo</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={newOT}/>
        </div>
      </div>
      <Filter>
        <div className='filter-menu-item'>
          <DatePicker picker="week" />
        </div>
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
            placeholder={'Mostrar'}
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
      <TableReusable
      dataSource={ordenesDeTrabajo}
      columns={
        [
          {
            title: 'N°',
            dataIndex: 'numero',
            key: 'numero',
          },
          {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Cliente',
            dataIndex: 'cliente',
            key: 'cliente',
          },
          {
            title: 'Producto/Servicio',
            dataIndex: 'product',
            key: 'product',
            render : (text,record) => (
              <>{renderProducts(record.productos_servicios.productos)}</>
            )
          },
          {
            title: 'Vendedor',
            dataIndex: 'vendedor',
            key: 'vendedor',
          },
          {
            title: 'Compromiso',
            dataIndex: 'compromiso',
            render : (text,record) => (
              <>-</>
            )
          },
          {
            title: 'Fecha',
            dataIndex: 'fechaOrden',
            key: 'fechaOrden',
            render : (text,record) => (
              <>{text.split("T")[0]}</>
            )
          },
          {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (text, record) => (
              <>
              {
                record.estado === 'Aceptado' ? 
                <div className='item-green'>Aceptado</div>
                :
                <>
                {
                  record.estado === 'En proceso' ?
                  <div className='item-yellow'>En proceso</div>
                  :
                  <div className='item-red'>Pendiente</div>

                }
                </>
              }
              </>
            ),
          },
        ]
      }
      onRowClick={false}
      />
    </div>
    {
      /*
      <div className='row-space-btw-test'>
        <h3>Ordenes de trabajo</h3>
        <div className='row-test'>
          <button onClick={()=>{navigate('/work_orders/new')}}>Agregar</button>
          {RenderHeaderComponent()}
        </div>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>TODOS</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>PENDIENTE</button>
          <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>EN PROCESO</button>
          <button className={layout === 3 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(3)}}>FINALIZADO</button>
        </div>
      </div>
      {RenderPrincipalComponent()}
      */
    }

    </>
  )
}

export default OrdenesDeTrabajoDashboard