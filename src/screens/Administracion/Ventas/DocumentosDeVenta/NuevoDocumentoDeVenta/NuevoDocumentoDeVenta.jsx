import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Success from '../../../../../components/Modals/Success';
import PrincipalCard from '../../../../../components/Card/PrincipalCard';
import SelectComponent from '../../../../../components/Select/SelectComponent';
import { DatePicker, Radio, Table } from 'antd';
import FollowingBtn from '../../../../../components/Buttons/FollowingBtn';
import FormerBtn from '../../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../../components/Buttons/CreateBtn';
import AddMoreBtn from '../../../../../components/Buttons/AddMoreBtn';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

/*STEPS*/

const FirstStep = ({setStep}) =>{
  return(
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Información de documento</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° de documento</span>
          <input style={{padding:8}} placeholder='Ingrese el número del documento'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='week'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Destinatario <span style={{color:"red"}}>*</span></span>
          <input style={{padding:8}} placeholder='Ingrese el nombre del destinatario'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Vendedor <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Condición de pago</span>
          <SelectComponent/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Centro de beneficio</span>
          <SelectComponent/>
        </div>
      </div>


      <div className='container-item-flex-end' style={{marginTop:30}}>
        <FollowingBtn setStep={setStep} value={2}/>
      </div>

    </div>
  )
}

const SecondStep = ({setStep}) =>{

  return(
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Información de documento</h2>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de nota de crédito <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Tipo de documento relacionado <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>N° de documento relacionado </span>
          <input style={{padding:8}} placeholder='Ingrese el número del documento'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Motivo de referencia </span>
          <input style={{padding:8}} placeholder='Ingrese el motivo del documento'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='week'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Centro de beneficio </span>
          <SelectComponent/>
        </div>
      </div>


      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={1}/>
        <FollowingBtn setStep={setStep} value={3}/>
      </div>

    </div>
  )
}

const ThirdStep = ({setStep}) =>{
  const [value, setValue] = useState(null);
  const [ pslist,setPslist ] = useState([])

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    if(e.target.value === 2){
      setPslist([])
    }
    setValue(e.target.value);
  };





  function addDocumentoDeVenta (){
    setPslist([...pslist,{
      key:1+pslist.length,
      tipo: 'Tipo de documento de venta',
      fecha: '02/02/2024',
      folio: '2234',
      razon: 'razon',
    }])
  }

  return(
    <div className='principal-container-column'>
      <div className='row-space-btw'>
        <h2 style={{fontSize:20}}>Documentos externos</h2>
        {
          value === 1 ?
          <AddMoreBtn label={'Nueva referencia'} HanldeClick={addDocumentoDeVenta}/>
          :
          <></>
        }
      </div>

      {
        value === 1 ?
        <>
        {
          pslist.length === 0 ?
          <></>
          :
          <>
            <h2>Items</h2>
            <div style={{width:"100%",alignItems:"center"}}>
              <Table
                dataSource={pslist}
                columns={
                  [
                    {
                      title: 'Tipo',
                      dataIndex: 'tipo',
                      key: 'tipo',
                    },
                    {
                      title: 'Fecha',
                      dataIndex: 'fecha',
                      key: 'fecha',
                    },
                    {
                      title: 'Folio',
                      dataIndex: 'folio',
                      key: 'folio',
                    },
                    {
                      title: 'Razón',
                      dataIndex: 'razon',
                      key: 'razon',
                    },
                    {
                      title: 'Acciones',
                      key: 'actions',
                      render: (text, record) => (
                        <div style={{display:"flex",alignItems:"center",gap:15}}>
                          <AiFillEdit style={{cursor:"pointer"}}/>
                          <FaTrashAlt style={{cursor:"pointer"}}/>
                        </div>
                      ),
                  },
                  ]
                }
              />
              
            </div>
          </>

        }
        </>
        :
        <></>
      }

      <div className='form-grid'>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Referencia a documentos externos</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Si</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
      </div>

      {
        value === 1?
        <>
          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Tipo de documento <span style={{color:"red"}}>*</span></span>
              <SelectComponent/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Fecha <span style={{color:"red"}}>*</span></span>
              <DatePicker picker='week'/>
            </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Folio <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}} placeholder='Ingrese el nombre'/>
            </div>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Razón </span>
              <input style={{padding:8}} placeholder='Ingrese la razón'/>
            </div>
          </div>

        </>
        :
        <>
        
        </>
      }

      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={2}/>
        <FollowingBtn setStep={setStep} value={4}/>
      </div>
    </div>
  )
}


