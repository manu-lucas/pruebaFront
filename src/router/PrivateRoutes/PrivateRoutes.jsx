import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFoundScreen from '../../screens/NotFoundScreen'
import HomeScreen from '../../screens/Home/HomeScreen'
import PrivateStructure from '../../screens/Structure/PrivateStructure'
import ComercialRoutes from './ComercialRoutes/ComercialRoutes'
import OperacionesRoutes from './OperacionesRoutes/OperacionesRoutes'
import CalendarioRoutes from './CalendarioRoutes/CalendarioRoutes'
import AdministracionRoutes from './AdministracionRoutes/AdministracionRoutes'
import EmpresaRoutes from './EmpresaRoutes/EmpresaRoutes'
import { AppContext } from '../../context/AppContext'
import { getDataProveedores } from '../../utils/helpers'
import { fetchDataAfterLogin } from '../../utils/index.js'
import Profile from '../../screens/Profile/Profile.jsx'

const PrivateRoutes = () => {
  const [ loading,setLoading ] = useState(false)
  const [ error,setError ] = useState(false)
  const { 
    userLoggedData,
    setSubusuarios,
    setProveedores,
    setProducts,
    setClientes,
    //setError,
    //setLoading 
  } = useContext(AppContext);


  

  /*
  

  

  useEffect(() => {
    getData()
  }, [])



  async function getData (){
    try {
      const response = await fetchDataAfterLogin(userLoggedData.id)
      console.log(response)
      setProveedores(response.proveedoresData)
      setSubusuarios(response.usuariosData)
      setProducts(response.productosData)
      setClientes(response.clientesData)
      setError(false)
    } catch (err) {
      console.log(err)
      setError(true)
    }finally{
      setLoading(false)
    }
  }
  */

  return (
    <Routes>
      {
        loading === true ?
        <Route path='*' element={<PrivateStructure><div>Loading Screen</div></PrivateStructure>}/>
        :
        <>
          {
            error === true ?
            <Route path='*' element={<PrivateStructure><div>Error</div></PrivateStructure>}/>
            :
            <>
            <Route
              path='*'
              element={
                <Routes>
                  <Route path='/' element={<PrivateStructure><HomeScreen/></PrivateStructure>}/>
                  {/*GESTION*/}
                  {ComercialRoutes}
                  {/*ORDENES*/}           
                  {OperacionesRoutes}
                  {CalendarioRoutes}
                  {/*FINANZAS */}
                  {AdministracionRoutes}
                  {/*MI EMPRESA*/}
                  {EmpresaRoutes}
                  <Route path='/profile' element={<PrivateStructure><Profile/></PrivateStructure>}/>
                  <Route path='/login' element={<Navigate to='/'/>}/>
                  <Route path='*' element={<Navigate to="/not-found"/>}/>
                </Routes>
              }
            />
            <Route path='/not-found' element={<NotFoundScreen/>}/>            
            </>
          }
        </>
      }
    </Routes>
  )
}

export default PrivateRoutes