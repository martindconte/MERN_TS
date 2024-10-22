import { BoardEntity } from "../../domain";

export enum BoardTechnologyEnum {
    dwdm = 'DWDM',
    sdh = 'SDH',
    rx = 'RX',
    cwdm = 'CWDM',
    ip = 'IP',
    generic = 'GENERICO'
};

export enum BoardStatusEnum {
    InService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    NA = '',
}

export enum BoardPortType {
    client = 'CLIENT',
    line = 'LINE',
    any = 'ANY'
}

export interface Port {
    port: number;
    type: BoardPortType;
    physical: string;
    NMS: string;
    equipment?: string[];
    logicalFacilities?: Record<string, string[]>,
    fullName?: string;
};

export interface BoardEntityWithPagination {
    payload: BoardEntity[];
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
};
