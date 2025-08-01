import { CreateNetworkElementDTO } from '../../dtos';
import { NetworkElementResponseDTO } from '../../dtos/network-element/response-networkElement.dto';
import { NetworkElementEntity } from '../../entities/network-element/networkElement.entity';
import { NetworkElementRepository } from '../../repositories';

export interface CreateNetworkElementUseCase {
  execute(dto: CreateNetworkElementDTO): Promise<NetworkElementResponseDTO | null>;
}

export class CreateNetworkElement implements CreateNetworkElementUseCase {
  constructor(private readonly repository: NetworkElementRepository) {}
  async execute(dto: CreateNetworkElementDTO): Promise<NetworkElementResponseDTO | null> {
    const networkElement = NetworkElementEntity.create(dto);
    const networkElementCreated = await this.repository.create(networkElement);
    return await this.repository.getPopulatedById( networkElementCreated.id! )
    // const populate2 = await this.repository.getPopulatedById( populate.id! )

  //   if (!populate2) {
  //   throw new Error(`CreateNetworkElement | Failed to retrieve populated NetworkElement with id: ${networkElement.id}`);
  // }

  //   return new NetworkElementResponseDTO(
  //     populate2.id,
  //     populate2.central,
  //     populate2.vendor,
  //     populate2.neName,
  //     populate2.setting,
  //     populate2.owner,
  //     populate2.type,
  //     populate2.isDeleted,
  //     populate2.subracks,
  //     populate2.neIp,
  //     populate2.dbTx,
  //     populate2.remarks,
  //     populate2.observations,
  //     populate2.createdAt,
  //     populate2.updatedAt,
  //   )
  }
}
// import { CreateNetworkElementDTO } from '../../dtos';
// import { NetworkElementEntity } from '../../entities/network-element/networkElement.entity';
// import { NetworkElementRepository } from '../../repositories';

// export interface CreateNetworkElementUseCase {
//   execute(dto: CreateNetworkElementDTO): Promise<NetworkElementEntity>;
// }

// export class CreateNetworkElement implements CreateNetworkElementUseCase {
//   constructor(private readonly repository: NetworkElementRepository) {}
//   execute(dto: CreateNetworkElementDTO): Promise<NetworkElementEntity> {
//     const networkElement = NetworkElementEntity.create(dto);
//     return this.repository.create(networkElement);
//   }
// }
