import { SubrackRepository, SubrackDatasource, CreateSubrackDTO, SubrackEntity, QueriesDTO, UpdateSubrackDTO } from '../../../domain'
import { ISubrackResponse, ISubrackSearch, ISubracksResponse, ISubrack, ISubracksDeleted } from '../../../interface';

export class SubrackRepositoryImpl implements SubrackRepository {
        constructor(
        private readonly datasource: SubrackDatasource
    ) {}
    create(createSubrackDTO: CreateSubrackDTO): Promise<ISubrackResponse> {
        return this.datasource.create( createSubrackDTO )
    }
    getAll(queries: ISubrackSearch): Promise<ISubracksResponse> {
        return this.datasource.getAll( queries )
    }
    getById(id: ISubrack['id'], queries?: ISubrackSearch): Promise<ISubrack> {
        return this.datasource.getById( id, queries )
    }
    updateById(updateSubrackDTO: UpdateSubrackDTO, queries?: ISubrackSearch): Promise<ISubrackResponse> {
        return this.datasource.updateById( updateSubrackDTO, queries )
    }
    deleteById(id: ISubrack['id']): Promise<ISubrackResponse> {
        return this.datasource.deleteById( id )
    }
    getAllDeleted(): Promise<ISubracksDeleted> {
        return this.datasource.getAllDeleted()
    }
    clean(id: ISubrack['id']): Promise<ISubrackResponse> {
        return this.datasource.clean( id )
    }

    //* DI
    // constructor(
    //     private readonly datasource: SubrackDatasource
    // ) {}

    // create(createSubrackDTO: CreateSubrackDTO): Promise<SubrackEntity> {
    //     return this.datasource.create( createSubrackDTO )
    // }
    // getAll(queries: QueriesDTO): Promise<SubrackEntity[] | SubrackEntityWithPagination> {
    //     return this.datasource.getAll( queries )
    // }
    // getById(id: string): Promise<SubrackEntity> {
    //     return this.datasource.getById( id )
    // }
    // updateById(updateSubrackDTO: UpdateSubrackDTO): Promise<SubrackEntity> {
    //     return this.datasource.updateById( updateSubrackDTO )
    // }
    // deleteById(id: string): Promise<SubrackEntity> {
    //     return this.datasource.deleteById( id )
    // }
}