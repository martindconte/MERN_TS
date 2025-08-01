export enum TechnologyEnum {
  dwdm = 'DWDM',
  sdh = 'SDH',
  rx = 'RX',
  cwdm = 'CWDM',
  ip = 'IP',
  generic = 'GENERICO',
}

export enum OwnerEnum {
  tasa = 'TASA',
  mvs = 'MVS',
  other = 'OTHER',
  teco = 'TECO',
  na = 'NA',
}

export enum RoadmapEnum {
  InService = 'InService',
  EndOfSupport = 'EndOfSupport',
  EndOfMarketing = 'EndOfMarketing',
  NA = '',
}

//todo: Optimizar este interface, ya que se repite en varios lugares. Sacar de Calatalog y Central y usar una unica interface
export interface IPageLimit {
  page: number;
  limit: number;
}

//todo: Optimizar este interface, ya que se repite en varios lugares. Sacar de Calatalog y Central y usar una unica interface
export interface IPagination {
  totalDocs: number;
  totalResults: number;
  totalPages: number;
  prevPage: string | null;
  nextPage: string | null;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
