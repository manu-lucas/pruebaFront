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
import { TableReusable } from '../../../components/Table/TableReusable';
import GraficoBarra from '../../../components/Bar/BarraProyectos';
import { color } from 'chart.js/helpers';

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

  const {menuOptions,setMenuOptions,proyectos,setProyectos} = useContext(AppContext);
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

  useEffect(() => {
    console.log(proyectos)
  }, [])
  

  function renderProducts (productsArray) {
    let char_product = '';
    productsArray.forEach(element => {
      char_product += `${element.nombre} , `
    });
    char_product = char_product.slice(0, -2)
    return char_product
    
  }
// Define cómo se debe redireccionar cuando se hace clic en una fila
const getRowClickPath = (record) => {
  return `/quotes/${record.id}`;
};

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

      <TableReusable
        dataSource={proyectos}
        columns={
          [
            {
              title: 'N°',
              dataIndex: 'numero',
              key: 'numero',
            },
            {
              title: 'Nombre',
              dataIndex: 'nombre',
              key: 'nombre',
            },
            {
              title: 'Cliente',
              dataIndex: 'cliente',
              key: 'cliente',
            },
            {
              title: 'Producto/Servicio',
              dataIndex: 'product',
              key: 'product',
              width:200,
              render: (text, record) => (
                <>{renderProducts(record.productos_servicios.productos)}</>
              )
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
                <>{`$${record.neto.toFixed(2)}`}</>
              ),
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
              render: (text, record) => (
                <>{`$${record.total.toFixed(2)}`}</>
              ),
            },
            {
              title: 'Fecha',
              dataIndex: 'fecha',
              key: 'fecha',
              width: 130,
              render : (text, record) => (
                <>
                  {text.split("T")[0]}
                </>
              )
            },
            {
              title: 'Estado',
              dataIndex: 'estado',
              key: 'estado',
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
            // {
            //   title:'',
            //   render: (text, record) => (
            //     <Button type='primary'  onClick={()=>{navigate(`/quotes/${record.id}`)}}>Ver</Button>
            //   ),
            // }
          ]
        }
        onRowClick={true} 
        getRowClickPath={getRowClickPath} 
      />
     
    </div>

    <PrincipalCard>
      <div className='cardProductividad'>
        <div className='row-space-btw-test'>
          <h2>Productividad</h2>
          <SelectComponent/>
        </div>
        {/* Tarjetas proyectos */}
        <div className='productividadCards'>
          {/* prod card */}
          <div className='cardProdDetail'>
            <div className='proyectoProducHeader'>
              <h4>Proyectos</h4>
              <div className='productividad-item-icon'>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27 15.25C27.1381 15.25 27.25 15.3619 27.25 15.5V21.1471C27.25 21.5613 27.5858 21.8971 28 21.8971H32.5C32.6381 21.8971 32.75 22.009 32.75 22.1471V32C32.75 33.5188 31.5188 34.75 30 34.75H20C18.4812 34.75 17.25 33.5188 17.25 32V18C17.25 16.4812 18.4812 15.25 20 15.25H27Z" fill="#006F76"/>
              <path d="M29.0862 15.6384C28.9426 15.5225 28.75 15.6396 28.75 15.8241V20.1471C28.75 20.2851 28.8619 20.3971 29 20.3971H32.2983C32.416 20.3971 32.4903 20.273 32.4217 20.1774L29.4085 15.9795C29.3158 15.8504 29.2071 15.736 29.0862 15.6384Z" fill="#006F76"/>
              <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 24.7649V26.5299C0 39.2324 10.2975 49.5299 23 49.5299H25H27C39.7025 49.5299 50 39.2324 50 26.5299V24.7649V23C50 10.2975 39.7025 0 27 0H25H23C10.2975 0 0 10.2974 0 23V24.7649Z" fill="#6FE6D5"/>
              </svg>
            </div>
            </div>
            <div className='prodValue'>
              <span>1712</span>
            </div>
            <div className='prodAnalytic'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M16 6.52979L18.29 8.81979L13.41 13.6998L9.41 9.69979L2 17.1198L3.41 18.5298L9.41 12.5298L13.41 16.5298L19.71 10.2398L22 12.5298V6.52979H16Z" fill="#00B69B"/>
              </svg>
              <span>1274</span>
            </div>
          </div>
          {/* conversiones card */}
          <div className='cardProdDetail'>
            <div className='conversionesProducHeader'>
              <h4>Conversiones</h4>
              <div className='productividad-item-icon'>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 25V27C0 39.7025 10.2975 50 23 50H25H27C39.7025 50 50 39.7025 50 27V25V23C50 10.2975 39.7025 0 27 0H25H23C10.2975 0 0 10.2975 0 23V25Z" fill="#FFC300"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.2297 16.4382C15.6785 16.4382 16.0422 16.802 16.0422 17.2507V21.3132H20.1047C20.5535 21.3132 20.9172 21.677 20.9172 22.1257C20.9172 22.5745 20.5535 22.9382 20.1047 22.9382H15.2297C14.781 22.9382 14.4172 22.5745 14.4172 22.1257V17.2507C14.4172 16.802 14.781 16.4382 15.2297 16.4382Z" fill="#FFC300"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.2695 15.9937C22.4521 15.5034 23.7198 15.251 25 15.251C26.2803 15.251 27.548 15.5034 28.7306 15.9937C29.9132 16.4841 30.9876 17.2028 31.8922 18.1087C32.2092 18.4263 32.2089 18.9407 31.8913 19.2578C31.5738 19.5749 31.0594 19.5745 30.7423 19.2569C29.9886 18.5022 29.0935 17.9034 28.1082 17.4948C27.1229 17.0863 26.0667 16.876 25 16.876C23.9334 16.876 22.8772 17.0863 21.8919 17.4948C20.9066 17.9034 20.0115 18.5022 19.2578 19.2569L19.2565 19.2582L15.8034 22.7012C15.4856 23.018 14.9712 23.0173 14.6544 22.6995C14.3375 22.3817 14.3383 21.8673 14.6561 21.5504L18.1079 18.1087C18.1081 18.1085 18.1083 18.1083 18.1086 18.1081C19.013 17.2025 20.0872 16.484 21.2695 15.9937Z" fill="#FFC300"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M29.0828 27.8743C29.0828 27.4255 29.4465 27.0618 29.8953 27.0618H34.7703C35.219 27.0618 35.5828 27.4255 35.5828 27.8743V32.7493C35.5828 33.198 35.219 33.5618 34.7703 33.5618C34.3215 33.5618 33.9578 33.198 33.9578 32.7493V28.6868H29.8953C29.4465 28.6868 29.0828 28.323 29.0828 27.8743Z" fill="#FFC300"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M35.3457 27.3006C35.6626 27.6184 35.6618 28.1328 35.344 28.4496L31.8922 31.8913C31.892 31.8915 31.8918 31.8917 31.8916 31.8919C30.9871 32.7976 29.913 33.5161 28.7306 34.0063C27.548 34.4967 26.2803 34.7491 25 34.7491C23.7198 34.7491 22.4521 34.4967 21.2695 34.0063C20.0869 33.516 19.0125 32.7973 18.1079 31.8913C17.7908 31.5738 17.7912 31.0594 18.1088 30.7423C18.4263 30.4252 18.9407 30.4256 19.2578 30.7431C20.0115 31.4979 20.9066 32.0967 21.8919 32.5053C22.8772 32.9138 23.9334 33.1241 25 33.1241C26.0667 33.1241 27.1229 32.9138 28.1082 32.5053C29.0935 32.0967 29.9886 31.4979 30.7423 30.7431L34.1967 27.2989C34.5145 26.9821 35.0289 26.9828 35.3457 27.3006Z" fill="#FFC300"/>
                </svg>
              </div>
            </div>
            <div className='prodValue'>
              <span>1500</span>
            </div>
            <div className='prodAnalytic'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M16 6.52979L18.29 8.81979L13.41 13.6998L9.41 9.69979L2 17.1198L3.41 18.5298L9.41 12.5298L13.41 16.5298L19.71 10.2398L22 12.5298V6.52979H16Z" fill="#F93C65"/>
              </svg>
              <span style={{color:"#F93C65"}}>200</span>
            </div>
          </div>
          {/* card clientes */}
          <div className='cardProdDetail'>
            <div className='clienteProducHeader'>
              <h4>Clientes nuevos</h4>
              <div className='productividad-item-icon'>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 25V27C0 39.7025 10.2975 50 23 50H25H27C39.7025 50 50 39.7025 50 27V25V23C50 10.2975 39.7025 0 27 0H25H23C10.2975 0 0 10.2975 0 23V25Z" fill="#8280FF"/>
                <path opacity="0.587821" fillRule="evenodd" clipRule="evenodd" d="M17.2224 19.4444C17.2224 21.899 19.2123 23.8889 21.6669 23.8889C24.1215 23.8889 26.1113 21.899 26.1113 19.4444C26.1113 16.9898 24.1215 15 21.6669 15C19.2123 15 17.2224 16.9898 17.2224 19.4444ZM28.3335 23.8889C28.3335 25.7299 29.8259 27.2222 31.6668 27.2222C33.5078 27.2222 35.0002 25.7299 35.0002 23.8889C35.0002 22.048 33.5078 20.5556 31.6668 20.5556C29.8259 20.5556 28.3335 22.048 28.3335 23.8889Z" fill="#8280FF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M21.6482 26.1111C16.4022 26.1111 12.0981 28.8072 11.6675 34.1102C11.644 34.3991 12.1964 35 12.4751 35H30.8297C31.6644 35 31.6774 34.3283 31.6644 34.1111C31.3388 28.6591 26.9681 26.1111 21.6482 26.1111ZM31.2236 28.334C32.6182 30.1909 33.4445 32.4989 33.4445 35H37.7289C38.3317 35 38.3411 34.4962 38.3317 34.3333C38.0992 30.289 35.0086 28.3754 31.2236 28.334Z" fill="#8280FF"/>
              </svg>

              </div>
            </div>
            <div className='prodValue'>
              <span>1500</span>
            </div>
            <div className='prodAnalytic'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M16 6.52979L18.29 8.81979L13.41 13.6998L9.41 9.69979L2 17.1198L3.41 18.5298L9.41 12.5298L13.41 16.5298L19.71 10.2398L22 12.5298V6.52979H16Z" fill="#00B69B"/>
              </svg>
              <span>1274</span>
            </div>
          </div>
        </div>
        {/* presupuesto */}
        <div className='separador'></div>
        <div className="presupuesto">
            <h3 className='titlePresupuesto'>Presupuesto</h3>
            <div className='presupuesto-bar-container'>
              <GraficoBarra facturado={13} noFacturado={15} produccion={15} />
            </div> 
        </div>
      </div>
    </PrincipalCard>
    
    </>
  )
}

export default ProyectosDashboard