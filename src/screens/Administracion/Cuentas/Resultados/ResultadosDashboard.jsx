import React, { useContext, useEffect, useState } from 'react'
import SearchBtn from '../../../../components/Buttons/SearchBtn'
import { Button, ConfigProvider, DatePicker, Table } from 'antd'
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn'
import { LuFileStack } from "react-icons/lu";
import { updateResultsDash } from '../../../../utils/helpers';
import { AppContext } from '../../../../context/AppContext';
import Filter from '../../../../components/Filter/Filter';
import SelectComp from '../../../../components/Select/SelectComp';
import { FaFileDownload } from 'react-icons/fa';

const ResultadosDashboard = () => {

  const { setMenuOptions } = useContext(AppContext);

  useEffect(() => {
    const updateData = updateResultsDash()
    setMenuOptions(updateData)
  }, [])
  
  const [ layout,setLayout ] = useState(1);

  
  
  return (
    <>
      <div className='principal-container-column'>
        
          {
            layout === 1 ?
            <>
            <div className='row-space-btw'>
              <h1>Estado de resultados</h1>
              <div className='row'>
                <SearchBtn/>
                {/**Nuevo componente */}
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: `#00B69B`,
                        colorPrimaryHover: `#00B69B`,
                        colorPrimaryActive: `#00B69B`,
                        lineWidth: 0,
                      },
                    },
                  }}
                >
                  <Button onClick={()=>{setLayout(2)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
                    <LuFileStack style={{color:"#fffff"}}/>
                    <span>Asientos masivos</span>
                  </Button>
                </ConfigProvider>
                {/*-------------------*/}
                <AddMoreBtn label={'Agregar cuenta'} HanldeClick={()=>{console.log('click')}}/>
              </div>
            </div>
            <div className='row-space-btw'>
                <Filter>
                  <div className='filter-menu-item'>
                    <DatePicker picker='week'/>
                  </div>
                  <div className='filter-menu-item'>
                    <SelectComp
                      placeholder={'Periodo'}
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
                      placeholder={'Detalle'}
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
            <Table
              dataSource={
                [ 
                  {
                    key:1,
                    id: 2297,
                    proveedor: 'Proveedor',
                    date:'26/03',
                    documento: 'N° doc',
                    neto: 233,
                    bruto: 200,
                  },
                  {
                    key:2,
                    id: 2297,
                    proveedor: 'Proveedor',
                    date:'26/03',
                    documento: 'N° doc',
                    neto: 233,
                    bruto: 200,
                  },
                  {
                    key:3,
                    id: 2297,
                    proveedor: 'Proveedor',
                    date:'26/03',
                    documento: 'N° doc',
                    neto: 233,
                    bruto: 200,
                  },
                ]
              }
              columns={
                [
                  {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'Proveedor',
                    dataIndex: 'proveedor',
                    key: 'proveedor',
                  },
                  {
                    title: 'Documento',
                    dataIndex: 'documento',
                    key: 'documento',
                  },
                  {
                    title: 'Fecha',
                    dataIndex: 'date',
                    key: 'date',
                  },
                  {
                    title: 'Neto',
                    dataIndex: 'neto',
                    key: 'neto',
                  },
                  {
                    title: 'Bruto',
                    dataIndex: 'bruto',
                    key: 'bruto',
                  },
                  
                  {
                    title:'',
                    render: (text, record) => (
                      <Button type='primary'  onClick={()=>{navigate(`/`)}}>Ver</Button>
                    ),
                  }
                ]
              }
            />
            
            </>
            :
            <>
            <div className='row-space-btw'>
              <h1>Asientos masivos</h1>
              <div className='row'>
                <SearchBtn/>
                {/**Nuevo componente */}
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: `#00B69B`,
                        colorPrimaryHover: `#00B69B`,
                        colorPrimaryActive: `#00B69B`,
                        lineWidth: 0,
                      },
                    },
                  }}
                >
                  <Button onClick={()=>{setLayout(1)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
                    <LuFileStack style={{color:"#fffff"}}/>
                    <span>Estado de resultados</span>
                  </Button>
                </ConfigProvider>
                {/*-------------------*/}
                <AddMoreBtn label={'Agregar'} HanldeClick={()=>{console.log('click')}}/>
              </div>
            </div>
            <div className='row-space-btw'>
                <Filter>
                  <div className='filter-menu-item'>
                    <DatePicker picker='week'/>
                  </div>
                  <div className='filter-menu-item'>
                    <SelectComp
                      placeholder={'Periodo'}
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
                      placeholder={'Detalle'}
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

            <Table
              dataSource={
                [ 
                  {
                    key:1,
                    id: 2297,
                    proveedor: 'Proveedor',
                    date:'26/03',
                    documento: 'N° doc',
                    neto: 233,
                    bruto: 200,
                  },
                  {
                    key:2,
                    id: 2297,
                    proveedor: 'Proveedor',
                    date:'26/03',
                    documento: 'N° doc',
                    neto: 233,
                    bruto: 200,
                  },
                  {
                    key:3,
                    id: 2297,
                    proveedor: 'Proveedor',
                    date:'26/03',
                    documento: 'N° doc',
                    neto: 233,
                    bruto: 200,
                  },
                ]
              }
              columns={
                [
                  {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'Proveedor',
                    dataIndex: 'proveedor',
                    key: 'proveedor',
                  },
                  {
                    title: 'Documento',
                    dataIndex: 'documento',
                    key: 'documento',
                  },
                  {
                    title: 'Fecha',
                    dataIndex: 'date',
                    key: 'date',
                  },
                  {
                    title: 'Neto',
                    dataIndex: 'neto',
                    key: 'neto',
                  },
                  {
                    title: 'Bruto',
                    dataIndex: 'bruto',
                    key: 'bruto',
                  },
                  
                  {
                    title:'',
                    render: (text, record) => (
                      <Button type='primary'  onClick={()=>{navigate(`/`)}}>Ver</Button>
                    ),
                  }
                ]
              }
            />
            </>
          }
        </div>

      
    </>
  )
}

export default ResultadosDashboard