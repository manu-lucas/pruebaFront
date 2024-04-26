import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import SelectComponent from '../../../../components/Select/SelectComponent'
import { DatePicker } from 'antd'

const EditarTransaccion = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='principal-container-column'>
        
        <div className='row' onClick={()=>{
          //navigate('/payment_groups')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}
          navigate('/bank/1')
        }}>
          <FaArrowLeftLong/>
          <span>Volver a detalle de cuenta</span>
        </div>
        
        <PrincipalCard>
          <div className='principal-container-column'>
            
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <h1>Editar transacción</h1>
            </div>


            <div className='form-grid'>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Movimiento <span style={{color:"red"}}>*</span></span>
                <SelectComponent/>
              </div>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Precio <span style={{color:"red"}}>*</span></span>
                <input style={{padding:8}} placeholder='Ingrese el precio'/>
              </div>
            </div>

            <div className='form-grid'>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Cuenta <span style={{color:"red"}}>*</span></span>
                <SelectComponent/>
              </div>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Cliente/Proveedor <span style={{color:"red"}}>*</span></span>
                <SelectComponent/>
              </div>
            </div>

            <div className='form-grid'>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
                <SelectComponent/>
              </div>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Número <span style={{color:"red"}}>*</span></span>
                <input style={{padding:8}} placeholder='Ingrese el precio'/>
              </div>
            </div>

            <div className='form-grid'>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Fecha transacción <span style={{color:"red"}}>*</span></span>
                <DatePicker picker='week'/>
              </div>
              <div className='column' style={{gap:5}}>
                <span className='form-label'>Glosa <span style={{color:"red"}}>*</span></span>
                <input style={{padding:8}} placeholder='Ingrese la glosa'/>
              </div>
            </div>


          </div>
        </PrincipalCard>

      </div>
    </>
  )
}

export default EditarTransaccion