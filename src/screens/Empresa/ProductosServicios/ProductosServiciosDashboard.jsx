import React, { useContext, useEffect, useState } from 'react'
import { MdUpload } from "react-icons/md";
import TableExample from '../../../components/Table/TableExample';
import PSActivados from './PSActivados';
import PSDesactivados from './PSDesactivados';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../context/AppContext';
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';
import Filter from '../../../components/Filter/Filter';
import { GrDownload } from 'react-icons/gr';
import { Button, Table } from 'antd';
import SelectComp from '../../../components/Select/SelectComp';

const ProductosServiciosDashboard = () => {

  const { products } = useContext(AppContext)

  const navigate = useNavigate();
  
  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout) {
      case 0:
        return <PSActivados/>
      case 1:
        return <PSDesactivados/>
    }
  }

  function newProduct () {
    navigate('/products/new')
  }
  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Productos</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'}  HanldeClick={newProduct}/>
        </div>
      </div>
      <div className='row-space-btw'>
        <Filter>
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Estado'}
              options={[
                {
                  value: 'Aprobado',
                  label: 'Aprobado',
                },
                {
                  value: 'Pendiente',
                  label: 'Pendiente',
                },
                {
                  value: 'En proceso',
                  label: 'En proceso',
                },
              ]}
            />
          </div>
        </Filter>
        <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
          <GrDownload/>
          <span>Importar</span>
        </Button>
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
                <Button type='primary'  onClick={()=>{navigate(`/products/:${record.key}`)}}>Ver</Button>
              ),
            }
          ]}
        />

    </div>
    {
      /*
      <div className='row-test' style={{justifyContent:"flex-end"}}>
        <MdUpload/>
        <button onClick={()=>{navigate('/products/new')}}>agregar</button>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>Activado</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>Desactivado</button>
        </div>
        <input placeholder='buscar'/>
      </div>
      <>
        {
          products === null ?
          <div>Error en los datos</div>
          :
          <>{RenderPrincipalComponent()}</>
        }
      </>
      
      */
    }

    </>
  )
}

export default ProductosServiciosDashboard