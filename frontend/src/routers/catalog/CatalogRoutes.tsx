import { Route, Routes } from 'react-router-dom'
import { CatalogIndexView, EditVendorView, VendorView } from '../../pages'

export const CatalogRoutes = () => {
  return (
    <Routes>
      <Route index element={ <CatalogIndexView /> }/>
      <Route path="vendor" element={ <VendorView /> } />
      <Route path="vendor/edit/:vendorId" element={ <EditVendorView /> } />
    </Routes>
  )
}