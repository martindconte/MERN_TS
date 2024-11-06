import { TransceiverEntity } from "../../domain";

export enum TechnologyEnum {
    dwdm = 'DWDM',
    sdh = 'SDH',
    rx = 'RX',
    cwdm = 'CWDM',
    ip = 'IP',
    generic = 'GENERICO'
};

export enum StatusEnum {
    InService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    NA = '',
}

export interface TransceiverEntityWithPagination {
    payload: TransceiverEntity[];
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