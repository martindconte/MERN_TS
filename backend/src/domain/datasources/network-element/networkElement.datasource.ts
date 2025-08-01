import { INetworkElementPopulate } from '../../../interface';
import { NetworkElementEntity } from '../../entities/network-element/networkElement.entity';

export abstract class NetworkElementDatasource {
  abstract create(networkElementData: NetworkElementEntity): Promise<NetworkElementEntity>;

  //! Read Only!!!
  abstract getPopulatedById(id: string): Promise<INetworkElementPopulate | null>;
  // abstract getAllPopulated(): Promise<INetworkElementPopulated[]>;
  // abstract getAll( queries: ISubrackSearch ): Promise<ISubracksResponse>
  // abstract getById( id: ISubrack['id'], queries?: ISubrackSearch ): Promise<ISubrack>
  // abstract updateById( updateSubrackDTO: UpdateSubrackDTO, queries?: ISubrackSearch ): Promise<ISubrackResponse>
  // abstract deleteById( id: ISubrack['id'] ): Promise<ISubrackResponse>
  // abstract getAllDeleted(): Promise<ISubracksDeleted>;
  // abstract clean( id: ISubrack['id'] ): Promise<ISubrackResponse>;
}
