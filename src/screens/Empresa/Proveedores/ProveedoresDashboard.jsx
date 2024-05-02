import React, { useContext, useEffect, useState } from 'react'
import TableExample from '../../../components/Table/TableExample'
import ProveedoresActivados from './ProveedoresActivados';
import ProveedoresDesactivados from './ProveedoresDesactivados';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import { Button, Table } from 'antd';

const ProveedoresDashboard = () => {
  
  const { proveedores } = useContext(AppContext);


  const navigate = useNavigate();
  
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <ProveedoresActivados/>
      case 1:
        return <ProveedoresDesactivados/>
    }
  }

  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Proveedores</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} />
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
                <Button type='primary'  onClick={()=>{console.log('ver')}}>Ver</Button>
              ),
            }
          ]}
        />

    </div>
    {
      /*
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <button onClick={()=>{navigate('/providers/new')}}>agregar</button>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button onClick={()=>{setLayout(0)}} className={ layout === 0 ? 'btn-cta' : 'btn' }>Activado</button>
          <button onClick={()=>{setLayout(1)}} className={ layout === 1 ? 'btn-cta' : 'btn' }>Desactivado</button>
        </div>
        <input placeholder='buscar'/>
      </div>
      {
        proveedores === null ?
        <div>Error al cargar los datos</div>
        :
        <>{RenderPrincipalComponent()}</>
      }
      
      
      */
    }
    </>
  )
}

export default ProveedoresDashboard