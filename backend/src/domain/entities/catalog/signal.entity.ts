import { IBandwidth, UnitProps } from '../../../interface';
import { CustomError } from '../../errors/custom.errors';

export class SignalEntity {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly subType: string,
    public readonly bandwidth?: IBandwidth,
    public readonly observation?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, type, subType, bandwidth, observation, createdAt, updatedAt } = object;

    if (!id && !_id) throw CustomError.badRequest("Missinbg id");
    if (!type) throw CustomError.badRequest("Missinbg Type");
    if (!subType) throw CustomError.badRequest("Missinbg SubType");
    if( bandwidth && Object.keys(bandwidth).length > 0 ) {
      if (typeof bandwidth.amount !== "number") throw ["Invalid amount in Bandwidth"];
      if (!Object.values(UnitProps).includes(bandwidth.unit)) throw [`Invalid unit in Bandwidth: ${bandwidth.unit}`];
    }

    return new SignalEntity(id || _id, type, subType, bandwidth, observation, createdAt, updatedAt);
  }
}
