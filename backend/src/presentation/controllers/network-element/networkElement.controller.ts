import { Request, Response } from 'express';
import { CreateNetworkElementDTO, NetworkElementRepository, NetworkElementUseCase } from '../../../domain';

export class NetworkElemntController {
  constructor(private readonly networkElementRepository: NetworkElementRepository) {}

  create = (req: Request, res: Response) => {
    const [ error, networkElementDTO ] = CreateNetworkElementDTO.fromRequest(req.body);
    if (error) return res.status(400).json({ error });
    new NetworkElementUseCase.CreateNetworkElement(this.networkElementRepository)
      .execute(networkElementDTO!)
      .then((networkElement) => {

        if( !networkElement ) throw new Error('Ha Ocuido un Error')

        const { neName, setting, type, vendor } = networkElement

        res.json({
          status: 'success',
          msg: 'The Network Element has been registered successfully',
          payload: networkElement
        });
      })
      .catch((error) => { 
        console.log('NetworkElement Controller', error);
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
  });
  };
}
