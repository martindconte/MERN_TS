import { Router } from 'express';
import { VendorRoutes } from './vendor.routes';
import { SubrackRoutes } from './subrack.routes';
import { SignalRoutes } from './signal.routes';

export class CatalogRoutes {

    static get routes(): Router {

        const router = Router()

        //* route: /api/catalog
        router.use('/vendor', VendorRoutes.routes)
        router.use('/subrack', SubrackRoutes.routes)
        router.use('/signal', SignalRoutes.routes)

        return router
    }

}