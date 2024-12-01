import { BoardEntity, TransceiverEntity, VendorEntity } from '../../domain';

export interface IVendor {
    readonly id: string,
    readonly vendorName: string,
    readonly observation?: string,
    readonly country?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
}

export interface IVendorsDeleted {
    vendors: VendorEntity[];
    transceivers: TransceiverEntity[];
    boards: BoardEntity[];
    //todo subrack: 
}

export type VendorsDeletedType = Omit<IVendorsDeleted, 'vendors'> & {
    vendor: VendorEntity;
  };