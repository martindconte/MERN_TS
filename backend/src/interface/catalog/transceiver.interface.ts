import { TransceiverEntity } from "../../domain";

export const BitRatesValues = [
    "STM-1", "STM-4", "STM-16", "STM-64", "OC-3", "OC-12", "OC-48", "OC-192",
    "FE", "GE", "10GE WAN", "10GE LAN", "25GE", "40GE", "50GE", "100GE",
    "200GE", "400GE", "FlexE 100G unaware", "FlexE 200G unaware", "FDDI",
    "ESCON", "FC100/FICON", "FC200/FICON Express", "FC400/FICON4G", "FC800/FICON8G",
    "FC1200/FICON10G", "FC1600", "FC3200", "OTU1", "OTU2", "OTU2e", "OTU4",
    "OCH", "DVB-ASI", "SD-SDI", "HD-SDI", "HD-SDIRBR", "3G-SDI", "3G-SDIRBR"
] as const;

export type BitRatesEnum = typeof BitRatesValues[number];

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