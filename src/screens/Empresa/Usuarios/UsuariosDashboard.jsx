import React, { useContext, useEffect, useState } from 'react'
import TableExample from '../../../components/Table/TableExample'
import UsuariosActivados from './UsuariosActivados';
import UsuariosDesactivados from './UsuariosDesactivados';
import axios from 'axios';
import { Back_URL } from '../../../utils/BackUrl';
import { AppContext } from '../../../context/AppContext';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import Filter from '../../../components/Filter/Filter';
import { Button, Table } from 'antd';
import { FaFileDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UsuariosDashboard = () => {
  //lista de subusuarios:
  const { subusuarios } = useContext(AppContext)
  const navigate = useNavigate(); 
  const [ layout,setLayout ] = useState(0);
  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <UsuariosActivados/>
      case 1:
        return <UsuariosDesactivados/>
    }
  }
  return (
    <>
    <div className='principal-container-column'>

      <div className='row-space-btw'>
        <h1>Usuarios</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} />
        </div>
      </div>
      <div className='row-space-btw'>
        <Filter>

        </Filter>

        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
          <FaFileDownload/>
          <span>Descargar</span>
        </Button>
      </div>
      <div style={{width:"85%",margin:"0 auto"}}>
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
                <Button type='primary'  onClick={()=>{navigate(`/users/${record.key}`)}}>Ver</Button>
              ),
            }
          ]}
        />

      </div>
    </div>
    {
      /*
        <div className='row-test' style={{justifyContent:"flex-end"}}>
          <button>reporte</button>
          <button>agregar</button>
        </div>
        <div className='row-space-btw-test'>
          <div className='row-test'>
            <button onClick={()=>{setLayout(0)}} className={layout === 0 ? 'btn-cta' : 'btn'}>ACTIVADO</button>
            <button onClick={()=>{setLayout(1)}} className={layout === 1 ? 'btn-cta' : 'btn'}>DESACTIVADO</button>
          </div>
          <input placeholder='buscar'/>
        </div>
        {
          subusuarios === null ?
          <div>Error en la carga de los datos</div>
          :
          <>{RenderPrincipalComponent()}</>
        }
      */
    }
    </>
  )
}

export default UsuariosDashboard