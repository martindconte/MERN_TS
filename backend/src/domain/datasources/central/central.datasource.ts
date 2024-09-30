import { CentralEntityWithPagination } from "../../../interface";
import { CreateCentralDTO, QueriesDTO, UpdateCentralDTO } from "../../dtos";
import { CentralEntity } from "../../entities";

export abstract class CentralDatasource {
    abstract create( CreateCentralDTO: CreateCentralDTO ): Promise<CentralEntity>
    abstract getAll(  queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination>
    abstract getById( id: string ): Promise<CentralEntity>
    abstract updateById( updateCentralDTO: UpdateCentralDTO ): Promise<CentralEntity>
    abstract delete( id: string ): Promise<CentralEntity>
}