import { helpersDB } from '../../../data';
import { ISlots, ISubrack, IVendor, OwnerEnum, RoadmapEnum, TechnologyEnum } from '../../../interface';
import { CustomError } from '../../errors/custom.errors';

export class SubrackEntity implements ISubrack {
  constructor(
    public readonly id: string,
    public readonly partNumber: string,
    public readonly slots: ISlots[],
    public readonly subrackFamily: string,
    public readonly subrackType: string,
    public readonly totalSlots: number,
    public readonly vendor: Pick<IVendor, 'id' | 'vendorName'>,
    public readonly isDeleted: boolean = false,
    public readonly description?: string,
    public readonly modelName?: string,
    public readonly observations?: string,
    public readonly owner?: OwnerEnum,
    public readonly roadmap?: RoadmapEnum,
    public readonly technology?: TechnologyEnum,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  static get getPublicKeys(): (keyof SubrackEntity)[] {
    return [
      'id',
      'partNumber',
      'slots',
      'subrackFamily',
      'subrackType',
      'totalSlots',
      'vendor',
      'description',
      'modelName',
      'observations',
      'owner',
      'roadmap',
      'technology',
      'createdAt',
      'updatedAt',
    ];
  }

  private static checkDataSlots(slots: ISlots[] | undefined): [string?, ISlots[]?] {
    if (!Array.isArray(slots)) return ['Slots must be Array'];
    const setNumberSlots = new Set<number>();
    const setLogicalSlots = new Set<string>();
    const setPhysicalSlots = new Set<string>();

    for (const slot of slots) {
      const { logical, number, physical, boards = [] } = slot
      if (!logical) return ['Logical Slot is Required and must be a String']
      if (!number || isNaN(number)) return ['Number Slot is Required and must be a Number']
      if (!physical) return ['Physical Slot is Required and must be a String']
      if (boards && boards?.length > 0 && !boards.some(board => typeof board === 'string' ? helpersDB.isMongoID(board) : helpersDB.isMongoID(board.id as string))) return [`Invalid Board for Slot Number ${number}`]

      if (setNumberSlots.has(number)) return [` Port Number ${number} is Duplicated!`];
      if (setLogicalSlots.has(logical)) return [` Logical Number ${number} is Duplicated!`];
      if (setPhysicalSlots.has(physical)) return [` Physical Number ${number} is Duplicated!`];
      
      setNumberSlots.add(number)
      setLogicalSlots.add(logical)
      setPhysicalSlots.add(physical)
    }

    return [ undefined, slots ]
  }

  static fromObject(object: { [key: string]: any }) {
    const {
      id = object._id,
      subrackType,
      subrackFamily,
      partNumber,
      totalSlots,
      slots,
      vendor,
      modelName,
      description,
      owner,
      observations,
      technology,
      roadmap,
      createdAt,
      updatedAt,
      isDeleted = false,
    } = object;

    if (!id) throw CustomError.badRequest('Missinbg id');
    if (!subrackType && typeof subrackType !== 'string') throw CustomError.badRequest('Missinbg Subrack Type');
    if (!subrackFamily && typeof subrackFamily !== 'string') throw CustomError.badRequest('Missinbg Subrack Family');
    if (!partNumber && typeof partNumber !== 'string') throw CustomError.badRequest('Missinbg Part Number');
    if (!vendor) throw CustomError.badRequest('Missinbg Vendor');
    if (!totalSlots) throw CustomError.badRequest('Missinbg Quantity Total Slots and must be a number bigger than 0');
    if (!roadmap) throw CustomError.badRequest('Invalid Roadmap Value in Subrack');
    if (!technology) throw CustomError.badRequest('Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO');
    if (slots && slots.length !== totalSlots) throw CustomError.badRequest('The number of Slots must be equal to total Slot!');
    const [error, slotsCheck] = slots && slots.length > 0 ? this.checkDataSlots(slots) : [undefined, []];
    if (error) throw [error];
    if (!slotsCheck) throw ['SlotsCheck is undefined, but this should not happen based on the logic'];

    //todo: optimizar... no se usa slotsCheck
    return new SubrackEntity(
      id,
      partNumber,
      slotsCheck,
      subrackFamily,
      subrackType,
      +totalSlots,
      { id: vendor._id, vendorName: vendor.vendorName },
      isDeleted,
      description,
      modelName,
      observations,
      owner,
      roadmap,
      technology,
      createdAt,
      updatedAt
    );
  }
}
