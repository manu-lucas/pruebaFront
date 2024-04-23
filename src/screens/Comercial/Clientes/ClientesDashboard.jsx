import React, { useContext, useEffect, useState } from 'react'
import { updateSubMenuAsideOptions } from '../../../utils/helpers'
import { AppContext } from '../../../context/AppContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaDownload, FaFileDownload, FaTrashAlt } from "react-icons/fa";
import ClientesActivados from './ClientesActivados';
import ClientesDesactivados from './ClientesDesactivados';
import { Button, Table } from 'antd';
import Filter from '../../../components/Filter/Filter';
import SelectComp from '../../../components/Select/SelectComp';
import { AiFillEdit } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import { FiDownload } from 'react-icons/fi';
import { GrDownload } from "react-icons/gr";
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';


const ClientesDashboard = () => {
  const {menuOptions,setMenuOptions,clientes} = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  const [ layout,setLayout ] = useState(0);

  const [ loading,setLoading ] = useState(true)
  const [ error,setError ] = useState(false)
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Comercial',location.pathname)
    setMenuOptions(updateData)
  }, [])
  

  function RenderComponent () {
    switch (layout){
      case 0:
        return <ClientesActivados/>
      case 1:
        return <ClientesDesactivados/>
    }
  }

  function newClient () {
    navigate('/clients/new')
  }

  return (
    <>
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h1>Clientes</h1>
        <div className='row'>
          <SearchBtn/>
          <AddMoreBtn label={'Agregar'} HanldeClick={newClient}/>
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
          <div className='filter-menu-item'>
            <SelectComp
              placeholder={'Credito'}
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
        <div className='row'>
          <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
            <GrDownload/>
            <span>Importar</span>
          </Button>
          <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
            <FaFileDownload/>
            <span>Descargar</span>
          </Button>
        </div>
      </div>
      <Table
          dataSource={[
            {
              key:1,
              nombre:'ALTA GESTIÓN EMPRESARIAL SPA',
              rut: '76.742.482 - 5',
              contacto:'ALTA GESTIÓN EMPRESARIAL SPA',
              telefono: '+54 243 2311990',
              credito: '$0000'
            },
            {
              key:2,
              nombre:'ALTA GESTIÓN EMPRESARIAL SPA',
              rut: '76.742.482 - 5',
              contacto:'ALTA GESTIÓN EMPRESARIAL SPA',
              telefono: '+54 243 2311990',
              credito: '$0000'
            },
            {
              key:3,
              nombre:'ALTA GESTIÓN EMPRESARIAL SPA',
              rut: '76.742.482 - 5',
              contacto:'ALTA GESTIÓN EMPRESARIAL SPA',
              telefono: '+54 243 2311990',
              credito: '$0000'
            },
            {
              key:4,
              nombre:'ALTA GESTIÓN EMPRESARIAL SPA',
              rut: '76.742.482 - 5',
              contacto:'ALTA GESTIÓN EMPRESARIAL SPA',
              telefono: '+54 243 2311990',
              credito: '$0000'
            }
          ]}
          columns={
            [
              {
                title: 'Razon social / Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
              },
              {
                title: 'Rut',
                dataIndex: 'rut',
                key: 'rut',
              },
              {
                title: 'Contacto',
                dataIndex: 'contacto',
                key: 'contacto',
              },
              {
                title: 'Telefono',
                dataIndex: 'telefono',
                key: 'telefono',
              },
              {
                title: 'Credito',
                dataIndex: 'credito',
                key: 'credito',
              },
              {
                title: '',
                render: (text, record) => (
                  <>
                    <Button onClick={()=>{navigate(`/clients/detail/${record.key}`)}}>Ver</Button>
                  </>
                ),
              }
            ]
          }
        />
    </div>

    {
      /*
      <div className='row-space-btw-test'>
        <h3>Clientes</h3>
        <div className='row-test'>
          <FaDownload/>
          <button onClick={()=>{navigate('/clients/new')}}>Agregar</button>
        </div>
      </div>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>ACTIVADO</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>DESACTIVADO</button>
        </div>
        <input placeholder='buscar' style={{padding:10}}/>
      </div>
      <button onClick={()=>{navigate('/clients/detail/3')}}>Detalle cliente</button>
      {
        clientes === null ? 
        <div>Data no encontrada</div>
        :
        <>{RenderComponent()}</>
      }
      */
    }
      
    </>
  )
}

export default ClientesDashboard