import { SignalEntity } from '../../../entities';
import { SignalRepository } from '../../../repositories';

export interface GetSignalsUseCase {
  execute(): Promise<SignalEntity[]>;
}

export class GetSignals implements GetSignalsUseCase {
  constructor(private readonly repository: SignalRepository) {}

  execute(): Promise<SignalEntity[]> {
    return this.repository.getAll();
  }
}
