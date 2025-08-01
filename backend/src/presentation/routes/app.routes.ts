import { Router } from "express";
import { CentralRoutes } from "./central/central.routes";
import { CatalogRoutes } from "./catalog/catalog.routes";
import { NetworkElementRoutes } from "./network-element/networkElement.routes";

export class AppRoutes {

 static get routes():Router {

    const router = Router()

    router.use('/api/central', CentralRoutes.routes )
    router.use('/api/catalog', CatalogRoutes.routes )
    router.use('/api/network-element', NetworkElementRoutes.routes )

    return router
 }   

}