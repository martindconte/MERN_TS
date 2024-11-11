import { Router } from 'express';
import { VendorDatasourceImpl, VendorRepositoryImpl } from '../../../infrastructure';
import { VendorController } from '../../controllers';

export class VendorRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new VendorDatasourceImpl()
        const vendorRepository = new VendorRepositoryImpl( datasource )

        const controller = new VendorController(vendorRepository)

        router.route('/')
            .post(controller.createVendor)
            .get(controller.getAllVendors)
            
        router.route('/clean-vendors')
            .get(controller.getAllDeletedVendors)
            // .delete(controller.cleanVendors)

        router.route('/clean-vendors/:vendorid/permanently-delete')
            .delete(controller.cleanVendor)

        router.route('/:vendorid')
            .get(controller.getVendorById)
            .put(controller.updateVendor)
            .delete(controller.deleteVendor)
        
        return router
    }

}