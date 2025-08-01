import { CentralEntityWithPagination, ICentralSearch, ICentralsResponse } from '../../../interface';
import { QueriesDTO } from '../../dtos';
import { CentralEntity } from '../../entities';
import { CentralRepository } from '../../repositories';

export interface GetCentralsUseCase {
  execute(queries?: ICentralSearch): Promise<ICentralsResponse>;
}

export class GetCentrals implements GetCentralsUseCase {
  constructor(private readonly repository: CentralRepository) {}
  execute(queries?: ICentralSearch): Promise<ICentralsResponse> {
    return this.repository.getAll(queries);
  }
}
// import { CentralEntityWithPagination } from '../../../interface';
// import { QueriesDTO } from '../../dtos';
// import { CentralEntity } from '../../entities';
// import { CentralRepository } from '../../repositories';

// export interface GetCentralsUseCase {
//     execute( queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination>
// }

// export class GetCentrals implements GetCentralsUseCase {
//     constructor(
//         private readonly repository: CentralRepository
//     ) {}
//     execute( queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination> {
//         return this.repository.getAll( queries);
//     }
// }
