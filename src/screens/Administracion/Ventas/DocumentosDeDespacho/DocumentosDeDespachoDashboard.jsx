import { DatePicker, Space } from 'antd'
import React, { useContext } from 'react'
import TableExample from '../../../../components/Table/TableExample'
import { AppContext } from '../../../../context/AppContext'
import TableComponent from '../../../../components/Table/TableComponent'

const DocumentosDeDespachoDashboard = () => {
  const { column_shipping_invoices_table } = useContext(AppContext);
  const dataSource = [
    {
      key: '1',
      id:'N1',
      date: '10/04/2024',
      ot: 'N2331',
      cliente :'Pepito Juan',
      total_real : '$13221',
      total_orden: '$10200',
      unidades: 4,
      anular: ''
    }
  ]
  return (
    <>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker/>
        </Space>
      </div>
      <div style={{justifyContent:"flex-end"}} className='row-test'>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      <div>Documentos de despacho</div>
      <TableComponent dataSource={dataSource} columns={column_shipping_invoices_table}/>

    </>
  )
}

export default DocumentosDeDespachoDashboard