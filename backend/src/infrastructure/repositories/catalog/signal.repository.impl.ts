import { CreateSignalDTO, SignalDataSource, SignalEntity, SignalRepository, UpdateSignalDTO, UpdateVendorDTO, VendorDataSource, VendorEntity, VendorRepository } from '../../../domain';

export class SignalRepositoryImpl implements SignalRepository {

    constructor(
        private readonly datasource: SignalDataSource
    ) {}

    create(CreateSignalDTO: CreateSignalDTO): Promise<SignalEntity> {
        return this.datasource.create( CreateSignalDTO )
    }

    getAll(): Promise<SignalEntity[]> {
        return this.datasource.getAll()
    }

    getById(id: string): Promise<SignalEntity> {
        return this.datasource.getById( id )
    }

    updateById(updateSignalDTO: UpdateSignalDTO): Promise<SignalEntity> {
        return this.datasource.updateById( updateSignalDTO )
    }

    deleteById(id: string): Promise<SignalEntity> {
        return this.datasource.deleteById( id )
    }

}