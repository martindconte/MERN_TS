import { Router } from "express";
import { CentralRoutes } from "./central/central.routes";

export class AppRoutes {

 static get routes():Router {

    const router = Router()

    router.use('/api/central', CentralRoutes.routes )

    return router
 }   

}