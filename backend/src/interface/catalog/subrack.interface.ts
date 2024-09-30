import { SubrackEntity } from "../../domain"

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

export interface ISlots {
    number: number,
    physical: number | string,
    logical: number | string
    boardId?: string[]
}