import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';

const NuevoCliente = () => {

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Comercial','/clients/dashboard')
    setMenuOptions(updateData)
  }, [])


  return (
    <>  
        <div className='row-test'>
          <h3 onClick={()=>{navigate('/clients/dashboard')}} style={{color:"red"}}>Clientes</h3>
          <h3>Nuevo cliente</h3>
        </div>
        <form style={{display:"flex",flexDirection:"column"}}>
            <h3>Datos Generales</h3>

            <label>Razon social o nombre</label>
            <input style={{width:"300px"}}/>

            <label>RUT</label>
            <input style={{width:"300px"}}/>

            <label>Giro</label>
            <input style={{width:"300px"}}/>

            <label>Direccion</label>
            <input style={{width:"300px"}}/>

            <label>Comuna</label>
            <input style={{width:"300px"}}/>

            <label>Ciudad</label>
            <input style={{width:"300px"}}/>

            <h3>Contacto</h3>

            <label>Nombre</label>
            <input style={{width:"300px"}}/>

            <label>Email</label>
            <input style={{width:"300px"}}/>

            <label>Celular</label>
            <input style={{width:"300px"}}/>

            <label>Teléfono</label>
            <input style={{width:"300px"}}/>

            <label>Vendedor</label>
            <input style={{width:"300px"}}/>


            <button>EVIAR</button>    
        </form>
    </>
  )
}

export default NuevoCliente