import { helpersDB } from '../../../../data';
import { ISubrackUpdateDTO, OwnerEnum, RoadmapEnum, TechnologyEnum } from '../../../../interface';

export class UpdateSubrackDTO implements ISubrackUpdateDTO {
  constructor(
    public readonly id: string,
    public readonly partNumber: string,
    public readonly slots: { number: number; physical: string; logical: string; boards?: string[] }[],
    public readonly subrackFamily: string,
    public readonly subrackType: string,
    public readonly totalSlots: number,
    public readonly vendor: string,
    public readonly isDeleted: boolean,
    public readonly description?: string | undefined,
    public readonly modelName?: string | undefined,
    public readonly observations?: string | undefined,
    public readonly owner?: OwnerEnum | undefined,
    public readonly roadmap?: RoadmapEnum | undefined,
    public readonly technology?: TechnologyEnum | undefined,
    public readonly createdAt?: Date | undefined,
    public readonly updatedAt?: Date | undefined
  ) {}

  private static checkDataSlots(slots: UpdateSubrackDTO['slots'] | undefined): [string?, UpdateSubrackDTO['slots']?] {
    if (!Array.isArray(slots)) return ['Slots must be Array'];
    const setNumberSlots = new Set<number>();
    const setLogicalSlots = new Set<string>();
    const setPhysicalSlots = new Set<string>();

    for (const slot of slots) {
      const { logical, number, physical, boards } = slot;
      if (!logical && typeof logical !== 'string') return ['Logical Slot is Required and must be a String'];
      if (!number || isNaN(number)) return ['Number Slot is Required and must be a Number'];
      if (!physical && typeof physical !== 'string') return ['Physical Slot is Required and must be a String'];
      if (boards && !boards.some((board) => helpersDB.isMongoID(board))) return [`Invalid Board for Slot Number ${number}`];

      if (setNumberSlots.has(number)) return [`Port Number ${number} is Duplicated!`];
      if (setLogicalSlots.has(logical)) return [`Logical Number ${number} is Duplicated!`];
      if (setPhysicalSlots.has(physical)) return [`Physical Number ${number} is Duplicated!`];

      setNumberSlots.add(number);
      setLogicalSlots.add(logical);
      setPhysicalSlots.add(physical);
    }

    return [undefined, slots];
  }

  static update(subrack: UpdateSubrackDTO): [string?, UpdateSubrackDTO?] {
    const {
      id,
      isDeleted = false,
      partNumber,
      slots,
      subrackFamily,
      subrackType,
      totalSlots,
      vendor,
      createdAt,
      description,
      modelName,
      observations,
      owner,
      roadmap,
      technology,
      updatedAt,
    } = subrack;

    const numberTotalSlots: number = +totalSlots;

    if (!id && helpersDB.isMongoID(id)) throw ['Missing Id'];
    if (!subrackType && typeof subrackType !== 'string') throw ['Missing Subrack Type'];
    if (!subrackFamily && typeof subrackFamily !== 'string') throw ['Missing Subrack Family'];
    if (!partNumber && typeof partNumber !== 'string') throw ['Missing Part Number'];
    if (!vendor && helpersDB.isMongoID(vendor)) throw ['Missing Vendor. Invalid value'];
    if (!totalSlots && isNaN(numberTotalSlots)) throw ['Missing Quantity Total Slots and must be a number'];
    if (roadmap && !Object.values(RoadmapEnum).includes(roadmap)) throw ['Invalid Status'];
    if (technology && !Object.values(TechnologyEnum).includes(technology))
      throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
    if (!slots) ['Slots is Required!'];
    if (slots.length !== totalSlots) throw ['The number of Slots must be equal to total Slot!'];
    const [error, slotsCheck] = slots.length > 0 ? this.checkDataSlots(slots) : ['Slots is Required'];
    if (error) throw [error];
    if (!slotsCheck) throw ['SlotsCheck is undefined, but this should not happen based on the logic'];

    return [
      undefined,
      new UpdateSubrackDTO(
        id,
        partNumber,
        slotsCheck,
        subrackFamily,
        subrackType,
        totalSlots,
        vendor,
        isDeleted,
        description,
        modelName ? modelName : partNumber,
        observations,
        owner,
        roadmap,
        technology,
        createdAt,
        updatedAt
      ),
    ];
  }
}