import React, { useContext, useEffect, useState } from 'react'
import { updateSubMenuAsideOptions } from '../../../utils/helpers'
import { AppContext } from '../../../context/AppContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaDownload } from "react-icons/fa";
import ClientesActivados from './ClientesActivados';
import ClientesDesactivados from './ClientesDesactivados';


const ClientesDashboard = () => {
  const {menuOptions,setMenuOptions,clientes} = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  const [ layout,setLayout ] = useState(0);

  const [ loading,setLoading ] = useState(true)
  const [ error,setError ] = useState(false)
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Comercial',location.pathname)
    setMenuOptions(updateData)
  }, [])
  

  function RenderComponent () {
    switch (layout){
      case 0:
        return <ClientesActivados/>
      case 1:
        return <ClientesDesactivados/>
    }
  }

  return (
    <>
      <div className='row-space-btw-test'>
        <h3>Clientes</h3>
        <div className='row-test'>
          <FaDownload/>
          <button onClick={()=>{navigate('/clients/new')}}>Agregar</button>
        </div>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>ACTIVADO</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>DESACTIVADO</button>
        </div>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      <button onClick={()=>{navigate('/clients/detail/3')}}>Detalle cliente</button>
      {
        clientes === null ? 
        <div>Data no encontrada</div>
        :
        <>{RenderComponent()}</>
      }
      
    </>
  )
}

export default ClientesDashboard