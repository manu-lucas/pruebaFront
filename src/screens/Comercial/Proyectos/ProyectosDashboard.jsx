import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaDownload } from "react-icons/fa";
import { AppContext } from '../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../utils/helpers';
import ProyectosLayout from './ProyectosLayout/ProyectosLayout';
import { Button, DatePicker, Space, Table } from 'antd';
import ConsultasLayout from './ConsultasLayout/ConsultasLayout';
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import SelectComponent from '../../../components/Select/SelectComponent';
import SelectComp from '../../../components/Select/SelectComp';
import { IoReloadOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaFileDownload } from "react-icons/fa";
import TableExample from '../../../components/Table/TableExample';
import PrincipalCard from '../../../components/Card/PrincipalCard';
import { CiFileOn } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { HiMiniUsers } from "react-icons/hi2";
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineFall } from "react-icons/ai";
import Filter from '../../../components/Filter/Filter'
import SearchBtn from '../../../components/Buttons/SearchBtn';
import AddMoreBtn from '../../../components/Buttons/AddMoreBtn';

const ProyectosHeader = () =>{
  const navigate = useNavigate()

  return (
    <>
      <div className='row-test'>
        <div style={{display:"flex",alignItems:"center",border:"1px solid black",boxSizing:"border-box",padding:"5px",gap:10}}>
          <FaDownload/>
          <span>REPORTE</span>
        </div>
        <button onClick={()=>{navigate('/quotes/new')}}>Agregar</button>
      </div>
    </>
  )
}


const ConsultasHeader = () =>{
  const navigate = useNavigate()
  return (
    <>
      <div className='row-test'>
        <button onClick={()=>{navigate('/quote_requests/new')}}>Agregar</button>
      </div>
    </>
  )
}


