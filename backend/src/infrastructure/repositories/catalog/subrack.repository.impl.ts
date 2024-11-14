import { SubrackRepository, SubrackDatasource, CreateSubrackDTO, SubrackEntity, QueriesDTO, UpdateSubrackDTO } from '../../../domain'
import { SubrackEntityWithPagination } from '../../../interface'

export class SubrackRepositoryImpl implements SubrackRepository {

    //* DI
    constructor(
        private readonly datasource: SubrackDatasource
    ) {}

    create(createSubrackDTO: CreateSubrackDTO): Promise<SubrackEntity> {
        return this.datasource.create( createSubrackDTO )
    }
    getAll(queries: QueriesDTO): Promise<SubrackEntity[] | SubrackEntityWithPagination> {
        return this.datasource.getAll( queries )
    }
    getById(id: string): Promise<SubrackEntity> {
        return this.datasource.getById( id )
    }
    updateById(updateSubrackDTO: UpdateSubrackDTO): Promise<SubrackEntity> {
        return this.datasource.updateById( updateSubrackDTO )
    }
    deleteById(id: string): Promise<SubrackEntity> {
        return this.datasource.deleteById( id )
    }
}