import { IBandwidth, UnitProps } from '../../../interface';
import { CustomError } from '../../errors/custom.errors';

export class SignalEntity {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly subType: string,
    public readonly bandwidth?: IBandwidth[],
    public readonly observation?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, type, subType, bandwidth, observation, createdAt, updatedAt } = object;

    if (!id && !_id) throw CustomError.badRequest("Missinbg id");
    if (!type) throw CustomError.badRequest("Missinbg Type");
    if (!subType) throw CustomError.badRequest("Missinbg SubType");
    // if (bandwidth.length < 1)
    //   throw CustomError.badRequest("Missinbg Bandwidth Data");
    bandwidth.forEach((bw: any) => {
      if (typeof bw.amount !== "number") throw CustomError.badRequest("Invalid amount in Bandwidth");
      if (!Object.values(UnitProps).includes(bw.unit)) throw CustomError.badRequest(`Invalid unit in Bandwidth: ${bw.unit}`);
    });

    const bandwidthMapped = bandwidth.map((bw: IBandwidth ) => ({
      id: 'id' in bw ? bw.id : bw._id,
      amount: bw.amount,
      unit: bw.unit
    }))

    return new SignalEntity(id || _id, type, subType, bandwidthMapped, observation, createdAt, updatedAt);
  }
}
