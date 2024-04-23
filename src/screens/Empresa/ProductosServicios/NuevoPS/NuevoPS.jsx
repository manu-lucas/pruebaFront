import React, { useContext, useEffect, useState } from 'react'
import SelectComponent from '../../../../components/Select/SelectComponent'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import axios from 'axios';
import SelectComp from '../../../../components/Select/SelectComp';
import { createProductFunction } from '../../../../utils';

const NuevoPS = () => {

  const { setModalContent,setModal,userLoggedData,menuOptions,setMenuOptions,proveedores,setProducts,products } = useContext(AppContext);

  const restructuredProveedores = proveedores.map((item)=>{
    return {...item, label: item.razon_social,value: item.razon_social }
  })

  const restructuredProductos = products.map((item)=>{
    return {...item, label: item.nombre, value: item.nombre}
  })

  const [ loading,setLoading ] = useState(false)
  const [ error,setErrror ] = useState(false)

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Mi Empresa','/products')
    setMenuOptions(updateData)
  }, [])

  const [ camposAvanzados,setCamposAvanzados ] = useState(false);

  const [ receta,setReceta ] = useState(false);

  const dataInitialState = {
    activo: true,
    codigo:'',
    codigo_barra:'',
    costo: null,
    disponibilidad: false,
    exencion_impuesto: false,
    exencion_valor: null,
    imagen: 'url',
    iva: false,
    manejo_stock:false,
    maximo_stock:null,
    minimo_stock:null,
    nombre: '',
    notas:'',
    precio: null,
    unidad:'',
    //es un int y no un string
    unidad_de_compra:null,
    unidad_medida:'',
    user: userLoggedData.id,
    moneda: 1
  }

  const [ data,setData ] = useState(dataInitialState)

  function HandleSubmit (e){
    e.preventDefault()
    console.log(data)
    const dataRestructured = {...data,precio:parseFloat(data.precio)}
    sendData(dataRestructured)
  }

  async function sendData (data){
    const response = await createProductFunction(setLoading,setErrror,data)
    console.log(response)
    if( response ) {
      
      setProducts([...products,response])
      setModalContent(
        <div>Producto creado</div>
      )
      setModal(true)
    }else{
      setModalContent(
        <div>Hubo un error al crear el producto</div>
      )
      setModal(true)
    }
  }

  return (
    <>
      {
        loading === true ?
        <div>Creando producto...</div>
        :
        <>
          {
            error === true ?
            <>
              <div>Error!</div>
              <button onClick={()=>{
                setData(dataInitialState)
                setErrror(false)
              }}>Volver a intentar</button>
            </>
            :
            <>
              <form onSubmit={HandleSubmit}>
                <div className='row-test'>
                  <label>Activo</label>
                  <input 
                    type='checkbox'
                    checked={data.activo === true}
                    onChange={() =>{setData({...data,activo:!data.activo})}}
                  />
                </div>
                <div className='row-test'>
                  <div className='column-test'>
                    <label>Nombre</label>
                    <input placeholder='Ej: Libreta' value={data.nombre} onChange={(e)=>{setData({...data,nombre:e.target.value})}}/>
                  </div>
                  <div className='column-test'>
                    <label>Precio sugerido</label>
                    <input type='number' placeholder='Ej.: 4839165' value={data.precio} onChange={(e)=>{setData({...data,precio:e.target.value})}}/>
                  </div>
                  <div className='row-test'>
                    <label>IVA Incluido</label>
                    <input 
                    type='checkbox'
                    checked={data.iva === true}
                    onChange={() =>{setData({...data,iva:!data.iva})}}
                    />
                  </div>
                </div>
                <div style={camposAvanzados === true ? {padding:"10px 25px",border:"1px solid green", textAlign:"center",cursor:"pointer",width:"fit-content",margin:"10px 0px",backgroundColor:"green",color:"white"} : {padding:"10px 25px",border:"1px solid green", textAlign:"center",cursor:"pointer",width:"fit-content",margin:"10px 0px",}} onClick={()=>{setCamposAvanzados(!camposAvanzados)}}>Campos avanzados</div>
                {
                  camposAvanzados === true ?
                  <>
                    <div className='row-test'>
                      <div className='column-test'>
                        <label>Código</label>
                        <input placeholder='Ej: 4839165' value={data.codigo} onChange={(e)=>{setData({...data,codigo:e.target.value})}}/>
                      </div>
                      <div className='column-test'>
                        <label>Código barra</label>
                        <input placeholder='Ej: 4839165' value={data.codigo_barra} onChange={(e)=>{setData({...data,codigo_barra:e.target.value})}}/>
                      </div>
                      <div className='column-test'>
                        <label>Un. medida</label>
                        <input placeholder='Ej: Kg.' value={data.unidad_medida} onChange={(e)=>{setData({...data,unidad_medida:e.target.value})}}/>
                      </div>
                      <div className='column-test'>
                        <label>Costo estimado</label>
                        <input type='number' value={data.costo} onChange={(e)=>{setData({...data,costo:e.target.value})}}/>
                      </div>
                      <div className='column-test'>
                        <label>Extension Impuesto</label>
                        <input
                        type='checkbox'
                        checked={data.exencion_impuesto === true}
                        onChange={() =>{setData({...data,exencion_impuesto: !data.exencion_impuesto})}}
                        />
                      </div>
                    </div>
                    <div className='row-test'>
                      <div className='column-test'>
                        <label>Manejo Stock</label>
                        <input 
                          type='checkbox'
                          checked={data.manejo_stock === true}
                          onChange={() =>{setData({...data,manejo_stock:!data.manejo_stock})}}
                        />
                      </div>
                      <div className='column-test'>
                        <label>Disponible para venta</label>
                        <input 
                          type='checkbox'
                          checked={data.disponibilidad === true}
                          onChange={()=>{setData({...data,disponibilidad:!data.disponibilidad})}}
                        />
                      </div>
                      <div style={{boxSizing:"border-box",border:"1px solid grey",padding:"10px"}}>
                        <div className='row-test'>
                          <label>Receta</label>
                          <input 
                            type='checkbox'
                            checked={receta === true}
                            onChange={() =>{setReceta(!receta)}}
                            />
                        </div>
                        {
                          receta === true ?
                          <>
                            <div className='row-test'>
                              <div className='column-test'>
                                <label>Producto</label>
                                <SelectComp placeholder={"seleccionar producto"} options={restructuredProductos}/>
                              </div>
                              <div className='column-test'>
                                <label>Cantidad</label>
                                <input type='number'/>
                              </div>
                            </div>
                          </>
                          :
                          <></>
                        }
                      </div>

                    </div>
                    {
                      data.manejo_stock === true ? 
                      <>
                        <div className='row-test'>
                          <div className='column-test'>
                            <label>Proveedor</label>
                            <SelectComp placeholder={"seleccionar proveedor"} options={restructuredProveedores}/>
                          </div>
                          <div className='column-test'>
                            <label>Maximo</label>
                            <input placeholder='0' value={data.maximo_stock} onChange={(e)=>{setData({...data,maximo_stock:e.target.value})}}/>
                          </div>
                          <div className='column-test'>
                            <label>Minimo</label>
                            <input placeholder='0' value={data.minimo_stock} onChange={(e)=>{setData({...data,minimo_stock:e.target.value})}}/>
                          </div>
                          <div className='column-test'>
                            <label>Un. medida compra</label>
                            <input placeholder='0' value={data.unidad_medida} onChange={(e)=>{setData({...data,unidad_medida: e.target.value})}}/>
                          </div>
                          <div className='column-test'>
                            <label>Cantidad / un. compra</label>
                            <input placeholder='0' value={data.unidad_de_compra} onChange={(e)=>{setData({...data,unidad_de_compra:e.target.value})}}/>
                          </div>
                        </div>
                        <textarea placeholder='nota' value={data.notas} 
                        onChange={(e)=>{
                          setData({...data,notas:e.target.value})
                        }}
                        />
                      </>
                      :
                      <></>
                    }
                    
                  </>
                  :
                  <></>
                }
                <button type='submit'>Crear</button>
              </form>
            </>
          }
        </>
      }
    </>
  )
}

export default NuevoPS