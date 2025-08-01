import {
  ICentral,
  INEBoardPopulate,
  INEPorts,
  INESlotsPopulate,
  INESubracksPopulate,
  INetworkElementPopulate,
  IVendor,
  NETypeEnum,
  OwnerEnum,
  SettingNEEnum,
} from '../../../interface';
import { CustomError } from '../../errors/custom.errors';

interface INetworkElementResponseDTO extends INetworkElementPopulate {}

export class NetworkElementResponseDTO implements INetworkElementResponseDTO {
  constructor(
    public readonly id: string,
    public readonly central: Pick<ICentral, 'id' | 'centralName'>,
    public readonly vendor: Pick<IVendor, 'id' | 'vendorName'>,
    public readonly neName: string,
    public readonly setting: SettingNEEnum,
    public readonly owner: OwnerEnum,
    public readonly type: NETypeEnum,
    public readonly isDeleted: boolean,
    public readonly subracks: INESubracksPopulate[],
    public readonly neIp?: string | undefined,
    public readonly dbTx?: string | undefined,
    public readonly remarks?: string | undefined,
    public readonly observations?: string | undefined,
    public readonly createdAt?: Date | undefined,
    public readonly updatedAt?: Date | undefined
  ) {}

  static NEPopulate(document: { [key: string]: any }): NetworkElementResponseDTO {
    const {
      _id,
      id = _id,
      central,
      vendor,
      neName,
      setting,
      owner,
      type,
      isDeleted,
      subracks,
      neIp,
      dbTx,
      remarks,
      observations,
      createdAt,
      updatedAt,
    } = document;

    if (!id) throw CustomError.badRequest('Missing Id NetworkElement');
    if (!central || !(typeof central === 'object') || !central._id || !central.centralName) throw CustomError.badRequest('Missing Central Data');
    if (!neName) throw CustomError.badRequest('Missing Central Network Element Name');
    if (!setting || !Object.values(SettingNEEnum).includes(setting)) throw ['Invalid Setting'];
    if (!owner || !Object.values(OwnerEnum).includes(owner)) throw ['Invalid Owner'];
    if (!type || !Object.values(NETypeEnum).includes(type)) throw ['Invalid Network Element Type'];
    if (isDeleted !== undefined && typeof isDeleted !== 'boolean') throw ['isDeleted must be a boolean'];
    if (neIp && typeof neIp !== 'string') throw ['NE IP must be a string'];
    if (dbTx && typeof dbTx !== 'string') throw ['DBTx must be a string'];
    if (remarks && typeof remarks !== 'string') throw ['Remarks must be a string'];
    if (observations && typeof observations !== 'string') throw ['Observations must be a string'];

    return new NetworkElementResponseDTO(
      id,
      { id: central.id || central._id, centralName: central.centralName },
      { id: vendor.id || vendor._id, vendorName: vendor.vendorName },
      neName,
      setting,
      owner,
      type,
      isDeleted,
      NetworkElementResponseDTO.subrackPopulated(subracks),
      neIp,
      dbTx,
      remarks,
      observations,
      createdAt,
      updatedAt
    );
  }

  private static subrackPopulated(subracks: any[]): INESubracksPopulate[] {
    if (!Array.isArray(subracks)) return [];

    for (const data of subracks) {
      console.log(data);
    }

    return subracks.map((s) => ({
      id: s.id?._id.toString?.() ?? s.id?.id.toString?.(),
      partNumber: s.id.partNumber ?? 'Error - Missing partNumber',
      modelName: s.id.modelName ?? 'Error - Missing modelName',
      subrackType: s.id.subrackType ?? 'Error - Missing Subrack Type',
      subrackFamily: s.id.subrackFamily ?? 'Error - Missing Subrack Family',
      slots: this.slotsPopulate(s.slots),
    }));
  }

  private static slotsPopulate(slots: any[]): INESlotsPopulate[] {
    if (!Array.isArray(slots)) return [];

    return slots.map((slot) => ({
      number: slot.number,
      physical: slot.physical,
      logical: slot.logical,
      board: slot.board ? this.boardPopulate(slot.board) : undefined,
    }));
  }

  private static boardPopulate(board: any): INEBoardPopulate {
    return {
      id: board.id.id ? board.id.id.toString() : board.id._id.toString(),
      partNumber: board?.id.partNumber ?? 'Error - Missing Part Number',
      boardName: board?.id.boardName ?? 'Error - Missing Board Name',
      vendor: {
        id: board?.id.vendor.id || board?.id.vendor._id || 'Error - vendor Id en Board',
        vendorName: board?.id.vendor.vendorName ?? 'Error - vendor name en Board',
      },
      ports: this.extractPorts(board?.ports),
    };
  }

  private static extractPorts(ports: any[]): INEPorts[] {
    if (!Array.isArray(ports)) return [];

    return ports.map((p) => ({
      port: p.port,
      type: p.type ?? '',
      physical: p.physical ?? '',
      NMS: p.physical ?? '',
      path: p.path ?? undefined,
      equipment: p.equipment
        ? {
            id: p.equipment.id || p.equipment._id,
            partNumber: p.equipment.partNumber ?? '',
            modelName: p.equipment.modelName ?? '',
            type: p.equipment.type ?? '',
            technology: p.equipment.technology ?? '',
            bitsRates: p.equipment.bitsRates ?? '',
          }
        : undefined,
    }));
  }
}
