import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateDocumentosTributariosDash } from '../../../../utils/helpers';
import { AppContext } from '../../../../context/AppContext';
import { Button, ConfigProvider, DatePicker } from 'antd';
import SearchBtn from '../../../../components/Buttons/SearchBtn';
import Filter from '../../../../components/Filter/Filter';

const DocumetosTributariosDashboard = () => {

  const { setMenuOptions } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    const updateData = updateDocumentosTributariosDash()
    setMenuOptions(updateData)
  }, [])
  


  function newDispachDocument (){
    navigate('/dispach_documents/new')

  }

  return (
    <>
    <div className="principal-container-column">
        <div className='row-space-btw'>
          <h1>Documentos tributarios electrónicos</h1>
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
                <span>Ingreso masivo</span>
              </Button>
            </ConfigProvider>
            {/*-------------------*/}
          </div>
        </div>
        <Filter>
          <div className='filter-menu-item'>
            <DatePicker picker='week'/>
          </div>
        </Filter>
    </div>
    </>
  )
}

export default DocumetosTributariosDashboard