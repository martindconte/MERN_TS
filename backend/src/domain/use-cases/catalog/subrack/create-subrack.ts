import { ISubrackResponse } from '../../../../interface';
import { CreateSubrackDTO } from '../../../dtos';
import { SubrackRepository } from '../../../repositories';

export interface CreateSubrackUseCase {
  execute(dto: CreateSubrackDTO): Promise<ISubrackResponse>;
}

export class CreateSubrack implements CreateSubrackUseCase {
  constructor(private readonly repository: SubrackRepository) {}
  execute(dto: CreateSubrackDTO): Promise<ISubrackResponse> {
    return this.repository.create(dto);
  }
}
// import { CreateSubrackDTO } from '../../../dtos'
// import { SubrackEntity } from '../../../entities'
// import { SubrackRepository } from '../../../repositories'

// export interface CreateSubrackUseCase {
//     execute( dto: CreateSubrackDTO ): Promise<SubrackEntity>
// }

// export class CreateSubrack implements CreateSubrackUseCase {
//     constructor(
//         private readonly repository: SubrackRepository
//     ) {}
//     execute( dto: CreateSubrackDTO ): Promise<SubrackEntity> {
//         return this.repository.create( dto )
//     }
// }
