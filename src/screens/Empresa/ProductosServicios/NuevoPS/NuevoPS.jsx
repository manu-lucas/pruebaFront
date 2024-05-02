import React, { useContext, useEffect, useState } from 'react'
import SelectComponent from '../../../../components/Select/SelectComponent'
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import axios from 'axios';
import SelectComp from '../../../../components/Select/SelectComp';
import { createProductFunction } from '../../../../utils';
import { FaArrowLeftLong, FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { Radio, Switch, Table } from 'antd';
import { MdImage } from 'react-icons/md';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';

const FirstStep = ({setStep,data,setData}) =>{
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,iva:e.target.value})
    setValue(e.target.value);

  };


  const onChange2 = (checked) => {
    console.log(`switch to ${checked}`);
    setData({...data,activo:checked})

  };


  return (
    <div className='principal-container-column'>

      <h2 style={{fontSize:20}}>Datos principales</h2>

      <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>
        <div className='column' style={{width:"fit-content",boxSizing:"border-box",alignItems:"center",padding:20,gap:20}}>
            <span style={{fontSize:20}}>Agregar imagen</span>
            <div className='profile-header-container'>              
              <div className='profile-img-container'>
                <MdImage/>
              </div>
            </div>
        </div>
      </div>

      <div className='form-grid'>
        <div className='row' style={{marginBottom:20}}>
          <span>Producto activo</span>
          <Switch defaultChecked onChange={onChange2} />
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} type='text' placeholder='Ingrese el nombre del producto' value={data.nombre} onChange={(e)=>{setData({...data,nombre:e.target.value})}}/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Precio sugerido</span>
          <input style={{padding:8}} placeholder='Ingrese el precio' type='number' onChange={(e)=>{setData({...data,precio:e.target.value})}}/>
        </div>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>IVA</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>

      

      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </div>
  )
}

const SecondStep = ({setStep,data,setData}) => {
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,exencion_valor:null,exencion_impuesto:e.target.value})
    setValue(e.target.value);
  };
  return (
    <div className='principal-container-column'>

      <div className='row' style={{alignItems:"center"}}>
        <h2 style={{fontSize:20}}>Campos avanzados</h2>
        <span>(Opcional)</span>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Código </span>
          <input style={{padding:8}} placeholder='Ingrese el código '
          value={data.codigo} onChange={(e)=>{setData({...data,codigo:e.target.value})}}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Código de barras</span>
          <input style={{padding:8}} placeholder='Ingrese el código ' 
          value={data.codigo_barra}
          onChange={(e)=>{setData({...data,codigo_barra:e.target.value})}}
          />
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Medidas</span>
          <input style={{padding:8}} placeholder='kg'
          value={data.unidad}
          onChange={(e)=>{setData({...data,unidad:e.target.value})}}
          />
        </div>
      </div>

      <div className='principal-grid grid-3-columns'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Costo estimado </span>
          <input style={{padding:8}} placeholder='Ingrese el código '
          value={data.costo}
          onChange={(e)=>{setData({...data,costo:e.target.value})}}
          />
        </div>
        
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Exención de impuestos</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

        <div></div>
      </div>
      {
        value === true ?
        <div className='principal-grid grid-3-columns'>
          <div></div>
          
          <div className='column' style={{gap:5}}>
            <span className='form-label'></span>
            <input style={{padding:8}} type='number' placeholder='%'
            value={data.exencion_valor}
            onChange={(e)=>{setData({...data,exencion_valor:e.target.value})}}
            />
          </div>

          <div></div>
        </div>
        
        :
        <></>
      }

      
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn setStep={setStep} value={3}/>
      </div>

    </div>
  )
}

