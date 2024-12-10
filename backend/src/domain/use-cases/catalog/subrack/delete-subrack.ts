import { ISubrack, ISubrackResponse } from '../../../../interface';
import { SubrackRepository } from '../../../repositories';

export interface DeleteSubrackUseCase {
  execute(id: ISubrack['id']): Promise<ISubrackResponse>;
}

export class DeleteSubrack implements DeleteSubrackUseCase {
  constructor(private readonly repository: SubrackRepository) {}
  execute(id: ISubrack['id']): Promise<ISubrackResponse> {
    return this.repository.deleteById(id);
  }
}
// import { SubrackEntity } from '../../../entities';
// import { SubrackRepository } from '../../../repositories';

// export interface DeleteSubrackUseCase {
//     execute( id: string ): Promise<SubrackEntity>
// }

// export class DeleteSubrack implements DeleteSubrackUseCase {
//     constructor(
//         private readonly repository: SubrackRepository
//     ) {}
//     execute( id: string ): Promise<SubrackEntity> {
//         return this.repository.deleteById( id );
//     }
// }
