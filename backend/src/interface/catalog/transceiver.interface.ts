// import { BoardEntity, TransceiverEntity } from "../../domain";
import { BitsRatesEnum } from './bitsRates.interface';
import { IBoard } from './board.interface';
import { IPageLimit, IPagination, RoadmapEnum, TechnologyEnum } from './common.interface';
import { IVendor } from './vendor.interface';

export interface ITransceiver {
  id: string;
  partNumber: string;
  vendor: Pick<IVendor, 'id' | 'vendorName'>;
  isDeleted: boolean;
  type?: string;
  modelName?: string;
  description?: string;
  observations?: string;
  technology?: TechnologyEnum;
  bitsRates?: BitsRatesEnum[];
  roadmap?: RoadmapEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransceiversResponse {
  payload: ITransceiver[];
  pagination?: IPagination;
}

export interface ITransceiversDeleted {
  transceivers: ITransceiver[];
  boards: IBoard[];
  // subracks: SubrackEntity[],
}

export interface ITransceiverSearch {
  searchParams?: Partial<ITransceiver>;
  paginationData?: IPageLimit;
  otherQueries?: { [key: string]: any };
}

export interface ITransceiverToClean {
  transceiver: ITransceiver;
  Boards: IBoard[];
}

export type ITransceiverDeleted = Omit<ITransceiversDeleted, 'transceivers'> & {
  transceiver: ITransceiver;
};
