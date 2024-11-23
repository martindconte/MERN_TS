import { BoardEntity, SubrackEntity, TransceiverEntity } from "../../domain";
import { IPagination } from "./common.interface";

export enum BoardPortType {
    client = 'CLIENT',
    line = 'LINE',
    any = 'ANY'
}

export interface Port {
    // id?: string
    port: number;
    type: BoardPortType;
    physical: string;
    NMS: string;
    equipments?: string[] | Partial<TransceiverEntity>[];
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

export interface IBoardSearch {
    searchParams?:Partial<BoardEntity>;
    paginationData?: IPagination;
    otherQueries?: {[ key: string ]: any }
}

export interface IBoardsDeleted {
    boards: BoardEntity[],
    subracks: SubrackEntity[]
}
