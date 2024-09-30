import { CreateSignalDTO, UpdateSignalDTO } from '../../dtos';
import { SignalEntity } from '../../entities';

export abstract class SignalRepository {
    abstract create( CreateSignalDTO: CreateSignalDTO ): Promise<SignalEntity>
    abstract getAll(): Promise<SignalEntity[]>
    abstract getById( id: string ): Promise<SignalEntity>
    abstract updateById( updateSignalDTO: UpdateSignalDTO ): Promise<SignalEntity>
    abstract deleteById( id: string ): Promise<SignalEntity>
}