const FourthStep = ({setStep}) =>{
  const [value, setValue] = useState(1);

  const [ pslist,setPslist ] = useState([])


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setPslist([])
    setValue(e.target.value);
  };



  function addOT (){
    setPslist([...pslist,{
      key:1+pslist.length,
      ot: 'N-1232',
      id: '12388',
      producto: 'Producto 1',
      cantidad: 1,
      porcentaje: 0,
      neto:1400,
      bruto:1400
    }])
  }

  function addItem (){
    setPslist([...pslist,{
      key:1+pslist.length,
      cod: '12388',
      nombre: 'Nombre',
      cantidad: 1,
      porcentaje: 0,
      neto:1400,
      bruto:1400
    }])
  }



  return(
    <div className='principal-container-column'>
      
      <div className='row-space-btw'>
        <div className='row'>
          <h2 style={{fontSize:20}}>Orden de trabajo</h2>
          <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
            <FiDownload />
          </div>
        </div>
        {
          value === 1 ?
          <AddMoreBtn label={'Vincular nueva'} HanldeClick={addOT}/>
          :
          <AddMoreBtn label={'Vincular nueva'} HanldeClick={addItem}/>

        }
      </div>
      {
        pslist.length === 0 ?
        <></>
        :
        <>
          {
            value === 1?
            <>
              <h2>Ítems</h2>
              <div style={{width:"100%",alignItems:"center"}}>
                <Table
                  dataSource={pslist}
                  columns={
                    [
                      {
                        title: 'Orden de trabajo',
                        dataIndex: 'ot',
                        key: 'ot',
                      },
                      {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                      },
                      {
                        title: 'Producto/Servico',
                        dataIndex: 'producto',
                        key: 'producto',
                      },
                      {
                        title: 'Cantidad',
                        dataIndex: 'cantidad',
                        key: 'cantidad',
                      },
                      {
                        title: '%',
                        dataIndex: 'porcentaje',
                        key: 'porcentaje',
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
                        title: 'Acciones',
                        key: 'actions',
                        render: (text, record) => (
                          <div style={{display:"flex",alignItems:"center",gap:15}}>
                            <AiFillEdit style={{cursor:"pointer"}}/>
                            <FaTrashAlt style={{cursor:"pointer"}}/>
                          </div>
                        ),
                    },
                    ]
                  }
                />
                
              </div>
            </>
            :
            <>
              <h2>Ítems</h2>
              <div style={{width:"100%",alignItems:"center"}}>
                <Table
                  dataSource={pslist}
                  columns={
                    [
                      {
                        title: 'Código',
                        dataIndex: 'cod',
                        key: 'cod',
                      },
                      {
                        title: 'Nombre',
                        dataIndex: 'nombre',
                        key: 'nombre',
                      },
                      {
                        title: 'Cantidad',
                        dataIndex: 'cantidad',
                        key: 'cantidad',
                      },
                      {
                        title: 'Precio',
                        dataIndex: 'precio',
                        key: 'precio',
                      },
                      {
                        title: '%',
                        dataIndex: 'porcentaje',
                        key: 'porcentaje',
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
                        title: 'Acciones',
                        key: 'actions',
                        render: (text, record) => (
                          <div style={{display:"flex",alignItems:"center",gap:15}}>
                            <AiFillEdit style={{cursor:"pointer"}}/>
                            <FaTrashAlt style={{cursor:"pointer"}}/>
                          </div>
                        ),
                    },
                    ]
                  }
                />
                
              </div>
            </>
          }
        </>
      }

      <div className='form-grid'>
        <div className='column' style={{gap:15, justifyContent:"center"}}>
          <span className='form-label'>Vincular a orden de trabajo</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Si</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
        <div className='column' style={{gap:5}}>
          {
            value === 1?
            <>
              <span className='form-label'>Orden de trabajo <span style={{color:"red"}}>*</span></span>
              <SelectComponent/>
            </>
            :
            <>
              <span className='form-label'>Código <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}} placeholder='Introduce una descripción'/>
            </>
          }
        </div>
      </div>
      {
        value === 1 ?
        <>
          <div className='principal-grid grid-3-columns'>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Id</span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Producto/Servicio</span>
              <input style={{padding:8}}/>
            </div>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
            </div>

          </div>
          
          <div className='principal-grid grid-3-columns'>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>%</span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Neto</span>
              <input style={{padding:8}}/>
            </div>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Bruto </span>
              <input style={{padding:8}}/>
            </div>

          </div>
          
          <div className='container-item-flex-end'>
              <div className='column' style={{boxSizing:"border-box",padding:20}}>
                <div className='row'>
                  <span style={{fontWeight:600}}>SubTotal: </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>IVA (19%): </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>Total: </span>
                  <span>$</span>
                </div>
              </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Condición de pago</span>
              <SelectComponent/>
            </div>
            
          </div>

        </>
        :
        <>
          <div className='principal-grid grid-3-columns'>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Nombre <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}}/>
            </div>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Precio unitario <span style={{color:"red"}}>*</span></span>
              <input style={{padding:8}} placeholder='Ingrese la cantidad'/>
            </div>

          </div>
          
          <div className='principal-grid grid-3-columns'>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>%</span>
              <input style={{padding:8}}/>
            </div>

            <div className='column' style={{gap:5}}>
              <span className='form-label'>Neto</span>
              <input style={{padding:8}}/>
            </div>
            
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Bruto </span>
              <input style={{padding:8}}/>
            </div>

          </div>
          
          <div className='container-item-flex-end'>
              <div className='column' style={{boxSizing:"border-box",padding:20}}>
                <div className='row'>
                  <span style={{fontWeight:600}}>SubTotal: </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>IVA (19%): </span>
                  <span>$</span>
                </div>
                <div className='row'>
                  <span style={{fontWeight:600}}>Total: </span>
                  <span>$</span>
                </div>
              </div>
          </div>

          <div className='form-grid'>
            <div className='column' style={{gap:5}}>
              <span className='form-label'>Condición de pago</span>
              <SelectComponent/>
            </div>
            
          </div>
        </>
      }


      <div className='row-space-btw' style={{marginTop:30}}>
        <FormerBtn setStep={setStep} value={3}/>
        <FollowingBtn setStep={setStep} value={5}/>
      </div>




    </div>
  )
}

