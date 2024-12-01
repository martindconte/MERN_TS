import { helpersDB } from '../../../data';
import { BitsRatesEnum, BoardPortType, IBoard, ITransceiver, IVendor, Port, RoadmapEnum, TechnologyEnum } from '../../../interface';
import { CustomError } from '../../errors/custom.errors';

export class BoardEntity implements IBoard {
  constructor(
    public readonly id: string,
    public readonly boardName: string,
    public readonly partNumber: string,
    public readonly vendor: Pick<IVendor, 'id' | 'vendorName'>,
    public readonly isDeleted: boolean,
    public readonly bitsRates?: BitsRatesEnum[],
    public readonly bandwidthMax?: number | undefined,
    public readonly description?: string | undefined,
    public readonly observations?: string | undefined,
    public readonly ports?: Port[] | undefined,
    public readonly slotSize?: number | undefined,
    public readonly technology?: TechnologyEnum | undefined,
    public readonly roadmap?: RoadmapEnum | undefined,
    public readonly createdAt?: string | undefined,
    public readonly updatedAt?: string | undefined
  ) {}

  static get getPublicKeys(): (keyof BoardEntity)[] {
    return [
      'id',
      'boardName',
      'partNumber',
      'vendor',
      'bitsRates',
      'description',
      'observations',
      'bandwidthMax',
      'ports',
      'slotSize',
      'technology',
      'roadmap',
      'createdAt',
      'updatedAt',
    ];
  }

  private static checkDataPorts(ports: Port[] | undefined): [string?, Port[]?] {
    if (!ports || ports.length < 0) return [undefined, []];
    if (!Array.isArray(ports)) return ['Ports must be Array'];
    const setPortsValues = new Set<number>();

    for (const port of ports) {
      const { NMS, physical, type, equipments = [], fullName, port: portNumber, logicalFacilities } = port;

      if (!portNumber && typeof portNumber !== 'number') return ['PortNumber is Required and must be a Number'];
      if (type === undefined || !Object.values(BoardPortType).includes(type)) return ['Invalid port type'];
      if (!physical && typeof physical !== 'string') return ['PortPhysical is Required and must be a String'];
      if (!NMS && typeof NMS !== 'string') return ['PortNMS is Required and must be a String'];
      if (fullName && typeof fullName !== 'string') return ['Full Name Must be a String'];
      if (equipments.length > 0 && !equipments.some(equipment => typeof equipment === 'string' ? helpersDB.isMongoID( equipment ) : helpersDB.isMongoID(equipment.id as string)))
        return [`Invalid Equipment value! ${fullName}`];

      if (logicalFacilities) {
        const keysSet = new Set<string>();
        const valuesSet = new Set<string>();

        for (const [key, values] of Object.entries(logicalFacilities)) {
          if (keysSet.has(key)) return [`Key "${key}" is duplicated`];

          for (const value of values) {
              if (valuesSet.has(value)) return [`value ${value} is Duplicated!`];
              valuesSet.add(value);
            
            // for (const data of value) {
            //   if (valuesSet.has(data)) return [`value ${data} is Duplicated!`];
            //   valuesSet.add(data);
            // }
          }
        }
      }

      if (setPortsValues.has(port.port)) return [` Port Number ${port.port} is Duplicated!`];
      setPortsValues.add(port.port);
    }

    const updatePorts = ports.map((port) => ({
      ...port,
      logicalFacilities: port.logicalFacilities instanceof Map ? Object.fromEntries(port.logicalFacilities) : port.logicalFacilities,
    }));

    return [undefined, updatePorts];
  }

  static fromObject(object: { [key: string]: any }) {
    const {
      id = object._id,
      bandwidthMax,
      boardName,
      partNumber,
      vendor,
      isDeleted = false,
      bitsRates = [],
      description,
      observations,
      ports = [],
      slotSize,
      technology,
      roadmap,
      createdAt,
      updatedAt,
    } = object;

    if (!id) throw CustomError.badRequest('Missing id Entity Board');
    if (!boardName) throw CustomError.badRequest('Missing BoardName Board');
    if (!partNumber) throw CustomError.badRequest('Missing partNumber Board');
    if (!vendor) throw CustomError.badRequest('Missing vendor');
    if (bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate)))
      throw ['Invalid bitsRate'];
    if (technology && !Object.values(TechnologyEnum).includes(technology.toUpperCase()))
      throw CustomError.badRequest('Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO');
    if (roadmap && !Object.values(RoadmapEnum).includes(roadmap)) throw CustomError.badRequest('Invalid Status');
    if (typeof slotSize !== 'number' && slotSize < 0) throw CustomError.badRequest('Invalid Status');
    const [error, portsCheck] = ports.length > 0 ? BoardEntity.checkDataPorts(ports) : [ undefined, [] ]
    if (error) throw [error];

    return new BoardEntity(
      id,
      boardName,
      partNumber,
      { id: vendor._id, vendorName: vendor.vendorName },
      isDeleted || false,
      bitsRates,
      bandwidthMax,
      description,
      observations,
      portsCheck,
      slotSize,
      technology,
      roadmap,
      createdAt,
      updatedAt
    );
  }
}

