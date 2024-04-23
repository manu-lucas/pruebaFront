import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const NuevoDocumentoDeVenta = () => {

  const navigate = useNavigate()

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Administracion','/sale_invoices')
    setMenuOptions(updateData)
  }, [])

  return (
    <>
      <div className='row-test'>
        <h3 onClick={()=>{navigate('/sale_invoices')}} style={{color:"red"}}>Ventas</h3>
        <h3>Nueva Factura</h3>
      </div>
      <h3>Generar documento de venta</h3>
      <div>Formulario para generar un nuevo documento de venta</div>
      <form>
        <button>Previsualizar</button>
        <button>Crear</button>
      </form>
    </>
  )
}

export default NuevoDocumentoDeVenta