const ThirdStep = ({setStep,data,setData,dataInitialState}) => {

  //stock
  const [value, setValue] = useState(null);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,manejo_stock:e.target.value,maximo_stock:null,minimo_stock:null,unidad_medida:''})
    setValue(e.target.value);
  };

  //disponible para venta
  const [value2, setValue2] = useState(null);
  const onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    setData({...data,disponibilidad:e.target.value})
    setValue2(e.target.value);
  };

  //vincular producto/servicio (lista)
  const [value3, setValue3] = useState(null);
  const onChange3 = (e) => {
    setPslist([])
    console.log('radio checked', e.target.value);
    setValue3(e.target.value);
  };

  const [ pslist,setPslist ] = useState([])


  function addProductoServicio (){
    setPslist([...pslist,{
      key:1+pslist.length,
      producto: `producto ${1+pslist.length}`,
      cantidad: 1,
      precio: 2300,
      porcentaje: 0,
      neto: 2450,
      iva: 19,
      total: 2600
    }])
  }

  function createProduct () {
    //setStep(4)
    //console.log(data)
    const dataRestructured = {
      ...data,
      
      costo: data.costo === null || data.costo.trim().replace(/\s/g, "") === "" ? null : parseFloat(data.costo),

      exencion_valor: data.exencion_valor === null || data.exencion_valor.trim().replace(/\s/g, "") === "" ? null : parseFloat(data.exencion_valor),
      
      precio: data.precio === null || data.precio.trim().replace(/\s/g, "") === "" ? null : parseFloat(data.precio),
      
      
      maximo_stock: data.maximo_stock === null || data.maximo_stock.trim().replace(/\s/g, "") === "" ? null : parseInt(data.maximo_stock),

      minimo_stock: data.minimo_stock === null || data.minimo_stock.trim().replace(/\s/g, "") === "" ? null : parseInt(data.minimo_stock),

    }
    console.log(dataRestructured)
    console.log('enviando datos')
    sendData(dataRestructured)

    /*
    setTimeout(() => {
      setStep(1)
      setData(dataInitialState)
    }, 2000); 
    */
  }

  const [ loading,setLoading ] = useState(false)
  const [ error,setErrror ] = useState(false)

  async function sendData (data) {
    
    const response = await createProductFunction(setLoading,setErrror,data)
    console.log(response)
    if( response ) {
      console.log('producto creado, respuesta:')
      console.log(response)
      /*
      setProducts([...products,response])
      setModalContent(
        <div>Producto creado</div>
      )
      setModal(true)
      */
    }else{
      console.log('error')
      /*
      setModalContent(
        <div>Hubo un error al crear el producto</div>
      )
      setModal(true)
    */
    }
    
  }

  return (
    <div className='principal-container-column'>

      <div className='row' style={{alignItems:"center"}}>
        <h2 style={{fontSize:20}}>Campos avanzados II</h2>
        <span>(Opcional)</span>
      </div>
      
      <div className='principal-grid grid-3-columns'>

        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Stock</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Disponible para venta</span>
          <Radio.Group onChange={onChange2} value={value2}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Vincular producto/servicio</span>
          <Radio.Group onChange={onChange3} value={value3}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>

      </div>
      <div className='principal-grid grid-3-columns'>
        {
          value === true ?
          <div className='column' style={{gap:20}}>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Mínimo</span>
              <input style={{padding:8}} type='number' placeholder='Ingrese el mínimo' value={data.minimo_stock} onChange={(e)=>{setData({...data,minimo_stock:e.target.value})}}/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Máximo</span>
              <input style={{padding:8}} placeholder='Ingrese el máximo' type='number' value={data.maximo_stock} onChange={(e)=>{setData({...data,maximo_stock: e.target.value})}}/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Proveedor</span>
              <SelectComponent/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Unidad de medida</span>
              <input style={{padding:8}} placeholder='Kg' value={data.unidad_medida} onChange={(e)=>{setData({...data,unidad_medida:e.target.value})}}/>
            </div>
            <div className='column' style={{gap:25}}>
              <span className='form-label'>Cantidad</span>
              <div className='principal-grid grid-3-columns' style={{fontSize:20}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>+</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>1</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>-</div>
              </div>
            </div>
            
          </div>
          :
          <div></div>
        }

        <div></div>
        {
          value3 === true ?
          <div className='column' style={{gap:20}}>
            {
              pslist.length === 0 ?
              <></>
              :
              <Table 
                columns={[
                  {
                    title: 'Producto/Servicio',
                    dataIndex: 'producto',
                    key: 'producto',
                  },
                  {
                    title: 'Cantidad',
                    dataIndex: 'cantidad',
                    key: 'cantidad',
                  },
                  {
                    title: '',
                    render: (text, record) => (
                      <FaRegTrashCan/>
                    ),
                  },
                ]}
                dataSource={pslist}
              />
            }
            <div className='container-item-flex-end'>
              <AddMoreBtn label={'Vincular otro'} HanldeClick={addProductoServicio}/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Producto/Servicio</span>
              <SelectComponent/>
            </div>
            <div className='column' style={{gap:25}}>
              <span className='form-label'>Cantidad</span>
              <div className='principal-grid grid-3-columns' style={{fontSize:20}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>+</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>1</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>-</div>
              </div>
            </div>
          </div>
          :
          <div></div>
        }
      </div>
      
      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas </span>
          <textarea style={{height:100}} value={data.notas} onChange={(e)=>{setData({...data,notas:e.target.value})}}/>
        </div>
        
      </div>

      
      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <CreateBtn label={'Crear producto'} HanldeClick={createProduct}/>
      </div>      


    </div>
  )
}

const NuevoPS = () => {
  /*
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
  */


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
    user: '1114ad52-f699-4eb8-9a08-ef9e61eaa42a',
    moneda: 1
  }

  const [ data,setData ] = useState(dataInitialState)

  const navigate = useNavigate();
  const [ step,setStep ] = useState(1)

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep} data={data} setData={setData}/>
      
      case 2:
        return <SecondStep setStep={setStep} data={data} setData={setData}/>
      
      case 3:
        return <ThirdStep setStep={setStep} data={data} setData={setData} dataInitialState={dataInitialState}/>
    }
  }
  
  
  return (
    <>
      <div className='row' onClick={()=>{navigate('/sale_invoices')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a productos</span>
      </div>
      <h1>Nuevo producto</h1>
      {
        step === 4 ?
        <Success message={'Producto creado con exito!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-3-steps'>
            <div className='step-container-item'>
              <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
              <div className='step-item-dot-cta' style={{left:-20}}>1</div>
              <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>

            </div>
            <div className='step-container-item'>
              <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
              <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
            </div>
            
          </div>
          <form className='step-form'>
            {formSetupSteps()}
          </form>
        </PrincipalCard>
      }
      {
        /*
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
        */
      }
    </>
  )
}

export default NuevoPS