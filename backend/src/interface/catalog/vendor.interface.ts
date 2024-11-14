import { BoardEntity, TransceiverEntity, VendorEntity } from '../../domain';

export interface IVendorsDeleted {
    vendors: VendorEntity[];
    transceivers: TransceiverEntity[];
    boards: BoardEntity[];
    //todo subrack: 
}

export type VendorsDeletedType = Omit<IVendorsDeleted, 'vendors'> & {
    vendor: VendorEntity;
  };