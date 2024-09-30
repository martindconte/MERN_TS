import { IBandwidth, UnitProps } from '../../../../interface';

export class CreateSignalDTO {
  private constructor(
    public readonly type: string,
    public readonly subType: string,
    public readonly bandwidth?: IBandwidth[],
    public readonly observation?: string
  ) {}

  static create(signal: { [key: string]: any }): [string?, CreateSignalDTO?] {
    const { type, subType, bandwidth, observation } = signal;

    if (!type) throw ["Missinbg Type"];
    if (!subType) throw ["Missinbg SubType"];
    // if (bandwidth.length < 1) throw ["Missinbg Bandwidth Data"];
    bandwidth.forEach((bw: any) => {
      if (typeof bw.amount !== "number") throw ["Invalid amount in Bandwidth"];
      if (!Object.values(UnitProps).includes(bw.unit)) throw [`Invalid unit in Bandwidth: ${bw.unit}`];
    });

    return [ undefined, new CreateSignalDTO(type, subType, bandwidth, observation) ];
  }
}
