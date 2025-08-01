import { CentralOwnerEnum } from '../../../interface';

export class UpdateCentralDTO {
  private constructor(
    public readonly id: string,
    public readonly centralName: string,
    public readonly codeName: string,
    public readonly siteCode: string,
    public readonly owner: CentralOwnerEnum,
    public readonly status: boolean,
    public readonly provinceName?: string,
    public readonly districtName?: string,
    public readonly localityName?: string,
    public readonly address?: string,
    public readonly latitude?: number,
    public readonly longitude?: number,
    public readonly description?: string,
    public readonly observations?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly isDeleted: boolean = false // Default to false if not provided
  ) {}

  static update(central: { [key: string]: any }): [string?, UpdateCentralDTO?] {
    const {
      id,
      centralName,
      codeName,
      siteCode,
      owner,
      status,
      provinceName,
      districtName,
      localityName,
      address,
      latitude,
      longitude,
      description,
      observations,
      createdAt,
      updatedAt,
      isDeleted,
    } = central;

    if (!id) return ['from UPDATE DTO | Missing id to Update Central'];
    if (!centralName) return ['from UPDATE DTO | Missing Central Name'];
    if (!codeName) return ['from UPDATE DTO | Missing Code Name'];
    if (!siteCode) return ['from UPDATE DTO | Missing Site Code'];
    if (!owner) return ['from UPDATE DTO | Missing Owner'];
    if (status === undefined || status === null || typeof status !== 'boolean') return ['from UPDATE DTO | status must be boolean and is required'];
    if (typeof latitude !== 'number' || typeof longitude !== 'number') return ['from UPDATE DTO | Latitude and Longitude must be a number'];
    if (typeof isDeleted !== 'boolean' && isDeleted === undefined) return ['from UPDATE DTO |  isDeleted must be boolean and is required!'];

    return [
      undefined,
      new UpdateCentralDTO(
        id,
        centralName,
        codeName,
        siteCode,
        owner,
        status,
        provinceName,
        districtName,
        localityName,
        address,
        latitude,
        longitude,
        description,
        observations,
        createdAt,
        updatedAt,
        isDeleted ? isDeleted : false // Default to false if not provided
      ),
    ];
  }
}
