import React from 'react'
import PrivateStructure from '../../../screens/Structure/PrivateStructure'
import VentasDashboard from '../../../screens/Administracion/Ventas/VentasDashboard'
import ComprasDashboard from '../../../screens/Administracion/Compras/ComprasDashboard'
import { Route } from 'react-router-dom'
import CuentasDashboard from '../../../screens/Administracion/Cuentas/CuentasDashboard'
import NuevoDocumentoDeVenta from '../../../screens/Administracion/Ventas/NuevoDocumentoDeVenta/NuevoDocumentoDeVenta'
import NuevoDocumentoDeDespacho from '../../../screens/Administracion/Ventas/DocumentosDeDespacho/NuevoDocumentoDeDespacho/NuevoDocumentoDeDespacho'
import NuevoDocumentoDeCompra from '../../../screens/Administracion/Compras/ComprasSection/NuevoDocumentoDeCompra/NuevoDocumentoDeCompra'
import NuevaCompra from '../../../screens/Administracion/Compras/NuevaCompra/NuevaCompra'
import DocumentosDeDespachoDashboard from '../../../screens/Administracion/Ventas/DocumentosDeDespacho/DocumentosDeDespachoDashboard'
import CobrosDashboard from '../../../screens/Administracion/Ventas/Cobros/CobrosDashboard'
import NuevoCobro from '../../../screens/Administracion/Ventas/Cobros/NuevoCobro/NuevoCobro'
import DocumetosTributariosDashboard from '../../../screens/Administracion/Compras/DocumentosTributarios/DocumetosTributariosDashboard'
import PagosDashboard from '../../../screens/Administracion/Compras/Pagos/PagosDashboard'
import NuevoPago from '../../../screens/Administracion/Compras/Pagos/NuevoPago/NuevoPago'

const AdministracionRoutes = [
      <Route path='/sale_invoices/pending'  element={<PrivateStructure><VentasDashboard/></PrivateStructure>}/>,

      //Ventas
      // --- Documentos de venta
      <Route path='/sale_invoices' element={<PrivateStructure><VentasDashboard/></PrivateStructure>}/>,

      // --- Documentos de despacho

      <Route path='/dispach_documents' element={<PrivateStructure><DocumentosDeDespachoDashboard/></PrivateStructure>}/>,
      <Route path='/dispach_documents/new' element={<PrivateStructure><NuevoDocumentoDeDespacho/></PrivateStructure>}/>,

      <Route path='/sale_invoices/new' element={<PrivateStructure><NuevoDocumentoDeVenta/></PrivateStructure>}/>,
      // --- Documentos de despacho
      //<Route path='/shipping_invoices' element={<PrivateStructure><VentasDashboard/></PrivateStructure>}/>,
      //<Route path='/shipping_invoices/new' element={<PrivateStructure><NuevoDocumentoDeDespacho/></PrivateStructure>}/>,

      //compras
      ///---Documentos de compras
      <Route path='/service_invoices' element={<PrivateStructure><ComprasDashboard/></PrivateStructure>}/>,
      <Route path='/service_invoices/new' element={<PrivateStructure><NuevaCompra/></PrivateStructure>}/>,
      //--DTE Pendientes
      <Route path='/purchase_invoice_pendings' element={<PrivateStructure><ComprasDashboard/></PrivateStructure>}/>,

      //Pagos
      <Route path='/service_invoices/payments' element={<PrivateStructure><PagosDashboard/></PrivateStructure>}/>,
      <Route path='/payment_groups' element={<PrivateStructure><PagosDashboard/></PrivateStructure>}/>,
      <Route path='/payment/new' element={<PrivateStructure><NuevoPago/></PrivateStructure>}/>,

      //Cobros
      /*
      <Route path='/sale_invoices/payments' element={<PrivateStructure><CobrosDashboard/></PrivateStructure>}/>,
      <Route path='/sale_payment_groups' element={<PrivateStructure><CobrosDashboard/></PrivateStructure>}/>,
      */
      <Route path='/sale_payment_groups' element={<PrivateStructure><CobrosDashboard/></PrivateStructure>}/>,
      <Route path='/sale_payment/new' element={<PrivateStructure><NuevoCobro/></PrivateStructure>}/>,

      //Cuentas
      <Route path='/banks' element={<PrivateStructure><CuentasDashboard/></PrivateStructure>}/>,
      <Route path='/banks/results' element={<PrivateStructure><CuentasDashboard/></PrivateStructure>} />,
      <Route path='/banks/balance' element={<PrivateStructure><CuentasDashboard/></PrivateStructure>} />,

      //Documentos tributarios
      <Route path='/tax_documents' element={<PrivateStructure><DocumetosTributariosDashboard/></PrivateStructure>} />,

];

export default AdministracionRoutes