import { Router } from "express";
import { CentralController } from "../../controllers/central/central.controller";
import { CentralDatasourceImpl, CentralRepositoryImpl } from "../../../infrastructure";

//* Path /api/central
export class CentralRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new CentralDatasourceImpl()
        const centralRepository = new CentralRepositoryImpl( datasource )

        const controller = new CentralController( centralRepository )

        router.route('/')
            .post(controller.createCentral)
            .get(controller.getAllCentrals)

        router.route('/:centralid')
            .get(controller.getCentralsById)
            .put(controller.updateCentral)
            .delete(controller.deleteCentral)

        return router
    }

}