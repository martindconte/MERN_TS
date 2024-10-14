import { BitRatesEnum, BitRatesValues, StatusEnum, TechnologyEnum,  } from '../../../interface';
import { CustomError } from '../../errors/custom.errors';
import { VendorEntity } from './vendor.entity';

export class TransceiverEntity {
  constructor(
    public readonly id: string,
    public readonly partNumber: string,
    public readonly vendor: Partial<VendorEntity>,
    public readonly type?: string,
    public readonly model?: string,
    public readonly description?: string,
    public readonly observations?: string,
    public readonly technology?: TechnologyEnum,
    public readonly bitsRates?: BitRatesEnum[],
    public readonly signals?: { id: string, type: string, subtype: string }[],
    public readonly status?: StatusEnum,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, partNumber, model, vendor, type, description, observations, technology, bitsRates, signals, status, createdAt, updatedAt } = object;

    if (!id && !_id) throw CustomError.badRequest('Missing id');
    if (!partNumber) throw CustomError.badRequest('Missing partNumber Transceiver');
    if (!vendor) throw CustomError.badRequest('Missing vendor');
    if( bitsRates === '' && !Array.isArray(bitsRates) ) throw ['Bits Rates must be Array'];
    if( technology && !Object.values( TechnologyEnum ).includes( technology.toUpperCase() ) ) throw CustomError.badRequest('Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO');
    if (bitsRates && !Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => BitRatesValues.includes(rate))) throw CustomError.badRequest('Invalid bitsRate');
    if (status && !Object.values(StatusEnum).includes(status)) throw CustomError.badRequest('Invalid Status');

    const vendorMapped = {
      id: vendor._id || vendor.id,
      vendorName: vendor.vendorName,
    }

    return new TransceiverEntity(
      id || _id,
      partNumber,
      vendorMapped,
      type,
      model,
      description,
      observations,
      technology,
      bitsRates,
      signals,
      status,
      createdAt,
      updatedAt
    );
  }
}
