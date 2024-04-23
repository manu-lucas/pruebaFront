import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectComponent from '../../../../components/Select/SelectComponent';
import ClienteResumen from './ClienteDeatilComponents/ClienteResumen';
import ClienteProyectos from './ClienteDeatilComponents/ClienteProyectos';
import ClienteFacturas from './ClienteDeatilComponents/ClienteFacturas';

const ResumenHeader = () => {
  return (
    <>
      <div className='row-test'>
        <button>NUEVO PROYECTO</button>
        <button>NUEVA FACTURA</button>
      </div>
    </>
  )
}



const ClienteDetail = () => {
  const navigate = useNavigate();
  const [ layout,setLayout ] = useState(0);

  function RenderHeaderComponent () {
    switch ( layout ) {
      case 0:
        return <ResumenHeader/>
      default:
        return <></>
    }
  }

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <ClienteResumen/>
      case 1: 
        return <ClienteProyectos/>
      case 2:
        return <ClienteFacturas/>
    }
  }


  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <h3 onClick={()=>{navigate('/clients/dashboard')}}>Clientes</h3>
          <h3>Información Detallada</h3>
        </div>
        <div className='row-test'>
          <SelectComponent/>
          <div>ic1</div>
          <button onClick={()=>{navigate('/clients/new')}}>AGREGAR</button>
        </div>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button onClick={()=>{setLayout(0)}}>RESUMEN</button>
          <button onClick={()=>{setLayout(1)}}>PROYECTOS</button>
          <button onClick={()=>{setLayout(2)}}>FACTURAS</button>
        </div>
        {RenderHeaderComponent()}
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default ClienteDetail