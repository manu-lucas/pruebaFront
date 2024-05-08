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
import { TableReusable } from '../../../components/Table/TableReusable';


const ClientesDashboard = () => {
  const {menuOptions,setMenuOptions,clientes} = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();


  const [ layout,setLayout ] = useState(0);

  const [ loading,setLoading ] = useState(true)
  const [ error,setError ] = useState(false)
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión',location.pathname)
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

  const getRowClickPath = (record) => {
    return `/clients/detail/${record.cliente.id}`;
  };

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
      <TableReusable
        columns={[
          {
            title: 'Razon social / Nombre',
            dataIndex: 'razon_social',
            key: 'razon_social',
            render: (text,record) => (
              <>{record.cliente.razon_social}</>
            )
          },
          {
            title: 'Rut',
            dataIndex: 'rut',
            key: 'rut',
            render: (text,record) => (
              <>{record.cliente.rut}</>
            )
          },
          {
            title: 'Contacto',
            dataIndex: 'contacto',
            key: 'contacto',
            render: (text,record) => (
              <>{record.contactos.length == 0 ? '-' : record.contactos[0].nombre}</>
            )
          },
          {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
            render: (text,record) => (
              <>{record.contactos.length == 0 ? '-' : record.contactos[0].telefono}</>
            )
          },
          {
            title: 'Credito',
            dataIndex: 'linea_de_credito',
            key: 'linea_de_credito',
            render: (text,record) => (
              <>${record.cliente.linea_de_credito ? record.cliente.linea_de_credito : '0' }</>
            )
          },
          
        ]}
        dataSource={clientes}
        onRowClick={true} 
        getRowClickPath={getRowClickPath} 
      />
    </div>
      
    </>
  )
}

export default ClientesDashboard