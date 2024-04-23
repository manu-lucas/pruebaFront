import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import { AppContext } from '../../../context/AppContext';
import ComprasSection from './ComprasSection/ComprasSection';
import DTEPendientes from './DTEPendientes/DTEPendientes';


const ComprasHeaderComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='row-test'>
        <div>Ic 1</div>
        <button>REPORTE</button>
        <button onClick={()=>{navigate('/service_invoices/new')}}>AGREGAR</button>
      </div>
    </>
  )
}

const DTEPendientesHeader = () =>{
  return (
    <>
      <div className='row-test'>
        <div>Aceptar automaticamente</div>
        <button>INGRESO MASIVO</button>
      </div>
    </>
  )
}


const ComprasDashboard = () => {
  const {menuOptions,setMenuOptions} = useContext(AppContext);

  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    //seteo el path name
    set_path_name(location.pathname)
  }, [location]);

  const navigation = useNavigate()


  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Administracion','/service_invoices')
    setMenuOptions(updateData)
  }, [])
  

  function renderHeaderComponent () {
    switch (path_name) {
      case '/service_invoices':
        return <ComprasHeaderComponent/>
      case '/purchase_invoice_pendings':
        return <DTEPendientesHeader/>
    }
  }


  function RenderPrincipalComponent () {
    switch (path_name) {
      case '/service_invoices':
        return <ComprasSection/>
      case '/purchase_invoice_pendings':
        return <DTEPendientes/>
    }
  }

  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 className={ path_name === '/service_invoices' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/service_invoices')}}>Compras</h3>
          <h3 className={path_name === '/purchase_invoice_pendings' ? 'section-ttl-cta' : 'section-ttl'} onClick={()=>{navigation('/purchase_invoice_pendings')}}>DTE Pendientes</h3>
        </div>
        {renderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default ComprasDashboard