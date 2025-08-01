import mongoose from 'mongoose';
import { helpersDB, NetworkElementModel } from '../../../data';
import { NetworkElementDatasource, NetworkElementEntity } from '../../../domain';
import { NetworkElementResponseDTO } from '../../../domain/dtos/network-element/response-networkElement.dto';
import { INetworkElementPopulate } from '../../../interface';

export class NetworkElementDatasourceImpl implements NetworkElementDatasource {
  async create(networkElementData: NetworkElementEntity): Promise<NetworkElementEntity> {
    const { neName } = networkElementData;

    try {
      const duplicateNE = await NetworkElementModel.findOne({ neName });
      if (duplicateNE) throw new Error('DataSource Impl | Network Element already exists');
      const newNetworkElement = await NetworkElementModel.create(networkElementData);
      return NetworkElementEntity.fromObject(newNetworkElement.toObject());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //! Read Only!!! Para Retorno de Entidades Populadas!!!! No utilizar en DOMINIO
  async getPopulatedById(id: string): Promise<INetworkElementPopulate | null> {
    const networkElement = await NetworkElementModel.findOne({ _id: id })
      .populate([
        { path: 'central', select: 'centralName' },
        { path: 'vendor', select: 'vendorName' },
        // Popula la referencia 'id' de cada subrack
        { path: 'subracks.id', select: 'partNumber modelName subrackType subrackFamily' },
        // Popula la referencia 'board.id' de cada slot dentro de cada subrack
        { 
          path: 'subracks.slots.board.id',
          model: 'Board',
          select: 'partNumber boardName vendor',
          populate: { path: 'vendor', model: 'Vendor', select: 'vendorName' }
        },
        {
          path: 'subracks.slots.board.ports.equipment',
          select: 'partNumber modelName type technology bitsRates'
        }
      ])
      .lean();
    if (!networkElement) return null;
    console.log(networkElement);
    return NetworkElementResponseDTO.NEPopulate(networkElement);
  }
  catch(error: Error) {
    console.log('error -->', error);
    throw error;
  }
}
// }
