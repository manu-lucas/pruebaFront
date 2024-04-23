import { Button } from 'antd';
import React from 'react'
import { FiFilter } from "react-icons/fi";
import { IoReloadOutline } from "react-icons/io5";


const Filter = ({children}) => {
  return (
    <div className='filter-menu'>
        <div className='filter-menu-item'>
          <FiFilter style={{fontSize:18}}/>
        </div>
        <div className='filter-menu-item'>
          <span>Filtrar</span>
        </div>
        {children}
        <div className='filter-menu-item'>
          <Button danger style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            <IoReloadOutline/>
            <span>Borrar filtros</span>
          </Button>
        </div>
    </div>
  )
}

export default Filter