import { CentralEntity } from "../../domain";

export enum CentralOwner {
    tasa = 'TASA',
    mvs = 'MVS',
    other = 'OTHER',
}

export interface CentralEntityWithPagination {
    payload: CentralEntity[]
    pagination: {
        totalDocs: number;
        totalResults: number;
        totalPages: number;
        prevPage: string | null;
        nextPage: string | null;
        page: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
    }
}