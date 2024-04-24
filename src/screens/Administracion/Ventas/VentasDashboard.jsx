import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FaDownload, FaFileDownload } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import DocumentosDeVentaDashboard from './DocumentosDeVenta/DocumentosDeVentaDashboard';
import DocumentosDeDespachoDashboard from './DocumentosDeDespacho/DocumentosDeDespachoDashboard';
import { AppContext } from '../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import { Button, ConfigProvider, DatePicker, Table } from 'antd';
import { IoFolder } from 'react-icons/io5';
import Filter from '../../../components/Filter/Filter';
import SelectComp from '../../../components/Select/SelectComp';
import PrincipalCard from '../../../components/Card/PrincipalCard';

const DocumentosDeVentaHeader = () =>{
  const navigate = useNavigate()
  return (
    <>
      <div className='row-test'>
        <MdOutlineUploadFile/>
        <div style={{display:"flex",alignItems:"center",border:"1px solid black",boxSizing:"border-box",padding:"5px",gap:10}}>
          <FaDownload/>
          <span>REPORTE</span>
        </div>
        <button onClick={()=>{navigate('/sale_invoices/new')}}>Agregar</button>
      </div>
    </>
  )
} 

const DocumentosDeDespachoHeader = () =>{
  const navigate = useNavigate()
  return (
    <>
      <div className='row-test'>
        <MdOutlineUploadFile/>
        <button onClick={()=>{navigate('/shipping_invoices/new')}}>Agregar</button>
      </div>
    </>
  )
}

const VentasDashboard = () => {
  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate()
  const location = useLocation();
  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    set_path_name(location.pathname)
  }, [location]);

  const navigation = useNavigate()

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/sale_invoices')
    setMenuOptions(updateData)
  }, [])
  



  function renderHeaderComponent (){
    switch (path_name) {
      case '/sale_invoices':
        return <DocumentosDeVentaHeader/>
      case '/shipping_invoices':
        return <DocumentosDeDespachoHeader/>
    }
  }

  function renderPrincipalComponent (){
    switch (path_name) {
      case '/sale_invoices':
        return <DocumentosDeVentaDashboard/>
      case '/shipping_invoices':
        return <DocumentosDeDespachoDashboard/>
    }
  }

  function newDDV () {
    navigate('/sale_invoices/new')
  }
  return (
    <>
      <div className='principal-container-column'>

        <div className='row-space-btw'>
          <h1>Ventas</h1>
          <div className='row'>
            <SearchBtn/>
            {/**Nuevo componente */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `#00B69B`,
                    colorPrimaryHover: `#00B69B`,
                    colorPrimaryActive: `#00B69B`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button onClick={()=>{setStep(value)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
                <IoFolder style={{color:"#fffff"}}/>
                <span>Gestionar documentos</span>
              </Button>
            </ConfigProvider>
            {/*-------------------*/}
            <AddMoreBtn label={'Agregar'} HanldeClick={newDDV}/>
          </div>
        </div>

        <div className='row-space-btw'>
          <Filter>
            <div className='filter-menu-item'>
              <SelectComp
                placeholder={'Emitido'}
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
            <div className='filter-menu-item'>
              <DatePicker picker='week'/>
            </div>
            <div className='filter-menu-item'>
              <SelectComp
                placeholder={'Vendedor'}
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
          <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
            <FaFileDownload/>
            <span>Reporte</span>
          </Button>
        </div>
        
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
                compromiso:null,
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
                compromiso:null,
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
                compromiso:null,
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
                title: 'Compromiso',
                dataIndex: 'compromiso',
                key: 'compromiso',
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
                  <Button type='primary'  onClick={()=>{console.log('agregar')}}>Ver</Button>
                ),
              }
            ]
          }
        />

        <div className='container-item-flex-end'>
          <div style={{minWidth:300,padding:30,borderRadius:20,backgroundColor:"white"}} className='column'>
            <h2>TOTAL</h2>
            <div className='row'>
              <span>Neto: </span>
              <span>$</span>
            </div>
            <div className='row'>
              <span>Bruto: </span>
              <span>$</span>
            </div>
          </div>
        </div>
      </div>
    {
      /*
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 onClick={()=>{navigation('/sale_invoices')}} className={path_name === '/shipping_invoices' ? 'section-ttl' : 'section-ttl-cta'}>Documentos de venta</h3>
          <h3 onClick={()=>{navigation('/shipping_invoices')}} className={path_name === '/shipping_invoices' ? 'section-ttl-cta' : 'section-ttl'}>Documentos de despacho</h3>
        </div>
        {renderHeaderComponent()}
      </div>
      {renderPrincipalComponent()}  
      */
    }
    </>
  )
}

export default VentasDashboard