import { SubrackEntity } from "../../domain"
import { RoadmapEnum, TechnologyEnum } from "./common.interface"

export interface SubrackEntityWithPagination {
    payload: SubrackEntity[]
    pagination: {
        totalDocs: number
        totalPages: number
        prevPage: string | null
        nextPage: string | null
        page: number
        hasPrevPage: boolean
        hasNextPage: boolean
    }
}

export enum TechnologySubrack {
    dwdm = 'DWDM',
    sdh = 'SDH',
    rx = 'RX',
    cwdm = 'CWDM',
    ip = 'IP',
    generic = 'GENERICO'
}

export enum SubrackOwner {
    tasa = 'TASA',
    mvs = 'MVS',
    other = 'OTHER',
}

export enum SubrackStatus {
    inService = 'InService',
    endOfSupport = 'EndOfSupport',
    endOfMarketing = 'EndOfMarketing'
}

export interface ISubarck {
    id: string,
    partNumber: string,
    slots: ISlots[],
    subrackFamily: string,
    subrackType: string,
    totalSlot: number,
    vendor: string,
    boards?: string,
    description?: string,
    model?: string,
    observations?: string,
    owner?: SubrackOwner,
    roadmap?: RoadmapEnum,
    technology?: TechnologyEnum,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ISlots {
    number: number,
    physical: number | string,
    logical: number | string
    boardId?: string[]
}