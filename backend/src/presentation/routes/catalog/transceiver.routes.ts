import { Router } from 'express';
import { TransceiverDatasourceImpl, TransceiverRepositoryImpl } from '../../../infrastructure';
import { TransceiverController } from '../../controllers';

//* ROUTE --> api/catalog/transceiver
export class TransceiverRoutes {

    static get routes(): Router {

        const router = Router();

        //todo: IMPLEMENTAR RUTAS DS y Controller
        const datasource = new TransceiverDatasourceImpl()
        const transceiverRepository = new TransceiverRepositoryImpl( datasource )

        const controllerTransceiver = new TransceiverController( transceiverRepository )

        router.route('/')
            .post( controllerTransceiver.create )
            .get( controllerTransceiver.getAll )

        router.route('/:transceiverid')
            .get( controllerTransceiver.getById )
            .put( controllerTransceiver.updateById )
            .delete( controllerTransceiver.deleteById )

        return router;
    }
}