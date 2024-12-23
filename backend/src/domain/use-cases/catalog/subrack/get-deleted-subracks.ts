import { ISubracksDeleted } from '../../../../interface';
import { SubrackRepository } from '../../../repositories';

export interface GetDeletedSubracksUseCase {
  execute(): Promise<ISubracksDeleted>;
}

export class GetDeletedSubracks implements GetDeletedSubracksUseCase {
  constructor(private readonly respository: SubrackRepository) {}
  execute(): Promise<ISubracksDeleted> {
    return this.respository.getAllDeleted();
  }
}