// import { helpersDB } from "../../../data";
// import { BitsRatesEnum, BoardPortType, Port, RoadmapEnum, TechnologyEnum } from "../../../interface";
// import { CustomError } from "../../errors/custom.errors";
// import { TransceiverEntity } from "./transceiver.entity";
// import { VendorEntity } from "./vendor.entity";

// export class BoardEntity {
//     constructor(
//         public readonly id: string,
//         public readonly boardName: string,
//         public readonly partNumber: string,
//         public readonly vendor: Partial<VendorEntity>,
//         public readonly bitsRates: string[],
//         private readonly isDeleted: boolean = false,
//         public readonly bandwidthMax?: number,
//         public readonly description?: string,
//         public readonly observations?: string,
//         public readonly ports?: Port[],
//         public readonly slotSize?: number,
//         public readonly technology?: TechnologyEnum,
//         public readonly roadmap?: RoadmapEnum,
//         public readonly createdAt?: string,
//         public readonly updatedAt?: string,
//     ) { }

//     static get getPublicKeys(): (keyof BoardEntity)[] {
//         return [
//             'id',
//             'boardName',
//             'partNumber',
//             'vendor',
//             'bitsRates',
//             'description',
//             'observations',
//             'bandwidthMax',
//             'ports',
//             'slotSize',
//             'technology',
//             'roadmap',
//             'createdAt',
//             'updatedAt',
//         ];
//     }

//     private static checkDataPorts(ports: Port[] | undefined): [string?, Port[]?] {

//         if (!ports || ports.length < 0) return [undefined, []]
//         if (!Array.isArray(ports)) return ['Ports must be Array'];
//         const setPortsValues = new Set<number>()

//         for (const port of ports) {

//             const { NMS, physical, type, equipments = [], fullName, port: portNumber, logicalFacilities } = port

//             if (!portNumber && typeof portNumber !== 'number') return ['PortNumber is Required and must be a Number'];
//             if (type === undefined || !Object.values(BoardPortType).includes(type)) return ['Invalid port type'];
//             if (!physical && typeof physical !== 'string') return ['PortPhysical is Required and must be a String'];
//             if (!NMS && typeof NMS !== 'string') return ['PortNMS is Required and must be a String'];
//             if (fullName && typeof fullName !== 'string') return ['Full Name Must be a String'];
//             if ( equipments.length > 0 && !equipments.some((equipment: Partial<TransceiverEntity>) => helpersDB.isMongoID(equipment.id as string))) return [`Invalid Equipment value! ${fullName}`];

//             if (logicalFacilities) {
//                 const keysSet = new Set<string>();
//                 const valuesSet = new Set<string>();

//                 for (const [key, values] of Object.entries(logicalFacilities)) {

//                     if (keysSet.has(key)) return [`Key "${key}" is duplicated`];

//                     for (const value of values) {
//                         for (const data of value) {
//                             if (valuesSet.has(data)) return [`${data} is Duplicated!`];
//                             valuesSet.add(data)
//                         };
//                     };
//                 };
//             };

//             if (setPortsValues.has(port.port)) return [` Port Number ${port.port} is Duplicated!`];
//             setPortsValues.add(port.port);
//         };

//         const updatePorts = ports.map( port => ({
//             ...port,
//             logicalFacilities: port.logicalFacilities instanceof Map
//                 ? Object.fromEntries( port.logicalFacilities )
//                 : port.logicalFacilities
//         }))

//         return [undefined, updatePorts]
//     }

//     // static fromObject(object: BoardEntity) {
//     static fromObject(object: { [key: string]: any }) {

//         const { id = object._id, bandwidthMax, boardName, partNumber, vendor, bitsRates, description, observations, ports = [], slotSize, technology, roadmap, createdAt, updatedAt } = object

//         if (!id) throw CustomError.badRequest('Missing id Entity Board');
//         if (!boardName) throw CustomError.badRequest('Missing BoardName Board');
//         if (!partNumber) throw CustomError.badRequest('Missing partNumber Board');
//         if (!vendor) throw CustomError.badRequest('Missing vendor');
//         if (bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate))) throw ['Invalid bitsRate'];
//         if (technology && !Object.values(TechnologyEnum).includes(technology.toUpperCase())) throw CustomError.badRequest('Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO');
//         if (roadmap && !Object.values(RoadmapEnum).includes(roadmap)) throw CustomError.badRequest('Invalid Status');
//         if (typeof slotSize !== 'number' && slotSize < 0) throw CustomError.badRequest('Invalid Status');
//         const [error, portsCheck] = BoardEntity.checkDataPorts(ports)
//         if (error) throw [error]

//         return new BoardEntity(
//             id,
//             boardName,
//             partNumber,
//             { id: vendor.id, vendorName: vendor.vendorName },
//             bitsRates,
//             false,
//             bandwidthMax,
//             description,
//             observations,
//             portsCheck,
//             slotSize,
//             technology,
//             roadmap,
//             createdAt,
//             updatedAt,
//         )
//     }
// }
