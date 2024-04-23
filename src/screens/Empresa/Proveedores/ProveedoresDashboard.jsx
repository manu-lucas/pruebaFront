import React, { useContext, useEffect, useState } from 'react'
import TableExample from '../../../components/Table/TableExample'
import ProveedoresActivados from './ProveedoresActivados';
import ProveedoresDesactivados from './ProveedoresDesactivados';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProveedoresDashboard = () => {
  
  const { proveedores } = useContext(AppContext);


  const navigate = useNavigate();
  
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <ProveedoresActivados/>
      case 1:
        return <ProveedoresDesactivados/>
    }
  }

  return (
    <>
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <button onClick={()=>{navigate('/providers/new')}}>agregar</button>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button onClick={()=>{setLayout(0)}} className={ layout === 0 ? 'btn-cta' : 'btn' }>Activado</button>
          <button onClick={()=>{setLayout(1)}} className={ layout === 1 ? 'btn-cta' : 'btn' }>Desactivado</button>
        </div>
        <input placeholder='buscar'/>
      </div>
      {
        proveedores === null ?
        <div>Error al cargar los datos</div>
        :
        <>{RenderPrincipalComponent()}</>
      }
      
    </>
  )
}

export default ProveedoresDashboard