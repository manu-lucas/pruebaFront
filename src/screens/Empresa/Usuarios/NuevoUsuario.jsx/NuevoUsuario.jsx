import React, { useState } from 'react'

const NuevoUsuario = () => {
  const [ userData,setUserData ] = useState({nombre:'',apellido:'',email:'',celular:'',fecha_de_nacimiento:null,cargo:''});

  const permisosInitialState = [
    {
      "categoria": "Comercial",
      "subcategorias": [
        {
          "nombre": "Proyecto",
          "id": 1,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": 1
            },
            {
              "nombre": "propietario",
              "select": 0
            }
          ]
        },
        {
          "nombre": "Clientes",
          "id": 2,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": 1
            },
            {
              "nombre": "propietario",
              "select": 0
            }
          ]
        },
        {
          "nombre": "Satisfaccion del Cliente",
          "id": 3,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Operaciones",
      "subcategorias": [
        {
          "nombre": "Ordenes de Trabajo",
          "id": 4,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Tablero de Produccion",
          "id": 5,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Ordenes de Compra",
          "id": 6,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Inventario",
          "id": 7,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Calendario",
      "subcategorias": [
        {
          "nombre": "Agendamiento",
          "id": 8,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Administracion",
      "subcategorias": [
        {
          "nombre": "Ventas",
          "id": 9,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": 1
            },
            {
              "nombre": "propietario",
              "select": 0
            }
          ]
        },
        {
          "nombre": "Compras",
          "id": 10,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Registro de Cobros o Pagos",
          "id": 11,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Cuentas",
          "id": 12,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Resultados y Balance",
          "id": 13,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    },
    {
      "categoria": "Otros",
      "subcategorias": [
        {
          "nombre": "Usuarios",
          "id": 14,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Productos",
          "id": 15,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Servicios",
          "id": 16,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Proveedores",
          "id": 17,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        },
        {
          "nombre": "Configuraciones",
          "id": 18,
          "options": [
            {
              "nombre": "inactivo",
              "select": 1
            },
            {
              "nombre": "ver",
              "select": 0
            },
            {
              "nombre": "administrar",
              "select": 0
            },
            {
              "nombre": "todo",
              "select": null
            },
            {
              "nombre": "propietario",
              "select": null
            }
          ]
        }
      ]
    }
  ];

  const [ permisos,setPermisos ] = useState(permisosInitialState);

  return (
    <>
      <form>
        <input value={userData.nombre} onChange={(e)=>{setUserData({...userData,nombre:e.target.value})}} type='text' placeholder='nombre'/>

        <input value={userData.apellido} onChange={(e)=>{setUserData({...userData,apellido:e.target.value})}} type='text' placeholder='apellido'/>
        
        <input value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}} type='text' placeholder='email'/>
        
        <input value={userData.celular} onChange={(e)=>{setUserData({...userData,celular:e.target.value})}} type='text' placeholder='celular'/>
        
        <input value={userData.fecha_de_nacimiento} onChange={(e)=>{setUserData({...userData,fecha_de_nacimiento:e.target.value})}} type='date' placeholder='fecha de nacimiento'/>

        <input type='text' value={userData.cargo} onChange={(e)=>{setUserData({...userData,cargo:e.target.value})}} placeholder='cargo'/>
      </form>
      <h3>Permisos</h3>
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
                          <input 
                            type='checkbox'
                            checked={itemPermiso.select === 1}
                            onChange={() => handleOptionChange(categoriaIndex, subcategoriaIndex, optionIndex)}
                          />
                        </td>
                      )
                          
                    }
                    {
                          
                      subcategoria.visualizacion.map((itemPermiso,optionIndex)=>
                      <td>
                        {
                          itemPermiso.select == null ?
                          <></>
                          :
                          <input 
                            type='checkbox'
                            checked={itemPermiso.select === 1}
                            onChange={() => handleVisualizacionChange(categoriaIndex, subcategoriaIndex, optionIndex)}
                          />

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
    </>
  )
}

export default NuevoUsuario