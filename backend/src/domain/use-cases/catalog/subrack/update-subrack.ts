import { ISubrackResponse, ISubrackSearch } from '../../../../interface';
import { UpdateSubrackDTO } from '../../../dtos';
import { SubrackRepository } from '../../../repositories';

export interface UpdateSubrackUseCase {
  execute(dto: UpdateSubrackDTO, queries?: ISubrackSearch): Promise<ISubrackResponse>;
}

export class UpdateSubrack implements UpdateSubrackUseCase {
  constructor(private readonly repository: SubrackRepository) {}
  execute(dto: UpdateSubrackDTO, queries?: ISubrackSearch): Promise<ISubrackResponse> {
    return this.repository.updateById(dto, queries);
  }
}