const ProyectosDashboard = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  const navigate = useNavigate()

  const location = useLocation();

  const [ path_name,set_path_name ] = useState('');

  useEffect(() => {
    set_path_name(location.pathname)
    console.log(location.pathname)
  }, [location]);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Gestión',location.pathname)
    setMenuOptions(updateData)
  }, [])
  

  const navigation = useNavigate();


  function renderHeaderComponent (){
    switch (path_name) {
      case '/quotes':
        return <ProyectosHeader/>
      case '/quote_requests':
        return <ConsultasHeader/>
    }
  }


  function renderPrincipalComponent (){
    switch (path_name) {
      case '/quotes':
        return <ProyectosLayout/>
      case '/quote_requests':
        return <ConsultasLayout/>
    }
  }



  function setNavigation (name){
    let updatedMenuOptions = menuOptions;
    updatedMenuOptions[1].submenuOptions.forEach((option, index) => {
      if (option.name === name) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
    setMenuOptions(updatedMenuOptions);
  }


  function newProject () {
    navigate('/quotes/new')
  }

  return (
    <>
    <div style={{marginBottom:"20px"}} className='row-space-btw'>
      <h1>Proyectos</h1>
      <div className='row'>
        <SearchBtn/>
        <AddMoreBtn label={'Agregar'} HanldeClick={newProject}/>
      </div>
    </div>
    <div style={{marginBottom:"20px"}} className='row-space-btw proyectos-filter-container'>
      <Filter>
        <div className='filter-menu-item'>
          <Space direction='vertical' size={12}>
            <DatePicker.RangePicker/>
          </Space>
        </div>
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
            placeholder={'Mostar'}
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
            placeholder={'Vendedor'}
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
        <FaFileDownload/>
        <span>Reporte</span>
      </Button>
    </div>
    <div style={{marginBottom:10}}>
      <Table
        dataSource={
          [ 
            {
              key:1,
              numero: 2297,
              name: 'Comercializadora',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              neto: 840,
              total:996,
              date:'26/03',
              estado: 'Aceptado'
            },
            {
              key:2,
              numero: 2297,
              name: 'Comercializadora',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              neto: 840,
              total:996,
              date:'26/03',
              estado: 'En proceso'
            },
            {
              key:3,
              numero: 2297,
              name: 'Comercializadora',
              client: 'Cristobal',
              product: 'Servicio tributario',
              vendedor: 'Cesar',
              neto: 840,
              total:996,
              date:'26/03',
              estado: 'Pendiente'
            }
            /*
            {
              key: '1',
              name: 'Mike',
              age: 32,
              address: '10 Downing Street',
            },
            {
              key: '2',
              name: 'John',
              age: 42,
              address: '10 Downing Street',
            },
            */
          ]
        }
        columns={
          [
            {
              title: 'N°',
              dataIndex: 'numero',
              key: 'numero',
            },
            {
              title: 'Nombre',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Cliente',
              dataIndex: 'client',
              key: 'client',
            },
            {
              title: 'Producto/Servicio',
              dataIndex: 'product',
              key: 'product',
            },
            {
              title: 'Vendedor',
              dataIndex: 'vendedor',
              key: 'vendedor',
            },
            {
              title: 'Neto',
              dataIndex: 'neto',
              key: 'neto',
              render: (text, record) => (
                <>{`$${record.neto}`}</>
              ),
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
              render: (text, record) => (
                <>{`$${record.total}`}</>
              ),
            },
            {
              title: 'Fecha',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Estado',
              dataIndex: 'status',
              key: 'status',
              render: (text, record) => (
                <>
                {
                  record.estado === 'Aceptado' ? 
                  <div className='item-green'>Aceptado</div>
                  :
                  <>
                  {
                    record.estado === 'En proceso' ?
                    <div className='item-yellow'>En proceso</div>
                    :
                    <div className='item-red'>Pendiente</div>

                  }
                  </>
                }
                </>
              ),
            },
            {
              title:'',
              render: (text, record) => (
                <Button type='primary'  onClick={()=>{navigate(`/quotes/${text.key}`)}}>Ver</Button>
              ),
            }
          ]
        }
      />
    </div>

    <PrincipalCard>
      <div className='row-space-btw-test'>
        <h2>Productividad</h2>
        <SelectComponent/>
      </div>
      <div className='productividad-grid'>

        <div className='column' style={{boxSizing:"border-box",padding:20,gap:16}}>
          <div className='row-space-btw-test'>
            <span className='productividad-item-ttl'>Proyectos</span>
            <div className='productividad-item-icon' style={{color:"#047679",backgroundColor:"#d0efeaaf"}}>
              <CiFileOn/>
            </div>
          </div>
          <span className='productividad-item-value'>1712</span>
          <div className='row productividad-item-analytic' style={{color:'#00B69B'}}>
            <AiOutlineRise/>
            <span>1274</span>
          </div>
        </div>
        
        <div className='column' style={{boxSizing:"border-box",padding:20,gap:16}}>
          <div className='row-space-btw-test'>
            <span className='productividad-item-ttl'>Conversiones</span>
            <div className='productividad-item-icon' style={{backgroundColor:"#FFFBDA",color:"#FFC300"}}>
              <TfiReload/>
            </div>
          </div>
          <span className='productividad-item-value'>1500</span>
          <div className='row productividad-item-analytic' style={{color:'#F93C65'}}>
            <AiOutlineFall/>
            <span>200</span>
          </div>
        </div>

        <div className='column' style={{boxSizing:"border-box",padding:20,gap:16}}>
          <div className='row-space-btw-test'>
            <span className='productividad-item-ttl'>Clientes nuevos</span>
            <div className='productividad-item-icon' style={{color:"#8280FF",backgroundColor:"#e5daff8a"}}>
              <HiMiniUsers/>
            </div>
          </div>
          <span className='productividad-item-value'>1711</span>
          <div className='row productividad-item-analytic' style={{color:'#00B69B'}}>
            <AiOutlineRise/>
            <span>1271</span>
          </div>
        </div>

      </div>
    </PrincipalCard>
    
    <PrincipalCard>
      <h2>Presupuesto</h2>
      <div className='presupuesto-bar-container'>
        TERMINAR ESTO
      </div>
    </PrincipalCard>
    
    </>
  )
}

export default ProyectosDashboard