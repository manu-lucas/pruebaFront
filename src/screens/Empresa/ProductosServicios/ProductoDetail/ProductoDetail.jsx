import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContext'
import { updateSubMenuAsideOptions } from '../../../../utils/helpers'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getProductById } from '../../../../utils/api/Productos/getProductoById';
import { getProductoByIdFunction } from '../../../../utils/controllers/Productos/ProductoController';

const ProductoDetail = () => {
  
  const { userLoggedData,menuOptions,setMenuOptions } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();

  const [ product,setProduct ] = useState(null)
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa','/products')
    setMenuOptions(updateData)
  }, [])


  const [ loading,setLoading ] = useState(true)
  const [ error,setErrror ] = useState(false)

  useEffect(() => {
    getDataProduct()
  }, [])
  

  async function getDataProduct () {
    const response = await getProductoByIdFunction(userLoggedData.id,params.id,setErrror,setLoading);
    //console.log(response)
    response ? setProduct(response) : setProduct(null)
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
          <div>Error en la obtencion de los datos </div>
          :
          <>
            {
              
              product  === null?
              <>
                <div>No se encontro el producto</div>
              </>
              :
              <>
                <div className='row-test'>
                  <h2 style={{color:"red"}} onClick={()=>{navigate('/products')}}>Servicios</h2>
                  <h2>Información Detallada</h2>
                </div>
                <div onClick={()=>{navigate(`/products/${params.id}/edit`)}}>Editar</div>
                <div className='row-test' style={{alignItems:"flex-start"}}>
                  <div style={{height:90,width:90,borderRadius:"50%",border:"1px solid black"}}></div>
                  <div className='column-test'>
                    <h3>{product.nombre}</h3>
                    <div>
                      <span>Precio: </span>
                      <span>${product.precio}</span>
                    </div>
                  </div>
                </div>
                <h3>Campos Avanzados</h3>
                <div className='row-test'> 
                  <div>
                    <span>Codigo</span>
                    <span>Nmro</span>
                  </div>
                  <div>
                    <span>Codigo barra</span>
                    <span>Nmro</span>
                  </div>
                  <div>
                    <span>U. de medida</span>
                    <span>Nmro</span>
                  </div>
                  <div>
                    <span>Costo estimado</span>
                    <span>Nmro</span>
                  </div>
                </div>
                <div className='row-test'>
                  <div>
                    <span>Proveedor</span>
                    <span>No disponible</span>
                  </div>
                  <div>
                    <span>Manejo Stock</span>
                    <span>No</span>
                  </div>
                </div>
                <div className='row-test'>
                  <div>
                    <span>Notas</span>
                    <span> </span>
                  </div>
                </div>
              </>
              
            }
          </>
        }
      </>
    }
    </>
  )
}

export default ProductoDetail