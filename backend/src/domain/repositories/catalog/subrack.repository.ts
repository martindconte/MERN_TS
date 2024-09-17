import { SubrackEntityWithPagination } from "../../datasources/catalog/subrack.datasource";
import { CreateSubrackDTO, QueriesDTO, UpdateSubrackDTO } from "../../dtos";
import { SubrackEntity } from "../../entities/catalog/subrack.entity";

export abstract class SubrackRepository {
    abstract create( createSubrackDTO: CreateSubrackDTO ): Promise<SubrackEntity>
    abstract getAll( queries?: QueriesDTO ): Promise<SubrackEntity[] | SubrackEntityWithPagination>
    abstract getById( id: string ): Promise<SubrackEntity>
    abstract updateById( updateSubrackDTO: UpdateSubrackDTO ): Promise<SubrackEntity>
    abstract deleteById( id: string ): Promise<SubrackEntity>
}