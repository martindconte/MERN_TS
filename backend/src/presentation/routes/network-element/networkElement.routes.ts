import { Router } from 'express';
import { NetworkElementDatasourceImpl } from '../../../infrastructure/datasources/network-element';
import { NetworkElementRepositoyImpl } from '../../../infrastructure';
import { NetworkElemntController } from '../../controllers';

export class NetworkElementRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new NetworkElementDatasourceImpl();
    const networkElementRepository = new NetworkElementRepositoyImpl(datasource);
    const controller = new NetworkElemntController(networkElementRepository);

    router.route('/')
      .post(controller.create);
    
    return router;
  }
}
