import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Back_URL } from '../../../../utils/BackUrl';
import { AppContext } from '../../../../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';

const UsuarioDetail = () => {
  const { userLoggedData,menuOptions,setMenuOptions } = useContext(AppContext);
  const navigate = useNavigate();
  const params = useParams();

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa','/users')
    setMenuOptions(updateData)
  }, [])

  const [ loading,setLoading ] = useState(true);
  const [ error,setError ] = useState(false);
  const [ errorMessage,setErrorMessage ] = useState('')

  const [ userData,setUserData ] = useState(null)
  const [ permisos,setPermisos ] = useState([])

  useEffect(() => {
    console.log('pedir data')
    //console.log(params.id)
    getUserData()
  }, [])

  async function getUserData () {
    try{
      //
      const response = await axios.get(`${Back_URL}/subuser/detail/${userLoggedData.id}/${params.id}`)
      console.log(response)
      //setError(false)
      if(response.data.data){
        //console.log('si se encontro el usuario')
        //console.log(response.data.data)
        console.log(response.data.data.permisos)
        setPermisos(response.data.data.permisos)
        setUserData(response.data.data)
        
        setError(false)
      }else{
        //console.log('no se encontro el usuario buscado')
        setErrorMessage('No se encontro el usuario buscado!')
        setError(true)
        setUserData(null)
      }
    }catch (err){
      //console.log(err)
      setErrorMessage('Algo salio mal!')
      setError(true)
    }finally{
      console.log('peticion finalizada')
      setLoading(false)
    }
  }
  
  return (
    <>
      {
        loading === true ?
        <div>Loading Screen</div>
        :
        <>
          {
            error === true ?
            <div>Error Screen {errorMessage}</div>
            :
            <>
            <div className='row-test' style={{alignItems:"flex-start"}}>
              <div style={{height:60,width:60,border:"2px solid black",borderRadius:"50%"}}></div>
              <div className='column-test'>
                <span>{userData.nombre} {userData.apellido}</span>
                <span>{userData.email}</span>
                <span>+ {userData.celular}</span>
                <span>Cargo: {userData.cargo}</span>
                <span>Fecha de nacimiento: {userData.fecha_de_nacimiento}</span>
                <span>Estado: Activo</span>
              </div>
              <button onClick={()=>{navigate(`/users/${userData.id}/edit`)}}>Editar</button>
            </div>
            <h3>Permisos</h3>
            {/*---------------*/}
            <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Inactivo</th>
                    <th>Solo ver</th>
                    <th>Administrar</th>
                    <th>Todo</th>
                    <th>Propietario</th>
                  </tr>
                </thead>
                      
                <tbody>
                  {
                    permisos.map((permiso,categoriaIndex)=>
                      <>
                        <tr>
                          <td style={{color:"red"}}>{permiso.categoria}</td>
                        </tr>
                        {
                                
                          permiso.subcategorias.map((subcategoria, subcategoriaIndex)=>
                          <tr>
                            <td>{subcategoria.nombre}</td>
                            {
                              
                              subcategoria.permiso.map((itemPermiso,optionIndex)=>
                                <td>
                                  <div style={itemPermiso.select === 0 ? {height:10,width:10,border:"1px solid black"} : {height:10,width:10,border:"1px solid green",backgroundColor:"green"}}></div>
                                </td>
                              )
                                    
                            }
                            {
                                    
                              subcategoria.visualizacion.map((itemPermiso,optionIndex)=>
                              <td>
                                {
                                  subcategoria.id !== 1  && subcategoria.id !== 2  &&  subcategoria.id !== 9?
                                  <></>
                                  :
                                  <div style={itemPermiso.select === 0 ? {height:10,width:10,border:"1px solid black"} : {height:10,width:10,border:"1px solid green",backgroundColor:"green"}}></div>

                                }
                              </td>
                            )
                                  
                            }
                          </tr>
                          )
                                
                        }
                      </>
                    )
                  }
                </tbody>
            </table>

            {/*---------------*/}
            <div style={{width:"100%"}}>
              <h3>Restriccion de descuentos</h3>
              <div className='row-space-btw-test'>
                <div className='column-test'>
                  <h4>Máximo dscto productos s/ inventario</h4>
                  <span>Sin restricción</span>
                </div>
                <div className='column-test'>
                  <h4>Máximo dscto productos c/ inventario</h4>
                  <span>Sin restricción</span>
                </div>
              </div>
            </div>
            <div style={{width:"100%"}}>
              <h3>Horario Usuario</h3>
              <div className='row-test'>
                <div>Lunes</div>
                <div>Martes</div>
                <div>Miercoles</div>
                <div>Jueves</div>
                <div>Viernes</div>
                <div>Sabado</div>
                <div>Domingo</div>
              </div>
            </div>
            </>
          }
        </>
      }
    </>
  )
}

export default UsuarioDetail