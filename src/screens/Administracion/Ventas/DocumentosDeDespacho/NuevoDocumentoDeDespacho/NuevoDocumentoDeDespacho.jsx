import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../../utils/helpers';

const NuevoDocumentoDeDespacho = () => {
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
        <h3 onClick={()=>{navigate('/shipping_invoices')}} style={{color:"red"}}>Documentos de despacho</h3>
        <h3>Nueva guía</h3>
      </div>
      <h3>Generar documento de despacho</h3>
      <div>Formulario para generar un nuevo documento de despacho</div>
      <form>
        <button>Previsualizar</button>
        <button>Crear</button>
      </form>
    </>
  )
}

export default NuevoDocumentoDeDespacho