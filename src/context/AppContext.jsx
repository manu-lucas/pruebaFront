import { createContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { FaBuilding } from "react-icons/fa";
import { Button, Select } from "antd";
import { IoDocumentOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import SelectComponent from "../components/Select/SelectComponent";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { redirectToUserDetailRoute } from "../utils/helpers";

import { LuHome } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { LuClipboardList } from "react-icons/lu";
import { PiMoneyLight } from "react-icons/pi";
import { PiBriefcase } from "react-icons/pi";


export const AppContext = createContext();

export const AppContextProvider = (props) =>{

    const [ signUpCode,setSignUpCode ] = useState(false);

    //loading para las private routes
    const [ loadingPublicRoutes,setloadingPublicRoutes ] = useState(true)


    //loading para las rutas privadas 
    const [loadingPrivateRoutes,setLoadingPrivateRoutes] = useState(true)


    const [ logged,setLogged ] = useState(false);
    
    const [ userLoggedData,setUserLoggedData ] = useState({
      id:'1114ad52-f699-4eb8-9a08-ef9e61eaa42a',
      name: 'SuperUsuario'
    })

    const [ condicionesDePago,seetCondicionesDePago ] = useState([
      {
        id: "1",
        numero_dias: 10,
        nombre: null
      },
      {
        id: "2",
        numero_dias: 15,
        nombre: null
      },
      {
        id: "3",
        numero_dias: 30,
        nombre: null
      },
      {
        id: "4",
        numero_dias: 45,
        nombre: null
      },
      {
        id: "5",
        numero_dias: 40,
        nombre: 'condición creada por el cliente'

      }
    ])

    const menuOptionsinitialState = [
        { icon: <LuHome />, text: 'Inicio', route:'/', selected:true },
    
        { icon: <VscGraph />, route:'/quotes', text: 'Gestión', submenuOptions:[{name:'Proyectos',selected:true, route:'/quotes'},
        //{name:'Consultas',selected:false, route:'/quote_requests'}, 
        {name:'Clientes',selected:false, route:'/clients/dashboard'} ], submenuOpen: false },
    
        { icon: <LuClipboardList />, route:'/work_orders',text: 'Órdenes' , submenuOptions:[{name:'Orden de trabajo',selected:true, route: '/work_orders'},
        //{name:'Tablero',selected:false, route:'/work_orders/panel'}, 
        {name:'Orden de Compra',selected:false, route: '/purchases'} ], submenuOpen: false },
        
        //{ icon: <FaCalendarAlt />, route:'/delivery_orders/delivery_route',text: 'Calendario', submenuOptions:[{name:'Agendamiento',selected:true, route:'/delivery_orders/delivery_route'},{name:'Mis Tareas',selected:false, route:'/qtwist/delivery_orders'} ], submenuOpen: false  },
        
        { 
          icon: <PiMoneyLight />, 
          route:'/sale_invoices',
          text: 'Finanzas',
          submenuOpen: false, 
          submenuOptions:[
            {
              name:'Ventas',
              selected:true, 
              route:'/sale_invoices',
              itemsOpen:false,
              items:[
                {
                  name:'Despachos',
                  selected:false,
                  route:'/dispach_documents'
                },
                {
                  name:'Cobros',
                  selected:false,
                  route:'/sale_payment_groups'
                }
              ]
            },
            {
              name:'Compras',
              selected:false, 
              route: '/service_invoices',
              itemsOpen:false,
              items:[
                {
                  name:'Documentos tributarios',
                  selected:false,
                  route:'/tax_documents'
                },
                {
                  name:'Pagos',
                  selected:false,
                  route:'/payment_groups'
                }
              ]
            },
            {
              name:'Cuentas',
              selected:false, 
              route:'/banks',
              itemsOpen:false,
              items:[
                {
                  name:'Resultados',
                  selected:false,
                  route:'/results'
                },
                {
                  name:'Balance',
                  selected:false,
                  route:'/balance'
                },
                {
                  name:'Administrar',
                  selected:false,
                  route:'/admin_acount'
                }
              ]
            } 
          ], 
           
        },
        
        { 
          icon: <PiBriefcase />, 
          route:'/users',
          text: 'Mi Empresa', 
          submenuOptions:[
            /*
            {
              name:'Mi Perfil',
              selected:true, 
              route:'/users/my_profile'
            },
            */
            {
              name:'Usuarios',
              selected:false, 
              route:'/users'
            },
            {
              name:'Productos/Servicios',
              selected:false, 
              route:'/products'
            },
            {
              name:'Lista de precios',
              selected:false, 
              route:'/price_lists'
            }, 
            {
              name:'Proveedores',
              selected:false, 
              route:'/providers'
            },
        ], 
        submenuOpen: false  
      }
    ]


    const [ deployAside,setDeployAsie ] = useState(false)

    const [menuOptions,setMenuOptions] = useState(menuOptionsinitialState);
    const [ modal,setModal ] = useState(false);
    const [ modalContent,setModalContent ] = useState(null)
    //Lista de subusuarios:
    const [ subusuarios,setSubusuarios ] = useState([]);
    //Estado inicial de los permisos de superusuario:
    
    //LISTA DE PRODUCTOS 
    const [ products,setProducts ] = useState([{"id":"product-0877dc42-db5e-4ddf-99ef-09cb252d1d48","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Producto de agus","moneda":1,"precio":12330,"imagen":"url","iva":true,"activo":true,"codigo":"cod","codigo_barra":"1233","unidad":"unidad","costo":230,"exencion_impuesto":true,"exencion_valor":20,"disponibilidad":true,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":"nota"},{"id":"product-0e4f661c-3d72-45fa-ab89-49404a469bfd","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Producto para probar","moneda":1,"precio":4000,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":true,"exencion_valor":null,"disponibilidad":false,"manejo_stock":true,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-10138c0d-ff35-4381-b069-c9cc9b92c1b3","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Nombre","moneda":1,"precio":1233,"imagen":"url","iva":false,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-23e85a79-1b6d-4ac0-8d08-6950d98c6f68","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Nombre_del_producto2","moneda":1,"precio":10.99,"imagen":"url_de_la_imagen","iva":true,"activo":true,"codigo":"Código_del_producto","codigo_barra":"Código_de_barras","unidad":"Unidad_de_medida","costo":5.99,"exencion_impuesto":true,"exencion_valor":2,"disponibilidad":true,"manejo_stock":true,"minimo_stock":10,"maximo_stock":100,"unidad_medida":"Unidad_de_medida","cantidad":1,"notas":"Notas adicionales"},{"id":"product-24750755-e9bb-4e48-b1ce-72a6dd7d1198","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Producto Tal","moneda":1,"precio":1233,"imagen":"url","iva":true,"activo":false,"codigo":"ssss","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-26c93822-ea7a-4e69-882f-7bb4357e796d","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Producto desde el frontt 1","moneda":1,"precio":12233,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-2fba40e0-3909-4c80-b0ad-9ccb7be9317d","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Nombre producto desde el front","moneda":1,"precio":1233,"imagen":"url","iva":true,"activo":true,"codigo":"1232","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-4b1866e2-4eb6-4bb0-83f2-05829520bce9","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Producto desde el fronttt","moneda":1,"precio":12344,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-4c188782-0df9-4676-85f8-45db8c604102","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"CHANCHA 123","moneda":1,"precio":123344,"imagen":"url","iva":true,"activo":true,"codigo":"COD-1222","codigo_barra":"2223","unidad":"unidad","costo":200,"exencion_impuesto":true,"exencion_valor":10,"disponibilidad":true,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":"nota hola chancha"},{"id":"product-506ee91a-c95d-4dd9-af08-ebb7d94ff8b4","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Nombre_del_producto4","moneda":1,"precio":10.99,"imagen":"url_de_la_imagen","iva":true,"activo":true,"codigo":"Código_del_producto","codigo_barra":"Código_de_barras","unidad":"Unidad_de_medida","costo":5.99,"exencion_impuesto":true,"exencion_valor":2,"disponibilidad":true,"manejo_stock":true,"minimo_stock":10,"maximo_stock":100,"unidad_medida":"Unidad_de_medida","cantidad":1,"notas":"Notas adicionales"},{"id":"product-5a612ee0-e097-45ca-92c9-55294435c85f","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Un nuevo productoaa","moneda":1,"precio":122,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-75a5e304-4a79-4801-a2f6-e4540f18d983","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"testerr","moneda":1,"precio":4000,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":true,"exencion_valor":null,"disponibilidad":false,"manejo_stock":true,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-75f42e3e-1dd9-4657-b157-e65a35228c00","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"ASTA","moneda":1,"precio":233,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-762cd3a3-8893-4e23-8797-6de33d2cfdf6","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Produccc","moneda":1,"precio":1222,"imagen":"url","iva":false,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-7c975e5a-4a96-4d6a-b477-d93b86ad1d84","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"ProductoDesactivado","moneda":1,"precio":988,"imagen":"url","iva":true,"activo":false,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-7e43edfc-42df-45d8-9e2b-aba7c8650b4c","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Producto desde el front","moneda":1,"precio":1340,"imagen":"url","iva":true,"activo":true,"codigo":"12344","codigo_barra":"ab-01234","unidad":"unidad","costo":200,"exencion_impuesto":true,"exencion_valor":20,"disponibilidad":true,"manejo_stock":true,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-7f7e253c-2d60-42b3-925d-3bdb072f349a","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Un nuevo producto","moneda":1,"precio":122,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-8eb7e196-fed1-4724-89e0-55ed859e9892","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Proroorod","moneda":1,"precio":1234,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-a0b19e84-7ea8-43c2-8b04-d4ea323ad50a","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"TTT Tester","moneda":1,"precio":344,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":true,"exencion_valor":null,"disponibilidad":false,"manejo_stock":true,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-accad965-b271-4168-a990-093b0964729a","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"TRRR","moneda":1,"precio":23,"imagen":"url","iva":true,"activo":false,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-b96f8816-0b65-4028-8a28-b9e849dd79b8","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Nombre_del_producto","moneda":1,"precio":10.99,"imagen":"url_de_la_imagen","iva":true,"activo":true,"codigo":"Código_del_producto","codigo_barra":"Código_de_barras","unidad":"Unidad_de_medida","costo":5.99,"exencion_impuesto":true,"exencion_valor":2,"disponibilidad":true,"manejo_stock":true,"minimo_stock":10,"maximo_stock":100,"unidad_medida":"Unidad_de_medida","cantidad":1,"notas":"Notas adicionales"},{"id":"product-c65cbd0f-976c-4bb9-88c8-c01bc8b07db8","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Nombre_del_producto1","moneda":1,"precio":10.99,"imagen":"url_de_la_imagen","iva":true,"activo":true,"codigo":"Código_del_producto","codigo_barra":"Código_de_barras","unidad":"Unidad_de_medida","costo":5.99,"exencion_impuesto":true,"exencion_valor":2,"disponibilidad":true,"manejo_stock":false,"minimo_stock":10,"maximo_stock":100,"unidad_medida":"Unidad_de_medida","cantidad":1,"notas":"Notas adicionales"},{"id":"product-cf5f442c-497b-408b-9a73-308fe60e2d92","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"producto con id","moneda":1,"precio":567,"imagen":"url","iva":false,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":true,"exencion_valor":null,"disponibilidad":false,"manejo_stock":true,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-d518b8ea-d7b5-4f5c-8d2f-fa54e2b50e88","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Prooo","moneda":1,"precio":12344,"imagen":"url","iva":true,"activo":true,"codigo":"","codigo_barra":"","unidad":"","costo":null,"exencion_impuesto":false,"exencion_valor":null,"disponibilidad":false,"manejo_stock":false,"minimo_stock":null,"maximo_stock":null,"unidad_medida":"","cantidad":null,"notas":""},{"id":"product-dbf938e3-abb7-421d-9cee-f9b2d396121a","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","nombre":"Nombre_del_producto3","moneda":1,"precio":10.99,"imagen":"url_de_la_imagen","iva":true,"activo":true,"codigo":"Código_del_producto","codigo_barra":"Código_de_barras","unidad":"Unidad_de_medida","costo":5.99,"exencion_impuesto":true,"exencion_valor":2,"disponibilidad":true,"manejo_stock":true,"minimo_stock":10,"maximo_stock":100,"unidad_medida":"Unidad_de_medida","cantidad":1,"notas":"Notas adicionales"}])

    //LISTA DE PROVEEDORES
    const [ proveedores,setProveedores ] = useState([])

    //LISTA DE CLIENTES
    const [ clientes,setClientes ] = useState([{"cliente":{"id":"cliente-40bc65a4-b91b-488b-8444-9853431f701f","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","razon_social":"Cliente de prueba","rut":"1234322","giro":"giro","direccion":null,"comuna":null,"ciudad":null,"suscripcion_a_encuestas":null,"activo":true,"condicion_de_pago":"2","linea_de_credito":null,"exension_de_impuestos":true,"notas":"nota","pie_de_pagina":"pie"},"contactos":[],"punto_despacho_cliente":[]},{"cliente":{"id":"cliente-914922bb-5b03-4e4c-9d76-975d02fd1275","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","razon_social":"Nombre","rut":"21121112","giro":null,"direccion":null,"comuna":null,"ciudad":null,"suscripcion_a_encuestas":null,"activo":true,"condicion_de_pago":"2","linea_de_credito":null,"exension_de_impuestos":null,"notas":null,"pie_de_pagina":null},"contactos":[],"punto_despacho_cliente":[]},{"cliente":{"id":"cliente-a99a25bc-945a-4753-8378-66e522c1d75f","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","razon_social":"Agustin","rut":"35664918","giro":"giro","direccion":"PRIMITIVO DE LA RETA 1098","comuna":null,"ciudad":"MENDOZA","suscripcion_a_encuestas":null,"activo":true,"condicion_de_pago":"4","linea_de_credito":null,"exension_de_impuestos":false,"notas":null,"pie_de_pagina":null},"contactos":[],"punto_despacho_cliente":[]},{"cliente":{"id":"cliente-af9f225d-06a1-41dc-b3d2-4585f886a03c","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","razon_social":"Cliente","rut":"212211","giro":null,"direccion":null,"comuna":null,"ciudad":null,"suscripcion_a_encuestas":null,"activo":true,"condicion_de_pago":"2","linea_de_credito":1222,"exension_de_impuestos":true,"notas":null,"pie_de_pagina":null},"contactos":[{"id":"contacto-cliente-1532e6ff-7f30-4187-9d31-123552832850","cliente":"cliente-af9f225d-06a1-41dc-b3d2-4585f886a03c","nombre":"Contacto","email":"ema@gmail.com","celular":"1222","telefono":"12211","vendedorId":"ab-0223"}],"punto_despacho_cliente":[]},{"cliente":{"id":"cliente-d87655b0-22f0-4aad-9555-c6b46d71dc1f","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","razon_social":"Cliente nuevo de prueba","rut":"1234444","giro":"giro comercuak","direccion":"dirwc","comuna":"comuna","ciudad":"ciudad","suscripcion_a_encuestas":null,"activo":true,"condicion_de_pago":"2","linea_de_credito":12222,"exension_de_impuestos":null,"notas":null,"pie_de_pagina":null},"contactos":[],"punto_despacho_cliente":[]},{"cliente":{"id":"cliente-e6e1d4e2-aa5d-49a3-bfeb-24bbb638df4f","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","razon_social":"Cliente de prueba desde el front","rut":"1234566777","giro":"gir comercial","direccion":"direccion 1","comuna":"comuna","ciudad":"ciudad","suscripcion_a_encuestas":null,"activo":true,"condicion_de_pago":"3","linea_de_credito":12344,"exension_de_impuestos":true,"notas":"notas","pie_de_pagina":"pie"},"contactos":[{"id":"contacto-cliente-1971b7c2-3d57-4ac8-855e-0548ff81d2bf","cliente":"cliente-e6e1d4e2-aa5d-49a3-bfeb-24bbb638df4f","nombre":"Nombre contacto 2","email":"email.contacto.2@gmail.com","celular":"1233939393","telefono":"1383948384","vendedorId":"ab-0223"},{"id":"contacto-cliente-97c27b25-5765-4f60-ac6d-7814fecf39a2","cliente":"cliente-e6e1d4e2-aa5d-49a3-bfeb-24bbb638df4f","nombre":"Nombre contacto 1","email":"email.contacto.1@gmail.com","celular":"123456677","telefono":"1234432222","vendedorId":"ab-0225"}],"punto_despacho_cliente":[{"id":"punto-despacho-297f3b8d-f54e-468d-9edc-e6887ae9da64","cliente":"cliente-e6e1d4e2-aa5d-49a3-bfeb-24bbb638df4f","direccion":"Punto de despacho 2","nombre_receptor":"nombre persona ","lugar":"lugar","comuna":"comuna","ciudad":"ciudad","datos_de_pago":false},{"id":"punto-despacho-cbe44b9b-5121-4bbe-9595-0710f09ad59a","cliente":"cliente-e6e1d4e2-aa5d-49a3-bfeb-24bbb638df4f","direccion":"Punto de despacho 1","nombre_receptor":"Nombre person","lugar":"lugar","comuna":"comuna","ciudad":"ciudad","datos_de_pago":true}]},{"cliente":{"id":"cliente-fc5166cf-3013-4610-9874-d85e040d6fea","user":"1114ad52-f699-4eb8-9a08-ef9e61eaa42a","razon_social":"Cliente1","rut":"212211","giro":null,"direccion":null,"comuna":null,"ciudad":null,"suscripcion_a_encuestas":null,"activo":true,"condicion_de_pago":"2","linea_de_credito":1222,"exension_de_impuestos":true,"notas":null,"pie_de_pagina":null},"contactos":[{"id":"contacto-cliente-fe8c2947-2614-4eb5-a4db-7a685c31ca9f","cliente":"cliente-fc5166cf-3013-4610-9874-d85e040d6fea","nombre":"Contacto","email":"ema@gmail.com","celular":"1222","telefono":"12211","vendedorId":"ab-0223"}],"punto_despacho_cliente":[{"id":"punto-despacho-a35eb2df-f228-4779-9b4f-f2ce323ef2a4","cliente":"cliente-fc5166cf-3013-4610-9874-d85e040d6fea","direccion":"punto","nombre_receptor":"ateee","lugar":"sss","comuna":"sss","ciudad":"sss","datos_de_pago":true}]}])

    //LISTA DE PROYECTOS:
    const [ proyectos,setProyectos ] = useState([{"id":"project-018eae1c-9655-4eff-b554-69a178176118","numero":"1","nombre":"kesesto","estado":"Pendiente","fecha":"2024-05-06T00:00:00.000Z","cliente":"Cliente de prueba desde el front","vendedor":"mage2 banyu","productos_servicios":{"productos":[{"id":"item-product-project-1d6ca1a7-79c0-4d42-9184-53f9eaa3d0f4","idProyecto":"project-018eae1c-9655-4eff-b554-69a178176118","idProducto":"product-26c93822-ea7a-4e69-882f-7bb4357e796d","cantidad":1,"porcentaje_descuento":0,"nombre_impuesto":"IVA","impuesto":0.19,"precio":9908,"total":12233,"nombre":"Producto desde el frontt 1"},{"id":"item-product-project-bfb4363c-facb-41d6-bd10-0a8af28640b9","idProyecto":"project-018eae1c-9655-4eff-b554-69a178176118","idProducto":"product-23e85a79-1b6d-4ac0-8d08-6950d98c6f68","cantidad":1,"porcentaje_descuento":0,"nombre_impuesto":"IVA","impuesto":0.19,"precio":8,"total":10,"nombre":"Nombre_del_producto2"}],"servicios":[]},"neto":9916,"total":12243},{"id":"project-52719069-dac4-4219-aeef-036d3e551bdf","numero":"1","nombre":"Proyecto testterrr","estado":"Pendiente","fecha":"2024-05-10T00:00:00.000Z","cliente":"Cliente de prueba desde el front","vendedor":"mage2 banyu","productos_servicios":{"productos":[{"id":"item-product-project-062e71dd-9b71-4b32-a45b-fe51254e99ba","idProyecto":"project-52719069-dac4-4219-aeef-036d3e551bdf","idProducto":"product-23e85a79-1b6d-4ac0-8d08-6950d98c6f68","cantidad":1,"porcentaje_descuento":0,"nombre_impuesto":"IVA","impuesto":0.19,"precio":8,"total":10,"nombre":"Nombre_del_producto2"},{"id":"item-product-project-4de73d24-e0b3-43b9-8e81-f1ad47d942be","idProyecto":"project-52719069-dac4-4219-aeef-036d3e551bdf","idProducto":"product-4c188782-0df9-4676-85f8-45db8c604102","cantidad":1,"porcentaje_descuento":0,"nombre_impuesto":"IVA","impuesto":0.19,"precio":99908,"total":123344,"nombre":"CHANCHA 123"},{"id":"item-product-project-9f785163-b11b-4be7-adf5-65da89315b2c","idProyecto":"project-52719069-dac4-4219-aeef-036d3e551bdf","idProducto":"product-2fba40e0-3909-4c80-b0ad-9ccb7be9317d","cantidad":1,"porcentaje_descuento":0,"nombre_impuesto":"IVA","impuesto":0.19,"precio":998,"total":1233,"nombre":"Nombre producto desde el front"}],"servicios":[]},"neto":100914,"total":124587},{"id":"project-f7d57476-042a-469a-8336-8523b89f9619","numero":"1","nombre":"KSJSJ","estado":"Pendiente","fecha":"2024-05-10T00:00:00.000Z","cliente":"Cliente de prueba desde el front","vendedor":"mage2 banyu","productos_servicios":{"productos":[{"id":"item-product-project-4d03bf04-595d-4e56-acec-b003248ae245","idProyecto":"project-f7d57476-042a-469a-8336-8523b89f9619","idProducto":"product-24750755-e9bb-4e48-b1ce-72a6dd7d1198","cantidad":1,"porcentaje_descuento":0,"nombre_impuesto":"IVA","impuesto":0.19,"precio":998,"total":1233,"nombre":"Producto Tal"},{"id":"item-product-project-cdd548f0-d41a-4e03-b851-9e3434c1bf9d","idProyecto":"project-f7d57476-042a-469a-8336-8523b89f9619","idProducto":"product-10138c0d-ff35-4381-b069-c9cc9b92c1b3","cantidad":1,"porcentaje_descuento":0,"nombre_impuesto":"IVA","impuesto":0.19,"precio":1233,"total":1233,"nombre":"Nombre"}],"servicios":[]},"neto":2231,"total":2466}])

    //LISTA DE ORDENES DE TRABAJO 
    const [ ordenesDeTrabajo,setOrdenesDeTrabajo ] = useState([])

    //LISTA ORDENES DE COMPRA 
    const [ ordenesDeCompra,setOrdenesDeCompra ] = useState([])


    //LISTA DE VENTAS
    const [ventas,setVentas] = useState([])
  

    return (
        <AppContext.Provider value={{
            signUpCode,setSignUpCode,
            loadingPublicRoutes,setloadingPublicRoutes,
            logged,setLogged,
            userLoggedData,setUserLoggedData,
            menuOptionsinitialState,menuOptions,
            deployAside,setDeployAsie,
            setMenuOptions,modal,
            setModal,modalContent,
            subusuarios,setSubusuarios,
            products,setProducts,
            proveedores,setProveedores,
            clientes,setClientes,
            ordenesDeTrabajo,setOrdenesDeTrabajo,
            ordenesDeCompra,setOrdenesDeCompra,
            proyectos,setProyectos,
            ventas,setVentas,
            condicionesDePago,seetCondicionesDePago,
            setModalContent,
            loadingPrivateRoutes,setLoadingPrivateRoutes
        }}>
            {props.children}
        </AppContext.Provider>
    )
}