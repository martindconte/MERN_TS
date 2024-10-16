import { Route, Routes } from 'react-router-dom'
import { CatalogIndexView } from '../../pages'
import { VendorRoutes } from './vendor/VendorRoutes'
import { SignalRoutes } from './signal/SignalRoutes'
import { TransceiverRoutes } from './transceiver/TransceiverRoutes'

//* RUTA --> catalog/

export const CatalogRoutes = () => {
  return (
    <Routes>
      <Route index element={ <CatalogIndexView /> }/>
      <Route path='vendor/*' element={ <VendorRoutes /> } />
      <Route path='signal/*' element={ <SignalRoutes /> } />
      <Route path='transceiver/*' element={ <TransceiverRoutes /> } />
    </Routes>
  )
}