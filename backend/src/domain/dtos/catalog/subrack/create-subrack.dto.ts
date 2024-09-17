import { findDuplicateByKeys } from "../../../../helpers";
import { ISlots, SubrackOwner, SubrackStatus, TechnologySubrack } from "../../../entities/catalog/subrack.entity";

export class CreateSubrackDTO {

    constructor(
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

    static create(subrack: { [key: string]: any }): [string?, CreateSubrackDTO?] {

        const {
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
        // let newModel: string = ''

        if (!subrackType) throw ['Missing Subrack Type'];
        if (!subrackFamily) throw ['Missing Subrack Family'];
        if (!partNumber && typeof partNumber === 'string') throw ['Missing Part Number'];
        if (!vendor) throw ['Missing Vendor'];
        if (!totalSlot && isNaN(numberTotalSlots)) throw ['Missing Quantity Total Slots and must be a number'];
        if (slots.length < 1) throw ['Slots need to be defined!'];
        if (slots.length !== totalSlot) throw ['The number of Slots must be equal to total Slot!'];

        // Verificación más segura para slot.boardId y boards.
        if (boards.length > 0 && !slots.every((slot: ISlots) => slot.boardId && boards?.includes(slot.boardId))) {
            throw ['Each slot must reference a valid boardId in boards'];
        }

        const portRepeat = findDuplicateByKeys( slots, [ 'number', 'physical', 'logical' ] )
        if( portRepeat ) {
            throw [ `Slot with Port Number: ${ portRepeat.number } / Port Physical ${ portRepeat.physical }  / Port Logical ${ portRepeat.logical } is already registred!` ]
        }

        // if ( typeof partNumber === 'string' ) {
        //     newModel = model && typeof model === 'string' ? model.toUpperCase() : partNumber.toUpperCase();
        // }

        return [undefined, new CreateSubrackDTO(
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
            // subrackFamily,
            // subrackType,
            // totalSlot,
            // vendor.toUpperCase(),
            // boards,
            // description,
            // model.toUpperCase(),
            // observations,
            // owner.toUpperCase(),
            // status.toUpperCase(),
            // technology.toUpperCase(),

        )];
    }
}