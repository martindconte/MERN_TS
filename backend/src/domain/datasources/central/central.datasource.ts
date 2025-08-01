import { ICentral, ICentralResponse, ICentralSearch, ICentralsResponse } from "../../../interface";
import { CreateCentralDTO, UpdateCentralDTO } from "../../dtos";

export abstract class CentralDatasource {
    abstract create( createCentralDTO: CreateCentralDTO ): Promise<ICentralResponse>
    abstract getAll(  queries?: ICentralSearch ): Promise<ICentralsResponse>
    abstract getById( id: ICentral['id'], queries?: ICentralSearch ): Promise<ICentralResponse>
    abstract updateById( updateCentralDTO: UpdateCentralDTO, queries?: ICentralSearch ): Promise<ICentralResponse>
    abstract delete( id: ICentral['id'] ): Promise<ICentralResponse>
}


// import { CentralEntityWithPagination } from "../../../interface";
// import { CreateCentralDTO, QueriesDTO, UpdateCentralDTO } from "../../dtos";
// import { CentralEntity } from "../../entities";

// export abstract class CentralDatasource {
//     abstract create( CreateCentralDTO: CreateCentralDTO ): Promise<CentralEntity>
//     abstract getAll(  queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination>
//     abstract getById( id: string ): Promise<CentralEntity>
//     abstract updateById( updateCentralDTO: UpdateCentralDTO ): Promise<CentralEntity>
//     abstract delete( id: string ): Promise<CentralEntity>
// }