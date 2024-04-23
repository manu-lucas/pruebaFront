import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';

const NuevaODT = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Operaciones','/work_orders')
    setMenuOptions(updateData)
  }, [])


  return (
    <>
        <h3>Proyecto Nº 0000000 04/04/2024</h3>
        <div>Nueva orden de trabajo</div>
        <form>
            <button>CREAR</button>
        </form>
    </>
  )
}

export default NuevaODT