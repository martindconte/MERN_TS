// import { BoardEntity, SubrackEntity } from '../../domain';
import { BitsRatesEnum } from './bitsRates.interface';
import { IPageLimit, IPagination, RoadmapEnum, TechnologyEnum } from './common.interface';
import { ISubrack } from './subrack.interface';
import { ITransceiver } from './transceiver.interface';
import { IVendor } from './vendor.interface';

export enum BoardPortType {
  client = 'CLIENT',
  line = 'LINE',
  dwdm = 'DWDM',
  any = 'ANY',
}

export interface IBoard {
  id: string;
  boardName: string;
  partNumber: string;
  vendor: Pick<IVendor, 'id' | 'vendorName'>;
  isDeleted: boolean;
  bitsRates?: BitsRatesEnum[];
  bandwidthMax?: number;
  description?: string;
  observations?: string;
  ports?: Port[];
  slotSize?: number;
  technology?: TechnologyEnum;
  roadmap?: RoadmapEnum;
  createdAt?: string;
  updatedAt?: string;
}

export interface Port {
  port: number;
  type: BoardPortType;
  physical: string;
  NMS: string;
  equipments?: string[] | Partial<ITransceiver>[];
  logicalFacilities?: Record<string, string[]>;
  fullName?: string;
}

export interface IBoardResponse extends Pick<IBoard, 'id' | 'boardName' | 'partNumber' | 'vendor' | 'description'> {}
export interface IBoardsResponse {
  payload: Omit<IBoard, 'bitsRates' | 'ports'>[];
  pagination?: IPagination;
}

export interface IBoardSearch {
  searchParams?: Partial<IBoard>;
  paginationData?: IPageLimit;
  otherQueries?: { [key: string]: any };
}

export interface IBoardToClean {
  board: IBoard,
  subracks: ISubrack[]
}

export interface IBoardsDeleted {
  boards: IBoard[];
  subracks: ISubrack[];
}
