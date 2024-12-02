// import { BoardEntity, TransceiverEntity } from "../../domain";
import { BitsRatesEnum } from "./bitsRates.interface";
import { IBoard } from "./board.interface";
import { IPageLimit, IPagination, RoadmapEnum, TechnologyEnum } from "./common.interface";
import { IVendor } from "./vendor.interface";

//! NO UTILIZAR --> PASARA A ROADMAP
// export enum StatusEnumNO {
//     InService = 'InService',
//     EndOfSupport = 'EndOfSupport',
//     EndOfMarketing = 'EndOfMarketing',
//     NA = '',
// };

export interface ITransceiver {
  id: string;
  partNumber: string;
  vendor: Pick<IVendor, 'id' | 'vendorName'>
  isDeleted: boolean;
  type?: string;
  modelName?: string;
  description?: string;
  observations?: string;
  technology?: TechnologyEnum;
  bitsRates?: BitsRatesEnum[];
  roadmap?: RoadmapEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransceiversResponse {
    payload: ITransceiver[];
    pagination?: IPagination;
  }

// export interface TransceiverEntityWithPagination {
//     payload: TransceiverEntity[];
//     pagination: {
//         totalDocs: number;
//         totalResults: number;
//         totalPages: number;
//         prevPage: string | null;
//         nextPage: string | null;
//         page: number;
//         hasPrevPage: boolean;
//         hasNextPage: boolean;
//     };
// };

export interface ITransceiversDeleted {
    transceivers: ITransceiver[],
    boards: IBoard[],
    // subracks: SubrackEntity[],
}

export interface ITransceiverSearch {
    searchParams?: Partial<ITransceiver>;
    paginationData?: IPageLimit;
    otherQueries?: { [key: string]: any };
  }

  export interface ITransceiverToClean {
    transceiver: ITransceiver,
    Boards: IBoard[],
  }

export type ITransceiverDeleted = Omit<ITransceiversDeleted, 'transceivers'> & {
    transceiver: ITransceiver;
  };