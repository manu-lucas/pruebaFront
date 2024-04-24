import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import CuentasBancarias from './CuentasBancarias/CuentasBancarias';
import Resultados from './Resultados/Resultados';
import BalanceDashboard from './Balance/BalanceDashboard';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import PrincipalCard from '../../../components/Card/PrincipalCard';

const CuentasBancariasHeader = () =>{
  return (
    <>
      <div>Config Icon</div>
    </>
  )
}

const ResultadosHeader = () =>{
  const { setModal,setModalContent } = useContext(AppContext);
  return (
    <>
      <div className='row-test'>
        <div>Config Icon</div>
        <button>REPORTES</button>
        <button onClick={()=>{
          setModal(true)
          setModalContent(
            <>
              <div>Registrar Nueva Cuenta</div>
            </>
          )
        }}>NUEVA CUENTA</button>
      </div>
    </>
  )
}

const BalanceHeader = () =>{
  const { setModal,setModalContent } = useContext(AppContext);

  return (
    <>
      <div className='row-test'>
        <div>Config Icon</div>
        <button>REPORTES</button>
        <button onClick={()=>{
          setModal(true)
          setModalContent(
            <>
              <div>Registrar Nueva Cuenta</div>
            </>
          )
        }}>NUEVA CUENTA</button>
      </div>
    </>
  )
}

const CuentasDashboard = () => {

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
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/banks')
    setMenuOptions(updateData)
  }, [])


  function RenderHeaderComponent () {
    switch (path_name){
      case '/banks':
        return <CuentasBancariasHeader/>
      case '/banks/results':
        return <ResultadosHeader/>
      case '/banks/balance':
        return <BalanceHeader/>
    }
  }


  function RenderPrincipalComponent () {
    switch (path_name){
      case '/banks':
        return <CuentasBancarias/>
      case '/banks/results':
        return <Resultados/>
      case '/banks/balance':
        return <BalanceDashboard/>
    }
  }

  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Cuentas</h1>
        <AddMoreBtn label={'Agregar'} HanldeClick={()=>{console.log('s')}}/>
      </div>
      <PrincipalCard>
        <div className='principal-container-column'>
          <div className='row-space-btw'>
            <h2>Flujo de caja</h2>
            <div className='row'>
              <span>Ingresos</span>
              <span>Egresos</span>
            </div>
          </div>
        </div>
      </PrincipalCard>
    </div>
    {
      /*
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 className={ path_name === '/banks' ? 'section-ttl-cta' : 'section-ttl' } onClick={()=>{navigation('/banks')}}>Cuentas bancarias</h3>
          <h3 className={ path_name === '/banks/results' ? 'section-ttl-cta' : 'section-ttl' } onClick={()=>{navigation('/banks/results')}}>Resultados</h3>
          <h3 className={ path_name === '/banks/balance' ? 'section-ttl-cta' : 'section-ttl' } onClick={()=>{navigation('/banks/balance')}}>Balance</h3>
        </div>
        {RenderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
      
      */
    }
    </>
  )
}

export default CuentasDashboard