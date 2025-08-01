import { CentralEntity } from '../../domain';

export enum CentralOwnerEnum {
  tasa = 'TASA',
  mvs = 'MVS',
  other = 'OTHER',
}

interface IPaginationCentral {
  totalDocs: number;
  totalResults: number;
  totalPages: number;
  prevPage: string | null;
  nextPage: string | null;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface CentralEntityWithPagination {
  payload: CentralEntity[];
  pagination: {
    totalDocs: number;
    totalResults: number;
    totalPages: number;
    prevPage: string | null;
    nextPage: string | null;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface ICentral {
  id: string;
  centralName: string
  codeName: string
  siteCode: string
  owner: CentralOwnerEnum
  status: boolean
  isDeleted: boolean
  provinceName?: string
  districtName?: string
  localityName?: string
  address?: string
  latitude?: number
  longitude?: number
  description?: string
  observations?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ICentralResponse extends Pick<
  ICentral,
  | 'id'
  | 'centralName'
  | 'codeName'
  | 'siteCode'
  | 'description'
> { }

export interface ICentralsResponse {
  payload: ICentral[];
  pagination?: IPaginationCentral;
}

export interface ICentralSearch {
  searchParams?: Partial<ICentral>;
  paginationData?: { page: number; limit: number };
  otherQueries?: { [key: string]: any };
}