import { ISubrack, ISubrackResponse, ISubracksDeleted, ISubrackSearch, ISubracksResponse } from '../../../interface'
import { CreateSubrackDTO, UpdateSubrackDTO } from '../../dtos'

export abstract class SubrackDatasource {
    abstract create( createSubrackDTO: CreateSubrackDTO ): Promise<ISubrackResponse>
    abstract getAll( queries: ISubrackSearch ): Promise<ISubracksResponse>
    abstract getById( id: ISubrack['id'], queries?: ISubrackSearch ): Promise<ISubrack>
    abstract updateById( updateSubrackDTO: UpdateSubrackDTO, queries?: ISubrackSearch ): Promise<ISubrackResponse>
    abstract deleteById( id: ISubrack['id'] ): Promise<ISubrackResponse>
    abstract getAllDeleted(): Promise<ISubracksDeleted>;
    abstract clean( id: ISubrack['id'] ): Promise<ISubrackResponse>;
}
// import { SubrackEntityWithPagination } from '../../../interface'
// import { CreateSubrackDTO, QueriesDTO, UpdateSubrackDTO } from '../../dtos'
// import { SubrackEntity } from '../../entities'

// export abstract class SubrackDatasource {
//     abstract create( createSubrackDTO: CreateSubrackDTO ): Promise<SubrackEntity>
//     abstract getAll( queries: QueriesDTO ): Promise<SubrackEntity[] | SubrackEntityWithPagination>
//     abstract getById( id: string ): Promise<SubrackEntity>
//     abstract updateById( updateSubrackDTO: UpdateSubrackDTO ): Promise<SubrackEntity>
//     abstract deleteById( id: string ): Promise<SubrackEntity>
// }