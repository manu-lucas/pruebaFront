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
    const [ logged,setLogged ] = useState(true);
    const [ userLoggedData,setUserLoggedData ] = useState({
      id:'1114ad52-f699-4eb8-9a08-ef9e61eaa42a',
      name: 'SuperUsuario'
    })
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
                  route:'/'
                },
                {
                  name:'Balance',
                  selected:false,
                  route:'/'
                }
              ]
            } 
          ], 
           
        },
        
        { 
          icon: <PiBriefcase />, 
          route:'/users/my_profile',
          text: 'Mi Empresa', 
          submenuOptions:[
            {
              name:'Mi Perfil',
              selected:true, 
              route:'/users/my_profile'
            },
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
    const [ products,setProducts ] = useState([])

    //LISTA DE PROVEEDORES
    const [ proveedores,setProveedores ] = useState([])

    //LISTA DE CLIENTES
    const [ clientes,setClientes ] = useState([]); 

    //columnas para la tabla de proyectos:
    const columns_proyects_table = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Estado',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Fecha',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Cliente',
          dataIndex: 'client',
          key: 'client',
        },
        {
          title: 'Producto/Servicio',
          dataIndex: 'item',
          key: 'item',
        },
        {
          title: 'Vendedor',
          dataIndex: 'vendedor',
          key: 'vendedor',
        },
        {
          title: 'Neto',
          dataIndex: 'neto',
          key: 'neto',
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
        },
    ];
    //columnas para la tabla de consultas:
    const columns_quotes_table = [
        {
            title: 'Numero',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Contacto',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Fecha ingreso',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Vendedor',
            dataIndex: 'vendedor',
            key: 'vendedor',
        },
        {
            title: 'Proyecto',
            dataIndex: 'project',
            key: 'project',
        },
    ]
    //funcion de prueba para ver la funcionalidad de cada uno de los botones
    const handleButtonClick = (record) => {
        console.log('Clicked Action Button for record:', record);
        // Aquí puedes realizar la lógica correspondiente al hacer clic en el botón de acción
    };
    //columnas para la tabla de clientes:
    const columns_clients_table = [
        {
            title: 'Razon social o Nombre completo',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Rut',
            dataIndex: 'rut',
            key: 'rut',
        },
        {
            title: 'Contacto',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Telefono',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Credito',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
              <Button type="primary" onClick={() => handleButtonClick(record)}>
                Ver
              </Button>
            ),
        },
    ]
    //columnas para la tabla de Ordenes De Trabajo
    const columns_work_orders_table = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Compromiso',
            dataIndex: 'compromiso',
            key: 'compromiso',
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Producto/Servicio',
            dataIndex: 'item',
            key: 'item',
        },
        //esta parte es para saber a nombre de quien esta esto 
        {
            title: 'Vendedor',
            dataIndex: 'vendedor',
            key: 'vendedor',
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
              <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:6}}>
                <FaFileInvoiceDollar/>
                <FaClipboardList/>
              </div>
            ),
        },
    ];
    //columnas para la tabla de tablero
    const columns_dashboard_table = [
      {
        title: 'N - Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Cliente',
        dataIndex: 'client',
        key: 'client',
      },
      {
        title: 'Producto / Servicio',
        dataIndex: 'item',
        key: 'item',
      },
      {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Estado',
        dataIndex: 'status',
        render: (text, record) => (
          <Select defaultValue="aceptado" style={{ width: 150 }} 
          //onChange={handleChange}
          >
            <Option value="aceptado">Aceptado</Option>
            <Option value="6-month">Ultimos 6 meses</Option>
            <Option value="9-month">Ultimos 9 meses</Option>
            <Option value="this-year">Este año</Option>
            <Option value="last-year">Año pasado</Option>
            <Option value="year-before-last">Año antepasado</Option>
          </Select>
        ),
      },
      {
        title: 'Miembros',
        dataIndex: 'miembros',
        key: 'miembros',
      },
      {
        title: 'Acciones',
        key: 'actions',
        render: (text, record) => (
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:6}}>
            <FaFileInvoiceDollar/>
            <FaClipboardList/>
            <HiMiniRectangleGroup/>
          </div>
        ),
      },
    ];
    //columnas para la tabla de ordenes de compra
    const columns_purchases_table = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Proveedor',
        dataIndex: 'proveedor',
        key: 'proveedor',
      },
      {
        title: '#Documento',
        dataIndex: 'documento',
        key: 'documento',
      },
      {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Monto Neto',
        dataIndex: 'neto',
        key: 'neto',
      },
      {
        title: 'Monto Bruto',
        dataIndex: 'bruto',
        key: 'bruto',
      },
      {
        title: 'Recibido',
        dataIndex: 'recibido',
        render: (text, record) => (
          <FaRegClock/>
        )
      },
      {
        title: 'Acciones',
        dataIndex: 'actions',
        render: (text, record) => (
          <Button type="primary" onClick={() => handleButtonClick(record)}>
            Ver
          </Button>
        )
      },
    ];
    //columnas para la tabla de documentos de venta emitidas
    const columns_sale_invoices_issued_table = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
      },
      {
        title: 'Vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor',
      },
      {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Monto Neto',
        dataIndex: 'neto',
        key: 'neto',
      },
      {
        title: 'Monto Bruto',
        dataIndex: 'bruto',
        key: 'bruto',
      },
      {
        title: 'Acciones',
        dataIndex: 'actions',
        render: (text, record) => (
          <Button type="primary" onClick={() => handleButtonClick(record)}>
            Ver
          </Button>
        )
      },
    ];
    //columnas para la tabla de documentos de venta pendientes
    const columns_pending_sale_issued_table = [
      {
        title: 'Codigo-Nombre',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Cliente',
        dataIndex: 'client',
        key: 'client',
      },
      {
        title: 'F. Comprimiso',
        dataIndex: 'compromiso',
        key: 'compromiso',
      },
      {
        title: 'Monto Total',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Monto insoluto',
        dataIndex: 'insoluto',
        key: 'insoluto',
      },
      {
        title: 'Estado',
        dataIndex: 'status',
        render: (text, record) => (
          <Select defaultValue="aceptado" style={{ width: 150 }} 
          //onChange={handleChange}
          >
            <Option value="aceptado">Aceptado</Option>
            <Option value="6-month">Ultimos 6 meses</Option>
            <Option value="9-month">Ultimos 9 meses</Option>
            <Option value="this-year">Este año</Option>
            <Option value="last-year">Año pasado</Option>
            <Option value="year-before-last">Año antepasado</Option>
          </Select>
        ),
      },
      {
        title: '',
        dataIndex: 'actions',
        render: (text, record) => (
          <Button type="primary" onClick={() => handleButtonClick(record)}>
            Ver
          </Button>
        )
      },
    ];
    //columnas para la tabla de documentos de venta recurrentes
    const column_recurrent_sale_issued_table = [
      {
        title: 'Cliente',
        dataIndex: 'client',
        key: 'client',
      },
      {
        title: 'Documento',
        dataIndex: 'document',
        key: 'document',
      },
      {
        title: 'Intervalo',
        dataIndex: 'intervalo',
        key: 'intervalo',
      },
      {
        title: 'Ultima emitida',
        dataIndex: 'last_issued',
        key: 'last_issued',
      },
      {
        title: 'Siguiente emision',
        dataIndex: 'next_issued',
        key: 'next_issued',
      },
      {
        title: 'Monto Neto',
        dataIndex: 'neto',
        key: 'neto',
      },
      {
        title: 'Bruto',
        dataIndex: 'bruto',
        key: 'bruto',
      },
    ];
    const column_shipping_invoices_table = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'OT',
        dataIndex: 'ot',
        key: 'ot',
      },
      {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
      },
      {
        title: 'Total Real',
        dataIndex: 'total_real',
        key: 'total_real',
      },
      {
        title: 'Total Orden',
        dataIndex: 'total_orden',
        key: 'total_orden',
      },
      {
        title: 'Unidades',
        dataIndex: 'unidades',
        key: 'unidades',
      },
      {
        title: 'Anular',
        dataIndex: 'anular',
        key: 'anular',
      }
    ];
    //columnas tabla de usuarios activados
    const column_users_activate_table = [
      {
        title: 'Usuario',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: 'Cargo',
        dataIndex: 'cargo',
        key: 'cargo',
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Acciones',
        key: 'actions',
        render: (text, record) => (
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:6}}>
            <MdOutlineModeEditOutline/>
            <Button type="primary" onClick={() => {
              console.log(record.id)
              //navigate(`/users/${record.id}`)
              redirectToUserDetailRoute(record.id)
            }}>
              Ver
            </Button>
          </div>
        ),
      },
    ];
    //columnas tabla de productos y servicios
    const column_products_services_table = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Codigo',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Costo',
        dataIndex: 'costo',
        key: 'costo',
      },
      {
        title: 'Precio Neto',
        dataIndex: 'precio_neto',
        key: 'precio_neto',
      },
      {
        title: 'Extension de IVA',
        dataIndex: 'extension_de_iva',
        key: 'extension_de_iva',
      },
      {
        title: 'Descripcion',
        dataIndex: 'descripcion',
        key: 'descripcion',
      },
      {
        title: 'Acciones',
        key: 'actions',
        render: (text, record) => (
          <Button type="primary" onClick={() => handleButtonClick(record)}>
            Ver
          </Button>
        ),
      },
    ];
    
    const column_productos_table = [
      
    ]

    return (
        <AppContext.Provider value={{
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
            setModalContent,
            columns_proyects_table,
            columns_quotes_table,
            columns_clients_table,
            columns_work_orders_table,
            columns_dashboard_table,
            columns_purchases_table,
            columns_sale_invoices_issued_table,
            columns_pending_sale_issued_table,
            column_recurrent_sale_issued_table,
            column_shipping_invoices_table,
            column_users_activate_table,
            column_products_services_table
        }}>
            {props.children}
        </AppContext.Provider>
    )
}