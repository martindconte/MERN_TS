import { Router } from 'express';
import { SubrackDatasourceImpl, SubrackRepositoryImpl } from '../../../infrastructure';
import { SubrackController } from '../../controllers';

export class SubrackRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new SubrackDatasourceImpl()
        const vendorRepository = new SubrackRepositoryImpl( datasource )

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