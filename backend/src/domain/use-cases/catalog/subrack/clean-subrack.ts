import { ISubrack, ISubrackResponse } from '../../../../interface';
import { SubrackRepository } from '../../../repositories';

interface CleanSubrackUseCase {
  execute(id: ISubrack['id']): Promise<ISubrackResponse>;
}

export class CleanSubrack implements CleanSubrackUseCase {
  constructor(private readonly repository: SubrackRepository) {}
  execute(id: ISubrack['id']): Promise<ISubrackResponse> {
    return this.repository.clean(id);
  }
}
