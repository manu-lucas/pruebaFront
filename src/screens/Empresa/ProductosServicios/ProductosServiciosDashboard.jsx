import React, { useContext, useEffect, useState } from 'react'
import { MdUpload } from "react-icons/md";
import TableExample from '../../../components/Table/TableExample';
import PSActivados from './PSActivados';
import PSDesactivados from './PSDesactivados';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../context/AppContext';

const ProductosServiciosDashboard = () => {

  const { products } = useContext(AppContext)

  const navigate = useNavigate();
  
  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <PSActivados/>
      case 1:
        return <PSDesactivados/>
    }
  }


  return (
    <>
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <MdUpload/>
        <button onClick={()=>{navigate('/products/new')}}>agregar</button>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>Activado</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>Desactivado</button>
        </div>
        <input placeholder='buscar'/>
      </div>
      <>
        {
          products === null ?
          <div>Error en los datos</div>
          :
          <>{RenderPrincipalComponent()}</>
        }
      </>

    </>
  )
}

export default ProductosServiciosDashboard