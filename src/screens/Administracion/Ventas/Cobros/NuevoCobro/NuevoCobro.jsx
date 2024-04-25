import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import { updateCobrosDash } from '../../../../../utils/helpers';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../../components/Modals/Success';
import PrincipalCard from '../../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../../components/Select/SelectComponent';
import { DatePicker } from 'antd';
import CreateBtn from '../../../../../components/Buttons/CreateBtn';

const NuevoCobro = () => {

  const { setMenuOptions } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    const updateData = updateCobrosDash()
    setMenuOptions(updateData)
  }, [])
  
  const [step,setStep] = useState(1)

  function createCobro () {
    setStep(2)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }
  return (
    <>
      <div className='row' onClick={()=>{navigate('/sale_payment_groups')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a cobros</span>
      </div>
      <h1>Generar cobro</h1>
      {
        step === 2?
        <Success message={'Cobro generado con éxito! '}/>
        :
        <PrincipalCard>
          <form className='step-form'>
            <div className='principal-container-column'>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Banco <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Cuenta <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Tipo de movimiento <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}}/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Cliente <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Tipo <span style={{color:"red"}}>*</span></span>
                  <SelectComponent/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Número <span style={{color:"red"}}>*</span></span>
                  <input style={{padding:8}} placeholder='Ingrese  el número '/>
                </div>
              </div>

              <div className='form-grid'>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Glosa</span>
                  <input style={{padding:8}}/>
                </div>
                <div className='column' style={{gap:5}}>
                  <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
                  <DatePicker picker='week'/>
                </div>
              </div>


              <div className='container-item-flex-end' style={{marginTop:30}}>
                <CreateBtn label={'Generar cobro'} HanldeClick={createCobro}/>
              </div>



            </div>
          </form>
        </PrincipalCard> 
      }
    </>
  )
}

export default NuevoCobro