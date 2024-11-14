import { BoardEntity, SubrackEntity, TransceiverEntity } from "../../domain";

//! NO UTILIZAR --> PASARA A ROADMAP
export enum StatusEnumNO {
    InService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    NA = '',
};

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

export interface ITransceiversDeleted {
    transceivers: TransceiverEntity[],
    boards: BoardEntity[],
    subracks: SubrackEntity[],
}

export type ITransceiverDeleted = Omit<ITransceiversDeleted, 'transceivers'> & {
    transceiver: TransceiverEntity;
  };