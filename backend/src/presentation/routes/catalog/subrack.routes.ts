import { Router } from "express";
import { SubrackDatasourceImpl, SubrackRepositoryImpl } from "../../../infrastructure";
import { SubrackController } from "../../controllers/catalog/subrack.controller";

export class SubrackRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new SubrackDatasourceImpl()
        // const datasource = new VendorDatasourceImpl()
        const vendorRepository = new SubrackRepositoryImpl( datasource )
        // const vendorRepository = new VendorRepositoryImpl( datasource )

        const controller = new SubrackController( vendorRepository )

        router.route('/')
            .post(controller.createSubrack)
            .get(controller.getAllSubracks)

        router.route('/:subrackid')
            .get(controller.getSubrackById)
            .put(controller.updateSubrackById)
            .delete(controller.deleteSubrackById)

        return router
    }

}