import { CentralDatasource, CentralEntity, CentralRepository, CreateCentralDTO, QueriesDTO, UpdateCentralDTO } from '../../../domain';
import { CentralEntityWithPagination, ICentral, ICentralResponse, ICentralSearch, ICentralsResponse } from '../../../interface';

export class CentralRepositoryImpl implements CentralRepository {
  constructor(private readonly datasource: CentralDatasource) {}

  create(CreateCentralDTO: CreateCentralDTO): Promise<ICentralResponse> {
    return this.datasource.create(CreateCentralDTO);
  }
  getAll(queries?: ICentralSearch): Promise<ICentralsResponse> {
    return this.datasource.getAll(queries);
  }
  getById(id: ICentral['id'], queries?: ICentralSearch): Promise<ICentralResponse> {
    return this.datasource.getById(id, queries);
  }
  updateById(updateCentralDTO: UpdateCentralDTO, queries?: ICentralSearch): Promise<ICentralResponse> {
    return this.datasource.updateById(updateCentralDTO, queries);
  }
  delete(id: ICentral['id']): Promise<ICentralResponse> {
    return this.datasource.delete(id);
  }
}
// export class CentralRepositoryImpl implements CentralRepository {

//     constructor(
//         private readonly datasource: CentralDatasource
//     ) {}

//     create( createCentralDTO: CreateCentralDTO ): Promise<CentralEntity> {
//         return this.datasource.create( createCentralDTO )
//     }
//     getAll(  queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination> {
//         return this.datasource.getAll( queries )
//     }
//     getById( id: string ): Promise<CentralEntity> {
//         return this.datasource.getById( id )
//     }
//     updateById( updateCentralDTO: UpdateCentralDTO ): Promise<CentralEntity> {
//         return this.datasource.updateById( updateCentralDTO )
//     }
//     delete( id: string ): Promise<CentralEntity> {
//         return this.datasource.delete( id )
//     }

// }
// import { CentralDatasource, CentralEntity, CentralRepository, CreateCentralDTO, QueriesDTO, UpdateCentralDTO } from "../../../domain";
// import { CentralEntityWithPagination } from "../../../interface";

// export class CentralRepositoryImpl implements CentralRepository {

//     constructor(
//         private readonly datasource: CentralDatasource
//     ) {}

//     create( createCentralDTO: CreateCentralDTO ): Promise<CentralEntity> {
//         return this.datasource.create( createCentralDTO )
//     }
//     getAll(  queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination> {
//         return this.datasource.getAll( queries )
//     }
//     getById( id: string ): Promise<CentralEntity> {
//         return this.datasource.getById( id )
//     }
//     updateById( updateCentralDTO: UpdateCentralDTO ): Promise<CentralEntity> {
//         return this.datasource.updateById( updateCentralDTO )
//     }
//     delete( id: string ): Promise<CentralEntity> {
//         return this.datasource.delete( id )
//     }

// }
