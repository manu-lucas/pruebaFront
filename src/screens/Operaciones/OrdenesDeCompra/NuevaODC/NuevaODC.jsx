import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';

const NuevaODC = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate();
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Operaciones','/purchases')
    setMenuOptions(updateData)
  }, [])

  return (
    <>
      <div className='row-test'>
        <h3 onClick={()=>{navigate('/purchases')}} style={{color:"red"}}>Ordenes de compra</h3>
        <h3>Nueva Orden de compra</h3>
      </div>
      <h3>Orden de compra Nº 2 04/04/2024</h3>
      <div>Nueva orden de compra</div>
      <form>
        <button>CREAR</button>
      </form>
    </>
  )
}

export default NuevaODC