import { findDuplicateByKeys } from "../../../../helpers";
import { ISlots, SubrackOwner, SubrackStatus, TechnologySubrack } from "../../../../interface";

export class UpdateSubrackDTO {

    constructor(
        public readonly id: string,
        public readonly partNumber: string,
        public readonly slots: ISlots[],
        public readonly subrackFamily: string,
        public readonly subrackType: string,
        public readonly totalSlot: number,
        public readonly vendor: string,
        public readonly boards?: string[],
        public readonly description?: string,
        public readonly model?: string,
        public readonly observations?: string,
        public readonly owner?: SubrackOwner,
        public readonly status?: SubrackStatus,
        public readonly technology?: TechnologySubrack,
    ) { }

    static create(subrack: { [key: string]: any }): [ string?, UpdateSubrackDTO? ] {

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
            boards = [],
            status,
        } = subrack;

        const numberTotalSlots: number = +totalSlot;
        // const numberServiceSlots: number = +serviceSlot
        // let newModel: string  = ''

        if (!subrackType) throw ['Missing Subrack Type'];
        if (!subrackFamily) throw ['Missing Subrack Family'];
        if (!partNumber && typeof partNumber === 'string') throw ['Missing Part Number'];
        if (!vendor) throw ['Missing Vendor'];
        if (!totalSlot && isNaN(numberTotalSlots)) throw ['Missing Quantity Total Slots and must be a number'];
        if (slots.length < 1) throw ['Slots need to be defined!'];
        if (slots.length !== totalSlot) throw ['The number of Slots must be equal to total Slot!'];
        
        const portRepeat = findDuplicateByKeys( slots, [ 'number', 'physical', 'logical' ] );
        if( portRepeat && Object.keys(portRepeat).length > 0 ) throw [ `Slot with Port Number: ${ portRepeat.number } / Port Physical ${ portRepeat.physical }  / Port Logical ${ portRepeat.logical } is already registred!` ];
        // newModel = !model ? partNumber.toUpperCase() : model

        return [undefined, new UpdateSubrackDTO(
            id || _id,
            partNumber,
            slots,
            subrackFamily,
            subrackType,
            totalSlot,
            vendor.toUpperCase(),
            boards,
            description,
            model.toUpperCase(),
            observations,
            owner.toUpperCase(),
            status,
            technology.toUpperCase(),
        )];

    }
}