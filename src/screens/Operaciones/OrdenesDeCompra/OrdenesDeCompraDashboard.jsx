import { DatePicker, Space } from 'antd'
import React, { useContext, useEffect } from 'react'
import TableExample from '../../../components/Table/TableExample'
import { AppContext } from '../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../../components/Table/TableComponent';

const OrdenesDeCompraDashboard = () => {
  const {menuOptions,setMenuOptions,columns_purchases_table} = useContext(AppContext);
  const navigate = useNavigate()
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Operaciones','/purchases')
    setMenuOptions(updateData)
  }, [])


  const dataSource = [
    {
      key: '1',
      id:'1-ODC',
      proveedor: '-',
      documento: '1',
      date: '03/04/2024',
      neto: '$1233',
      bruto: '$1500',

    },
    
  ]


  return (
    <>
      <div className='row-space-btw-test'>
        <h3>Ordenes de Compra</h3>
        <div className='row-test'>
          <button>Reporte</button>
          <button onClick={()=>{navigate('/purchases/new')}}>Agregar</button>
        </div>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>

      <TableComponent dataSource={dataSource} columns={columns_purchases_table}/>
    </>
  )
}

export default OrdenesDeCompraDashboard