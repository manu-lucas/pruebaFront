import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { updateCobrosDash } from '../../../../utils/helpers';
import SearchBtn from '../../../../components/Buttons/SearchBtn';
import { Button, ConfigProvider, DatePicker, Table } from 'antd';
import { IoFolder } from 'react-icons/io5';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { MdAttachMoney } from 'react-icons/md';
import Filter from '../../../../components/Filter/Filter';
import SelectComp from '../../../../components/Select/SelectComp';

const CobrosDashboard = () => {
  const { setMenuOptions } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    const updateData = updateCobrosDash()
    setMenuOptions(updateData)
  }, [])
  


  function newDispachDocument (){
    navigate('/dispach_documents/new')

  }


  return (
    <>
      <div className='principal-container-column'>

        <div className='row-space-btw'>
          <h1>Cobros</h1>
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
              <Button onClick={()=>{}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
                <MdAttachMoney style={{color:"#fffff"}}/>
                <span>Transacción masiva</span>
              </Button>
            </ConfigProvider>
            {/*-------------------*/}
            <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/sale_payment/new')}}/>
          </div>
        </div>
        
        <Filter>
            <div className='filter-menu-item'>
              <SelectComp
                placeholder={'Pendiente'}
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
                placeholder={'Tipo'}
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
              <DatePicker picker='week'/>
            </div>
            <div className='filter-menu-item'>
              <SelectComp
                placeholder={'Ver cobros'}
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
      </div>
    </>
  )
}

export default CobrosDashboard