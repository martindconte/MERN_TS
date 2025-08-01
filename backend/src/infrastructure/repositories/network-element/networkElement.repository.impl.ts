import { NetworkElementDatasource, NetworkElementEntity, NetworkElementRepository } from '../../../domain';
import { INetworkElementPopulate } from '../../../interface';

export class NetworkElementRepositoyImpl implements NetworkElementRepository {
  constructor(private readonly datasource: NetworkElementDatasource) {}

  create(networkElementData: NetworkElementEntity): Promise<NetworkElementEntity> {
    return this.datasource.create( networkElementData );
  }

  //! Read Only
  getPopulatedById(id: string): Promise<INetworkElementPopulate | null> {
    return this.datasource.getPopulatedById( id )
  }
}
