import { Route, Routes } from 'react-router-dom';
import { DeletedVendorsView, EditVendorView, VendorView } from '../../../pages';

//* Ruta --> catalog/vendor

export const VendorRoutes = () => {
    return (
        <Routes>
            <Route index element={ <VendorView /> } /> // catalog/vendor
            <Route path='edit/:vendorId' element={ <EditVendorView /> } /> // catalog/vendor/edit/:vendorId
            <Route path='deleted' element={ <DeletedVendorsView /> } /> // catalog/vendor/deleted
        </Routes>
    )
};