import React from 'react'
import TableExample from '../../../components/Table/TableExample'

const ListaDePreciosDashboard = () => {
  return (
    <>
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <button>agregar</button>
      </div>
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <input placeholder='buscar'/>
      </div>
      <TableExample/>
    </>
  )
}

export default ListaDePreciosDashboard