import { BitsRatesEnum, RoadmapEnum, TechnologyEnum,  } from '../../../interface';
import { CustomError } from '../../errors/custom.errors';
import { VendorEntity } from './vendor.entity';

export class TransceiverEntity {
  constructor(
    public readonly id: string,
    public readonly partNumber: string,
    public readonly vendor: Partial<VendorEntity>,
    public readonly type?: string,
    public readonly modelName?: string,
    public readonly description?: string,
    public readonly observations?: string,
    public readonly technology?: TechnologyEnum,
    public readonly bitsRates?: BitsRatesEnum[],
    // public readonly signals?: { id: string, type: string, subtype: string }[],
    public readonly roadmap?: RoadmapEnum,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static fromObject(object: {[ key: string ]: any }) {
    const { id = object._id, partNumber, modelName, vendor, type, description, observations, technology, bitsRates, roadmap, createdAt, updatedAt } = object;
    // const { id, _id, partNumber, model, vendor, type, description, observations, technology, bitsRates, signals, status, createdAt, updatedAt } = object;

    if( !id ) throw CustomError.badRequest(`Missing id - id: ${id} - partNumber: ${ partNumber }`);
    if( !partNumber ) throw CustomError.badRequest('Missing partNumber Transceiver');
    if( !vendor ) throw CustomError.badRequest('Missing vendor');
    if( bitsRates === '' && !Array.isArray(bitsRates) ) throw CustomError.badRequest('Bits Rates must be Array');
    if( technology && !Object.values( TechnologyEnum ).includes( technology.toUpperCase() ) ) throw CustomError.badRequest('Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO');
    if( bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate)) ) CustomError.badRequest('Invalid bitsRate');
    if( roadmap && !Object.values( RoadmapEnum ).includes( roadmap )) throw CustomError.badRequest('Invalid Status');

    const vendorMapped = {
      id: vendor._id || vendor.id,
      vendorName: vendor.vendorName,
    }

    return new TransceiverEntity(
      id,
      partNumber,
      vendorMapped,
      type,
      modelName,
      description,
      observations,
      technology,
      bitsRates,
      // signals,
      roadmap,
      createdAt,
      updatedAt
    );
  }
}
