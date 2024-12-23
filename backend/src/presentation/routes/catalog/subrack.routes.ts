import { Router } from 'express';
import { SubrackDatasourceImpl, SubrackRepositoryImpl } from '../../../infrastructure';
import { SubrackController } from '../../controllers';

export class SubrackRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new SubrackDatasourceImpl()
        const vendorRepository = new SubrackRepositoryImpl(datasource)

        const controllerSubrack = new SubrackController(vendorRepository)

        router.route('/')
            .post(controllerSubrack.create)
            .get(controllerSubrack.getAll)

        router.route('/deleted-subracks')
            .get(controllerSubrack.getAllDeleted)

        router.route('/deleted-subrack/:subrackid/permanently-delete')
            .delete(controllerSubrack.cleanById)

        router.route('/:subrackid')
            .get(controllerSubrack.getById)
            .put(controllerSubrack.updateById)
            .delete(controllerSubrack.deleteById)

        return router
    }

}