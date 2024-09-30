import { Router } from 'express'
import { SignalDatasourceImpl, SignalRepositoryImpl } from '../../../infrastructure'
import { SignalController } from '../../controllers'

export class SignalRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new SignalDatasourceImpl()
        const signalRepository = new SignalRepositoryImpl( datasource )

        const controller = new SignalController(signalRepository)

        router.route('/')
            .post(controller.createSignal)
            .get(controller.getAllSignals)

        router.route('/:vendorid')
            .get(controller.getSignalById)
            .put(controller.updateSignal)
            .delete(controller.deleteSignal)

        return router
    }

}