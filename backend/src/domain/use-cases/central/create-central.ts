import { ICentralResponse } from '../../../interface';
import { CreateCentralDTO } from '../../dtos';
import { CentralRepository } from '../../repositories';

export interface CreateCentralUseCase {
  execute(dto: CreateCentralDTO): Promise<ICentralResponse>;
}

export class CreateCentral implements CreateCentralUseCase {
  constructor(private readonly repository: CentralRepository) {}
  execute(dto: CreateCentralDTO): Promise<ICentralResponse> {
    return this.repository.create(dto);
  }
}
// import { CreateCentralDTO } from '../../dtos';
// import { CentralEntity } from '../../entities';
// import { CentralRepository } from '../../repositories';

// export interface CreateCentralUseCase {
//     execute( dto: CreateCentralDTO ): Promise<CentralEntity>
// }

// export class CreateCentral implements CreateCentralUseCase {
//     constructor(
//         private readonly repository: CentralRepository
//     ) {}
//     execute( dto: CreateCentralDTO ): Promise<CentralEntity> {
//         return this.repository.create( dto );
//     }
// }
