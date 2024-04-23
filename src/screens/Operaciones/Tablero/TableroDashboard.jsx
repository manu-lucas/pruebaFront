import React, { useContext, useEffect, useState } from 'react'
import { updateSubMenuAsideOptions } from '../../../utils/helpers'
import { AppContext } from '../../../context/AppContext'
import TableroTodos from './TableroTodos'
import TableroAceptados from './TableroAceptados'
import TableroEnProceso from './TableroEnProceso'
import TableroEnRevision from './TableroEnRevision';


const TableroDashboard = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const [ layout,setLayout ] = useState(0);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Operaciones','/work_orders/panel')
    setMenuOptions(updateData)
  }, [])
  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <TableroTodos/>
      case 1:
        return <TableroAceptados/>
      case 2:
        return <TableroEnProceso/>
      case 3:
        return <TableroEnRevision/>
    }
  }
  return (
    <>
      <div className='row-space-btw-test'>
        <h3>Tablero Producción</h3>
        <div className='row-test'>
          <button>Tags</button>
          <div>Icon1</div>
          <div>Icon2</div>
        </div>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>TODOS</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>ACEPTADO</button>
          <button className={layout === 2 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(2)}}>EN PROCESO</button>
          <button className={layout === 3 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(3)}}>EN REVISION</button>
        </div>
        <div>Config icon</div>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default TableroDashboard