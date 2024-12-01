export enum TechnologyEnum {
    dwdm = 'DWDM',
    sdh = 'SDH',
    rx = 'RX',
    cwdm = 'CWDM',
    ip = 'IP',
    generic = 'GENERICO'
};

export enum RoadmapEnum {
    InService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    NA = '',
}

export interface IPageLimit {
    page: number,
    limit: number
}

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
  