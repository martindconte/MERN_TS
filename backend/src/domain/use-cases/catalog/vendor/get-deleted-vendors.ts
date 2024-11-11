import { IVendorsDeleted } from '../../../../interface';
import { VendorRepository } from '../../../repositories';

export interface GetDeletedVendorsUseCase {
    execute(): Promise<IVendorsDeleted>;
};

export class GetDeleteVendors implements GetDeletedVendorsUseCase {
    constructor(
        private readonly respository: VendorRepository
    ){}
    execute(): Promise<IVendorsDeleted> {
        return this.respository.getAllDeleted();
    }
};