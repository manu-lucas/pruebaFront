import React from 'react'
import TableExample from '../../../components/Table/TableExample'
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn'
import SearchBtn from '../../../components/Buttons/SearchBtn'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

const ListaDePreciosDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h1>Lista de precios</h1>
        <div className='row'>
          <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/price_lists/new')}}/>
        </div>
      </div>

      <Table
          dataSource={[
            {
              key:1,
              usuario: 'Nombre usuario',
              cargo:'Cargo',
              email:'email.example@gmail.com',
              activo: false
            },
            {
              key:2,
              usuario: 'Nombre usuario',
              cargo:'Cargo',
              email:'email.example@gmail.com',
              activo: true
            },
            {
              key:3,
              usuario: 'Nombre usuario',
              cargo:'Cargo',
              email:'email.example@gmail.com',
              activo: false
            },
            {
              key:4,
              usuario: 'Nombre usuario',
              cargo:'Cargo',
              email:'email.example@gmail.com',
              activo: true
            },
            {
              key:5,
              usuario: 'Nombre usuario',
              cargo:'Cargo',
              email:'email.example@gmail.com',
              activo: false
            },


          ]}
          columns={[
            {
              title: 'Usuario',
              dataIndex: 'usuario',
              key: 'usuario',
            },
            {
              title: 'Cargo',
              dataIndex: 'cargo',
              key: 'cargo',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Estado',
              dataIndex: 'activo',
              key: 'activo',
              render: (text, record) => (
                <>
                {
                  record.activo === true ? 
                  <div className='item-green'>Activo</div>
                  :
                  <div className='item-red'>No activo</div>
                }
                </>
              ),
            },
            {
              title:'',
              render: (text, record) => (
                <Button type='primary'  onClick={()=>{}}>Ver</Button>
              ),
            }
          ]}
        />


    </div>
      {
        /*
        <div className='row-test' style={{justifyContent:"flex-end"}}>
          <button>agregar</button>
        </div>
        <div className='row-test' style={{justifyContent:"flex-end"}}>
          <input placeholder='buscar'/>
        </div>
        <TableExample/>
        
        */
      }
    </>
  )
}

export default ListaDePreciosDashboard