import { SubrackEntity } from '../../entities';
import { SubrackEntityWithPagination } from '../../../interface';
import { CreateSubrackDTO, QueriesDTO, UpdateSubrackDTO } from '../../dtos';

export abstract class SubrackRepository {
    abstract create( createSubrackDTO: CreateSubrackDTO ): Promise<SubrackEntity>
    abstract getAll( queries?: QueriesDTO ): Promise<SubrackEntity[] | SubrackEntityWithPagination>
    abstract getById( id: string ): Promise<SubrackEntity>
    abstract updateById( updateSubrackDTO: UpdateSubrackDTO ): Promise<SubrackEntity>
    abstract deleteById( id: string ): Promise<SubrackEntity>
}