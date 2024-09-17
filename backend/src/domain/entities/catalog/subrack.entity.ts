import { CustomError } from "../../errors/custom.errors"

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

export class SubrackEntity {

    constructor(
        public readonly id: string,
        public readonly partNumber: string,
        public readonly slots: ISlots[],
        public readonly subrackFamily: string,
        public readonly subrackType: string,
        public readonly totalSlot: number,
        public readonly vendor: string,
        public readonly boards?: string,
        public readonly description?: string,
        public readonly model?: string,
        public readonly observations?: string,
        public readonly owner?: SubrackOwner,
        public readonly status?: SubrackStatus,
        public readonly technology?: TechnologySubrack,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,

    ) { }

    static fromObject(object: { [key: string]: any }) {

        const {
            id,
            _id,
            subrackType,
            subrackFamily,
            partNumber,
            totalSlot,
            slots,
            vendor,
            model,
            description,
            owner,
            observations,
            technology,
            boards,
            status,
            createdAt,
            updatedAt,
        } = object;

        const numberTotalSlots = +totalSlot;
        // const numberServiceSlots = +serviceSlot

        if (!id && !id) throw CustomError.badRequest('Missinbg id')
        if (!subrackType) throw CustomError.badRequest('Missinbg Subrack Type')
        if (!subrackFamily) throw CustomError.badRequest('Missinbg Subrack Family')
        if (!partNumber) throw CustomError.badRequest('Missinbg Part Number')
        if (!vendor) throw CustomError.badRequest('Missinbg Vendor')
        // if (!serviceSlot && isNaN(numberServiceSlots)) throw CustomError.badRequest('Missinbg Quantity Service Slots and must be a Number')
        if (!totalSlot && isNaN(numberTotalSlots) && numberTotalSlots > 0 ) throw CustomError.badRequest('Missinbg Quantity Total Slots and must be a number bigger than 0')
        if ( slots.length < 0 ) throw CustomError.badRequest('Slots need to be defined!')
        // if (numberServiceSlots > numberTotalSlots) throw CustomError.badRequest('Service slot quantity cannot exceed the total number of slots available on the chassis')

        return new SubrackEntity(
            id || _id,
            partNumber,
            slots,
            subrackFamily,
            subrackType,
            totalSlot,
            vendor,
            boards,
            description,
            model,
            observations,
            owner,
            status,
            technology,
            createdAt,
            updatedAt,
        );

    }
}