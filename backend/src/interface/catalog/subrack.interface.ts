import { IBoard } from './board.interface';
import { IPageLimit, IPagination, OwnerEnum, RoadmapEnum, TechnologyEnum } from './common.interface';
import { IVendor } from './vendor.interface';

export enum QueryParamsSubrackEnum {
  isDeleted = 'isDeleted',
  subrackBoardsPorts = 'subrack-boards-ports',
}

export interface IOtherQueries {
  isDeleted: boolean;
  subrackBoardsPorts: boolean;
}

export interface ISlots {
  number: number;
  physical: string;
  logical: string;
  boards?: string[] | Partial<IBoard>[];
}

export interface ISubrack {
  id: string;
  partNumber: string;
  slots: ISlots[];
  subrackFamily: string;
  subrackType: string;
  totalSlots: number;
  vendor: Pick<IVendor, 'id' | 'vendorName'>;
  isDeleted: boolean;
  description?: string;
  modelName?: string;
  observations?: string;
  owner?: OwnerEnum;
  roadmap?: RoadmapEnum;
  technology?: TechnologyEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubrackCreateDTO extends Omit<ISubrack, 'id' | 'slots' | 'vendor' | 'createdAt' | 'updatedAt'> {
  vendor: string;
  slots: {
    number: number;
    physical: string;
    logical: string;
    boards?: string[];
  }[];
}

export interface ISubrackUpdateDTO extends Omit<ISubrack, 'vendor' | 'slots'>{
  vendor: string;
  slots: {
    number: number;
    physical: string;
    logical: string;
    boards?: string[];
  }[];
}

export interface ISubrackResponse
  extends Pick<ISubrack, 'id' | 'partNumber' | 'subrackFamily' | 'subrackType' | 'modelName' | 'vendor' | 'description'> {}

export interface ISubrackSearch {
  searchParams?: Partial<ISubrack>;
  paginationData?: IPageLimit;
  otherQueries?: Partial<IOtherQueries>;
  // otherQueries?: { [key: string]: any };
}

export interface ISubracksResponse {
  payload: Omit<ISubrack, 'slots'>[];
  pagination?: IPagination;
}

export interface ISubrackToClean {
  subrack: ISubrack,
  networkElements: []
}

export interface ISubracksDeleted {
  subracks: ISubrack[];
  networkElement: [];
}
