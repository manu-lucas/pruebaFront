import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FaDownload } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import DocumentosDeVentaDashboard from './DocumentosDeVenta/DocumentosDeVentaDashboard';
import DocumentosDeDespachoDashboard from './DocumentosDeDespacho/DocumentosDeDespachoDashboard';
import { AppContext } from '../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';

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

  const location = useLocation();
  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    set_path_name(location.pathname)
  }, [location]);

  const navigation = useNavigate()

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Administracion','/sale_invoices')
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

  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 onClick={()=>{navigation('/sale_invoices')}} className={path_name === '/shipping_invoices' ? 'section-ttl' : 'section-ttl-cta'}>Documentos de venta</h3>
          <h3 onClick={()=>{navigation('/shipping_invoices')}} className={path_name === '/shipping_invoices' ? 'section-ttl-cta' : 'section-ttl'}>Documentos de despacho</h3>
        </div>
        {renderHeaderComponent()}
      </div>
      {renderPrincipalComponent()}
    </>
  )
}

export default VentasDashboard