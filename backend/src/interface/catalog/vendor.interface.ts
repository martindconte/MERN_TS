import { BoardEntity, TransceiverEntity, VendorEntity } from '../../domain';

export interface IVendorsDeleted {
    vendors: VendorEntity[];
    transceivers: TransceiverEntity[];
    boards: BoardEntity[];
}

export type VendorsDeletedType = Omit<IVendorsDeleted, 'vendors'> & {
    vendor: VendorEntity;
  };