const FifthStep = ({setStep}) =>{


  function createDV () {
    setStep(6)
    setTimeout(() => {
      setStep(1)
    }, 2000); 
  }


  return (
    <div className='principal-container-column'>
      <h2 style={{fontSize:20}}>Orden de trabajo</h2>

      <div className='column' style={{gap:5}}>
        <span className='form-label'>Asociar guía</span>
        <SelectComponent/>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Orden de trabajo <span style={{color:"red"}}>*</span></span>
          <input style={{padding:6}} placeholder='Ingrese la orden de trabajo'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Ítem <span style={{color:"red"}}>*</span></span>
          <SelectComponent/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Cantidad <span style={{color:"red"}}>*</span></span>
          <input style={{padding:6}} placeholder='Ingrese la cantidad'/>
        </div>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Fecha recepción  <span style={{color:"red"}}>*</span></span>
          <DatePicker picker='week'/>
        </div>
      </div>

      <div className='form-grid'>
        <div className='column' style={{gap:5}}>
          <span className='form-label'>Notas</span>
          <textarea style={{height:100}}/>
        </div>
      </div>

      <div className='row-space-btw'>
        <FormerBtn setStep={setStep} value={3}/>
        <CreateBtn label={'Crear documento'} HanldeClick={createDV}/>
      </div>

    </div>
  )
}


const NuevoDocumentoDeVenta = () => {

  const navigate = useNavigate()

  const {menuOptions,setMenuOptions} = useContext(AppContext);
  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Finanzas','/sale_invoices')
    setMenuOptions(updateData)
  }, [])



  const [ step,setStep ] = useState(1);


  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep setStep={setStep}/>
      
      case 2:
        return <SecondStep setStep={setStep}/>
      
      case 3:
        return <ThirdStep setStep={setStep}/>
        
      case 4:
        return <FourthStep setStep={setStep}/>

      case 5:
        return <FifthStep setStep={setStep}/>
      
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/sale_invoices')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  ventas</span>
      </div>
      <h1>Agregar documento de venta</h1>
      {
        step === 6 ?
        <Success message={'Documento creado con éxito!'}/>
        :
        <PrincipalCard>
          <div className='step-container step-container-5-steps'>
            <div className='step-container-item'>
              <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
              <div className='step-item-dot-cta' style={{left:-20}}>1</div>
              <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>

            </div>
            <div className='step-container-item'>
              <div className={step >= 3 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
              <div className={step >= 3 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>3</div>
            </div>
            <div className='step-container-item'>
              <div className={step >= 4 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
              <div className={step >= 4 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>4</div>
            </div>
            <div className='step-container-item'>
              <div className={step >= 5 ? 'step-item-bar-cta' : 'step-item-bar'}></div>
              <div className={step >= 5 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>5</div>
            </div>
          </div>

          <form className='step-form'>
            {
              formSetupSteps()
            }
          </form>

        </PrincipalCard>
      }
    {
      /*
      <div className='row-test'>
        <h3 onClick={()=>{navigate('/sale_invoices')}} style={{color:"red"}}>Ventas</h3>
        <h3>Nueva Factura</h3>
      </div>
      <h3>Generar documento de venta</h3>
      <div>Formulario para generar un nuevo documento de venta</div>
      <form>
        <button>Previsualizar</button>
        <button>Crear</button>
      </form>
      
      */
    }
    </>
  )
}

export default NuevoDocumentoDeVenta