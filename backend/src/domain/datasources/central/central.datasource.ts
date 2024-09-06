import { CreateCentralDTO, QueriesDTO, UpdateCentralDTO } from "../../dtos";
import { CentralEntity } from "../../entities/central/central.entity";

export interface CentralEntityWithPagination {
    payload: CentralEntity[]
    totalDocs: number
    totalPages: number
    prevPage: string | null
    nextPage: string | null
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
}

export abstract class CentralDatasource {
    abstract create( CreateCentralDTO: CreateCentralDTO ): Promise<CentralEntity>
    abstract getAll(  queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination>
    abstract getById( id: string ): Promise<CentralEntity>
    abstract updateById( updateCentralDTO: UpdateCentralDTO ): Promise<CentralEntity>
    abstract delete( id: string ): Promise<CentralEntity>
}