import { BoardEntity, SubrackEntity, TransceiverEntity } from "../../domain";
import { BitsRatesEnum } from "./bitsRates.interface";
import { RoadmapEnum, TechnologyEnum } from "./common.interface";
import { IVendor } from "./vendor.interface";

//! NO UTILIZAR --> PASARA A ROADMAP
export enum StatusEnumNO {
    InService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    NA = '',
};

export interface ITransceiver {
    readonly id: string;
    readonly partNumber: string;
    readonly vendor: Pick<IVendor, 'id' | 'vendorName'>
    readonly type?: string;
    readonly modelName?: string;
    readonly description?: string;
    readonly observations?: string;
    readonly technology?: TechnologyEnum;
    readonly bitsRates?: BitsRatesEnum[];
    readonly roadmap?: RoadmapEnum;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
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

export interface ITransceiversDeleted {
    transceivers: TransceiverEntity[],
    boards: BoardEntity[],
    // subracks: SubrackEntity[],
}

export type ITransceiverDeleted = Omit<ITransceiversDeleted, 'transceivers'> & {
    transceiver: TransceiverEntity;
  };