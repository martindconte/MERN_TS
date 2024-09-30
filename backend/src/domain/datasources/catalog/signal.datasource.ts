import { CreateSignalDTO, UpdateSignalDTO } from '../../dtos';
import { SignalEntity } from '../../entities';

export abstract class SignalDataSource {
    abstract create( createSignalDTO: CreateSignalDTO ): Promise<SignalEntity>
    abstract getAll(): Promise<SignalEntity[]>
    abstract getById( id: string ): Promise<SignalEntity>
    abstract updateById( updateSignalDTO: UpdateSignalDTO ): Promise<SignalEntity>
    abstract deleteById( id: string ): Promise<SignalEntity>
}