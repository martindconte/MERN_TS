import { CentralEntity } from '../../entities';
import { CreateCentralDTO, QueriesDTO, UpdateCentralDTO } from '../../dtos';
import { CentralEntityWithPagination } from '../../../interface';

export abstract class CentralRepository {
    abstract create( centralDTO: CreateCentralDTO ): Promise<CentralEntity>
    abstract getAll( queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination>
    abstract getById( id: string ): Promise<CentralEntity>
    abstract updateById( UpdateCentralDTO: UpdateCentralDTO ): Promise<CentralEntity>
    abstract delete( id: string ): Promise<CentralEntity>
}