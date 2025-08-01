import { ICentral, INESubrack, IVendor, NETypeEnum, OwnerEnum, SettingNEEnum } from '../../../interface';
import { CreateNetworkElementDTO } from '../../dtos';
import { CustomError } from '../../errors/custom.errors';

export class NetworkElementEntity {
  constructor(
    public readonly central: ICentral['id'] | Pick<ICentral, 'id' | 'centralName'>,
    public readonly vendor: IVendor['id'] | Pick<IVendor, 'id' | 'vendorName'>,
    public readonly neName: string,
    public readonly setting: SettingNEEnum,
    public readonly owner: OwnerEnum,
    public readonly type: NETypeEnum,
    public readonly isDeleted: boolean,
    public readonly subracks: INESubrack[],
    public readonly neIp?: string,
    public readonly dbTx?: string,
    public readonly remarks?: string,
    public readonly observations?: string,
    public readonly id?: string, // Optional ID for the entity, can be used for updates or references
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  static fromObject(obj: { [key: string]: any }): NetworkElementEntity {

    const {
      central,
      vendor,
      neName,
      setting,
      owner,
      type,
      isDeleted,
      neIp,
      dbTx,
      remarks,
      observations,
      subracks,
      id = obj._id,
      createdAt,
      updatedAt,
    } = obj;

    return new NetworkElementEntity(
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
      id,
      createdAt,
      updatedAt
    );
  }

  static create(dto: CreateNetworkElementDTO): NetworkElementEntity {
    const { dbTx, subracks } = dto;

    const dbTxFormatted = this.validateDbTxFormat(dbTx);
    this.checkDataSubrack(subracks);

    return new NetworkElementEntity(
      dto.central,
      dto.vendor,
      dto.neName,
      dto.setting,
      dto.owner,
      dto.type,
      dto.isDeleted ?? false,
      dto.subracks ?? [],
      dto.neIp,
      dbTxFormatted,
      dto.remarks,
      dto.observations
    );
  }

  private static validateDbTxFormat(dbTx: string | undefined): string {
    const currentYear = new Date().getFullYear();
    const DBTX_REGEX = /^(\d{1,3})\/(\d{2,4})$/;
    if (!dbTx || !dbTx.trim()) return `/${currentYear}`;
    const match = dbTx.match(DBTX_REGEX);
    if (!match) throw CustomError.badRequest("Formato DBTX inválido. Se espera 'NNN/YYYY' (ej. 001/2025 o 1/23)");
    const [_, numberStr, yearStr] = match;
    const number = parseInt(numberStr, 10);
    let year = parseInt(yearStr, 10);
    if (number < 1 || number > 999) throw CustomError.badRequest('Número DBTX inválido: ${number}. Debe ser entre 001 y 999');
    if (yearStr.length === 2) year += year >= 50 ? 1900 : 2000; // 50-99 → 1950-1999, 00-49 → 2000-2049
    if (year > currentYear + 1) throw CustomError.badRequest('Año DBTX inválido: ${year}. No puede ser mayor a ${currentYear + 1}');
    if (year < 1950 || year > currentYear + 1) throw CustomError.badRequest(`Año DBTX inválido: ${year}. Debe estar entre 1950 y ${currentYear + 1}`);
    return `${number.toString().padStart(3, '0')}/${year}`;
  }

  private static checkDataSubrack(subrack: INESubrack[]): void {
    const unique = new Set<string>();

    for (const { position, shelfName, shelfNumber } of subrack) {
      const key = `${shelfName}-Shelf${shelfNumber}(${position})`;
      if (unique.has(key)) throw CustomError.badRequest(`${key} is Dupplicated`);
      unique.add(key);
    }
  }
}
