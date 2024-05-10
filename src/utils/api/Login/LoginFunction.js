import axios from "axios"

export async function getProyectos (userId,setProyectos){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/projects/alldata/${userId}`)
      //console.log(response)
      setProyectos(response.data.payload)
    }catch (err) {
      console.log(err)
    }
}

export async function getClientes (userId,setClientes){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/clientes/alldata/${userId}`)
      //console.log(response)
      setClientes(response.data.payload)
    }catch (err) {
      console.log(err)
    }
}


  //Obtener ordenes de trabajp
  export async function getOTs (userId,setOrdenesDeTrabajo){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/ordenTrabajo/alldata/${userId}`)
      //console.log(response)
      setOrdenesDeTrabajo(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }


  //Obtener usuarios
  export async function getAllUsers (userId,setSubusuarios){
    try{
      
      const activeUsers = await getAllUsersActive(userId)
      
      const inactiveUsers = await getAllUsersInactive(userId)

      let array = [...activeUsers,...inactiveUsers]
      array.sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
      });


      console.log('usuarios!')
      console.log(array)
      setSubusuarios(array)
      
    }catch (err) {
      console.log(err)
    }
  }

  export async function getAllUsersActive (userId){
    try{
      const responseUsersAct = await axios.get(`https://appify-black-side.vercel.app/user/allUsersAct/${userId}`)
      console.log('usuarios activos')
      const activeUsers = responseUsersAct.data.payload.map((item)=>{
        return {...item, estado: "Activo"}
      })
      console.log(activeUsers)
      return activeUsers
    }catch (err) {
      return []
    }
  }


  export async function getAllUsersInactive (userId){
    try{
      const responseUsersInac = await axios.get(`https://appify-black-side.vercel.app/user/allUsersInact/${userId}`)
      console.log('usuarios inactivos')
      const inactiveUsers = responseUsersInac.data.payload.map((item)=>{
        return {...item, estado: "Inactivo"}
      })
      console.log(inactiveUsers)
      return inactiveUsers
    }catch (err) {
      return []
    }
  }




  ///Obtener proveedores

  export async function getAllProviders (userId,setProveedores){
    try{
      
      const activeProv = await getAllProvidersActive(userId)

      const inactiveProv = await getAllProvidersInactive(userId)

      
      let array = [...activeProv,...inactiveProv]
      
      array.sort((a, b) => {
        return a.razon_social.localeCompare(b.razon_social);
      });
      console.log('Proveedores todos:')
      console.log(array)
      setProveedores(array)
      
    }catch (err) {
      console.log(err)
    }
  }


  export async function getAllProvidersActive (userId){
    try{
      const responseProvAct = await axios.get(`https://appify-black-side.vercel.app/proveedor/allProvAct/${userId}`)
      const activeProv = responseProvAct.data.payload.map((item)=>{
        return {...item, estado: "Activo"}
      })
      return activeProv
    }catch(err){
      return []
    }
  }


  export async function getAllProvidersInactive (userId){
    try{
      const responseProvInac = await axios.get(`https://appify-black-side.vercel.app/proveedor/allProvInact/${userId}`)
      const inactiveProv = responseProvInac.data.payload.map((item)=>{
        return {...item, estado: "Inactivo"}
      })
      return inactiveProv
    }catch(err){
      return []
    }
  }


  
  //Obtener productos:

  export async function getAllProducts (userId,setProducts){
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/products/products/${userId}`)
      console.log('productos:')
      console.log(response.data.payload)
      setProducts(response.data.payload)
    }catch (err) {
      console.log(err)
    }
  }

  //Obtener ordenes de compra
  export async function getOCs (userId,setOrdenesDeTrabajo) {
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/ordenCompra/alldata/${userId}`)
      setOrdenesDeTrabajo(response.data.payload)
    }catch (err){
      console.log(err)
    }
  }

  //Obtener ordenes de compra
  export async function getVentas (userId,setVentas) {
    try{
      const response = await axios.get(`https://appify-black-side.vercel.app/administracion/ventas/alldata/${userId}`)
      setVentas(response.data.payload)
    }catch (err){
      console.log(err)
    }
  }


  /*
  factura de venta initial state
  {
    "documento_venta": {
        "user": "sub-user-9a84cf81-d493-4320-be9d-99e45da9fe6e"
    },
  "factura_venta": {
    "idCliente": "cliente-26a583c8-5130-48a6-82eb-4796430bb354",
    "tipo_documento": "Factura",
    "dataInitialState": "0001-00000234",
    "fecha": "2024-04-08T00:00:00Z",
    "idVendedor": "sub-user-b6034146-e508-4da5-bad9-eb7ec18fa5d7",
    "condicion_de_pago": "Contado",
    "centro_beneficio": "Ventas",
    "observacion": "Venta de productos y servicios",
    "nota_interna": "Cliente solicita entrega a domicilio"
  },
  "item_servicio_factura_venta": [
    {
      "idServicio": "service-fa477a3f-89ee-4d3b-8196-5322a951f04b",
      "codigo": "SVC100",
      "cantidad": 2,
      "unitario": 100,
      "bruto": 200.0,
      "neto": 190.0,
      "cuenta": "C100",
      "bonificacion": 10.0,
      "notas": "Servicio de mantenimiento"
    },
    {
      "idServicio": "service-cf0932a0-22e9-4d86-977d-bdb62a6d4afd",
      "cantidad": 1,
      "unitario": 150,
      "bruto": 150.0,
      "neto": 142.5,
      "bonificacion": 7.5,
      "notas": "Servicio de instalación"
    }
  ],
  "item_producto_factura_venta": [
    {
      "idProducto": "product-f8f53462-2554-4934-a9b8-55e6b3c78bdc",
      "codigo": "PROD100",
      "cantidad": 3,
      "unitario": 50,
      "bruto": 150.0,
      "neto": 135.0,
      "cuenta": "P100",
      "bonificacion": 15.0,
      "notas": "Producto A"
    },
    {
      "idProducto": "product-d518b8ea-d7b5-4f5c-8d2f-fa54e2b50e88",
      "cantidad": 2,
      "unitario": 75,
      "bruto": 150.0,
      "neto": 140.0,
      "bonificacion": 10.0,
      "notas": "Producto B"
    }
  ]
}
  
  */