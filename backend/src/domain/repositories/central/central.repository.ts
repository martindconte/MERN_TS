import { CentralEntityWithPagination } from "../../datasources/central/central.datasource";
import { CreateCentralDTO, QueriesDTO, UpdateCentralDTO } from "../../dtos";
import { CentralEntity } from "../../entities/central/central.entity";

export abstract class CentralRepository {
    abstract create( centralDTO: CreateCentralDTO ): Promise<CentralEntity>
    abstract getAll( queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination>
    abstract getById( id: string ): Promise<CentralEntity>
    abstract updateById( UpdateCentralDTO: UpdateCentralDTO ): Promise<CentralEntity>
    abstract delete( id: string ): Promise<CentralEntity>
}