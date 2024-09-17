import { CreateSubrackDTO, QueriesDTO, UpdateSubrackDTO } from "../../dtos";
import { SubrackEntity } from "../../entities/catalog/subrack.entity";

export interface SubrackEntityWithPagination {
    payload: SubrackEntity[]
    totalDocs: number
    totalPages: number
    prevPage: string | null
    nextPage: string | null
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
}

export abstract class SubrackDatasource {
    abstract create( createSubrackDTO: CreateSubrackDTO ): Promise<SubrackEntity>
    abstract getAll( queries: QueriesDTO ): Promise<SubrackEntity[] | SubrackEntityWithPagination>
    abstract getById( id: string ): Promise<SubrackEntity>
    abstract updateById( updateSubrackDTO: UpdateSubrackDTO ): Promise<SubrackEntity>
    abstract deleteById( id: string ): Promise<SubrackEntity>
}