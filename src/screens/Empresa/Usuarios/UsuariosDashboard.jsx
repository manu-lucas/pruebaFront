import React, { useContext, useEffect, useState } from 'react'
import TableExample from '../../../components/Table/TableExample'
import UsuariosActivados from './UsuariosActivados';
import UsuariosDesactivados from './UsuariosDesactivados';
import axios from 'axios';
import { Back_URL } from '../../../utils/BackUrl';
import { AppContext } from '../../../context/AppContext';

const UsuariosDashboard = () => {
  //lista de subusuarios:
  const { subusuarios } = useContext(AppContext) 
  const [ layout,setLayout ] = useState(0);
  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <UsuariosActivados/>
      case 1:
        return <UsuariosDesactivados/>
    }
  }
  return (
    <>
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <button>reporte</button>
        <button>agregar</button>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button onClick={()=>{setLayout(0)}} className={layout === 0 ? 'btn-cta' : 'btn'}>ACTIVADO</button>
          <button onClick={()=>{setLayout(1)}} className={layout === 1 ? 'btn-cta' : 'btn'}>DESACTIVADO</button>
        </div>
        <input placeholder='buscar'/>
      </div>
      {
        subusuarios === null ?
        <div>Error en la carga de los datos</div>
        :
        <>{RenderPrincipalComponent()}</>
      }
      
    </>
  )
}

export default UsuariosDashboard