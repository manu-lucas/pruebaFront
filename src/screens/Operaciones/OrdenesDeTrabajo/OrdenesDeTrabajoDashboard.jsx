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
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const [ layout,setLayout ] = useState(0);
  const navigate = useNavigate();

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Operaciones','/work_orders')
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
  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Órdenes de trabajo</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'}/>
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
      
      <Table
        dataSource={
          [ 
            {
              key:1,
              numero: 2297,
              name: 'Comercializadora',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              neto: 840,
              total:996,
              date:'26/03',
              estado: 'Aceptado'
            },
            {
              key:2,
              numero: 2297,
              name: 'Comercializadora',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              neto: 840,
              total:996,
              date:'26/03',
              estado: 'En proceso'
            },
            {
              key:3,
              numero: 2297,
              name: 'Comercializadora',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              neto: 840,
              total:996,
              date:'26/03',
              estado: 'Pendiente'
            }
            /*
            {
              key: '1',
              name: 'Mike',
              age: 32,
              address: '10 Downing Street',
            },
            {
              key: '2',
              name: 'John',
              age: 42,
              address: '10 Downing Street',
            },
            */
          ]
        }
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
              dataIndex: 'client',
              key: 'client',
            },
            {
              title: 'Producto/Servicio',
              dataIndex: 'product',
              key: 'product',
            },
            {
              title: 'Vendedor',
              dataIndex: 'vendedor',
              key: 'vendedor',
            },
            {
              title: 'Neto',
              dataIndex: 'neto',
              key: 'neto',
              render: (text, record) => (
                <>{`$${record.neto}`}</>
              ),
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
              render: (text, record) => (
                <>{`$${record.total}`}</>
              ),
            },
            {
              title: 'Fecha',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Estado',
              dataIndex: 'status',
              key: 'status',
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
            {
              title:'',
              render: (text, record) => (
                <Button type='primary'  onClick={()=>{navigate(`/quotes/${text.key}`)}}>Ver</Button>
              ),
            }
          ]
        }
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