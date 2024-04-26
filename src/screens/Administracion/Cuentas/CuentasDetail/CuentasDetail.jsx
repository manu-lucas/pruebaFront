import React, { useContext, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import { useNavigate } from 'react-router-dom'
import { AiFillEdit } from "react-icons/ai";
import { Button, ConfigProvider, DatePicker, Table } from 'antd';
import { AiOutlineLink } from "react-icons/ai";
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import Filter from '../../../../components/Filter/Filter';
import SelectComp from '../../../../components/Select/SelectComp';
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';


const CuentasDetail = () => {
  const navigate = useNavigate();

  function AddTransacion () {
    navigate('/transaction/new')
  }


  const {menuOptions,setMenuOptions} = useContext(AppContext);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/banks')
    setMenuOptions(updateData)
  }, [])



  return (
    <>
      <div className='principal-container-column'>
        <div className='row' onClick={()=>{
          //navigate('/payment_groups')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}
          navigate('/banks')
        }}>
          <FaArrowLeftLong/>
          <span>Volver a cuentas bancarias</span>
        </div>
        <PrincipalCard>
          <div className='principal-container-column'>
            <div className='container-item-flex-end'>
              <AiFillEdit style={{fontSize:24,color:"grey"}}/>
            </div>
            <div className='row-space-btw'>
              <h1>Nombre del banco</h1>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `#22D695`,
                      colorPrimaryHover: `#22D695`,
                      colorPrimaryActive: `#22D695`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button onClick={()=>{setStep(value)}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
                  <AiOutlineLink style={{color:"#fffff"}}/>
                  <span>Vincular fintoc</span>
                </Button>
              </ConfigProvider>
            </div>
            <div className='principal-grid grid-3-columns'>
              <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
                <span className='proyectos-detail-grid-value'>jsondg</span>
                <span>Código</span>
              </div>
              <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
                <span className='proyectos-detail-grid-value'>Activo circulante</span>
                <span>Tipo de cuenta</span>
              </div>
              <div className='column' style={{alignItems:"center",justifyContent:"center"}}>
                <span className='proyectos-detail-grid-value'>Automatic</span>
                <span>Documentos permitidos</span>
              </div>
            </div>
          </div>
        </PrincipalCard>
        <PrincipalCard>
          <div className='principal-container-column'>
            <div className='row-space-btw'>
              <h2>Transacciones</h2>
              <AddMoreBtn label={'Agregar'} HanldeClick={AddTransacion}/>
            </div>
          
            <Filter>
              <div className='filter-menu-item'>
                <DatePicker picker='week'/>
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
                      <AiFillEdit onClick={()=>{navigate('/transaction/edit/3')}} style={{cursor:"pointer"}}/>
                    ),
                  }
                ]
              }
            />

          </div>
        </PrincipalCard>
      </div>
    </>
  )
}

export default CuentasDetail