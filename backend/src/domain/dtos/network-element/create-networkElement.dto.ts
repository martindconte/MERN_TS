import { helpersDB } from '../../../data';
import {
  BoardPortType,
  ICentral,
  INEPort,
  INESubrack,
  INetworkElement,
  IVendor,
  NETypeEnum,
  OwnerEnum,
  PathType,
  SettingNEEnum,
} from '../../../interface';

interface INetworkElementCreateDTO extends Omit<INetworkElement, 'id' | 'createdAt' | 'updatedAt'> {}

export class CreateNetworkElementDTO implements INetworkElementCreateDTO {
  constructor(
    public readonly central: ICentral['id'],
    public readonly vendor: IVendor['id'],
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
  ) {}

  static fromRequest(body: { [key: string]: any }): [string?, CreateNetworkElementDTO?] {
    const { central, vendor, neName, setting, owner, type, isDeleted, neIp, dbTx, remarks, observations, subracks } = body;

    // Se verifica los datos propios de Network Element
    if (!central || !helpersDB.isMongoID(central)) throw ['Create DTO NE | Missing or invalid Central'];
    if (!vendor || !helpersDB.isMongoID(vendor)) throw ['Create DTO NE | Missing or invalid Vendor'];
    if (!neName || typeof neName !== 'string') throw ['Create DTO NE | Missing Network Element Name'];
    if (!setting || !Object.values(SettingNEEnum).includes(setting)) throw ['Create DTO NE | Invalid Setting'];
    if (!owner || !Object.values(OwnerEnum).includes(owner)) throw ['Create DTO NE | Invalid Owner'];
    if (!type || !Object.values(NETypeEnum).includes(type)) throw ['Create DTO NE | Invalid Network Element Type'];
    if (isDeleted !== undefined && typeof isDeleted !== 'boolean') throw ['Create DTO NE | isDeleted must be a boolean'];
    if (neIp && typeof neIp !== 'string') throw ['Create DTO NE | NE IP must be a string'];
    if (dbTx && typeof dbTx !== 'string') throw ['Create DTO NE | DBTx must be a string'];
    if (remarks && typeof remarks !== 'string') throw ['Create DTO NE | Remarks must be a string'];
    if (observations && typeof observations !== 'string') throw ['Create DTO NE | Observations must be a string'];

    const subrackObjIdCheck: INESubrack[] = subracks.length > 0 ? this.checkObjectId(subracks) : [];

    this.validateSubracks(subrackObjIdCheck);

    return [
      undefined,
      new CreateNetworkElementDTO(central, vendor, neName, setting, owner, type, isDeleted, subrackObjIdCheck, neIp, dbTx, remarks, observations ),
    ];
  }

  // Validacion de ObjectId | Tambien se valida cuando debe ser Objeto o Array
  private static checkObjectId(subracksData: INESubrack[]): INESubrack[] {
    return subracksData.map(({ id, shelfNumber, slots, ...restSubrack }) => {
      if (!id || !helpersDB.isMongoID(id)) throw [`Create DTO NE | ** Shelf: ${shelfNumber} ** | Shelf Id must be a valid Mongo ID`];

      if (!Array.isArray(slots) || slots.length === 0)
        throw [`Create DTO NE | ** Shelf: ${shelfNumber} ** | Subrack slots must be a non-empty array`];

      const validatedSlots = slots.map(({ number: slotNumber, board, ...restSlot }) => {
        if (board) {
          const { id: boardId, ports = [], ...restBoard } = board;

          if (typeof board !== 'object' || !boardId || !helpersDB.isMongoID(boardId))
            throw [`Create DTO NE | ** Shelf: ${shelfNumber} - Slot: ${slotNumber} ** | Slot board must be an object with a valid Mongo ID`];

          const validatedPorts = Array.isArray(ports)
            ? ports.map(({ port: portNumber, equipment, path, ...restPort }) => {
                if (!path || typeof path !== 'object') {
                  throw [`Create DTO NE | ** Shelf: ${shelfNumber} - Slot: ${slotNumber} - Port: ${portNumber} ** | Path must be an object`];
                }
                // Normalizar path.id si es string vacío
                if (path.id === '') {
                  path.id = undefined;
                }

                // Validar si hay id y no es un MongoID
                if (path.id && !helpersDB.isMongoID(path.id)) {
                  throw [
                    `Create DTO NE | ** Shelf: ${shelfNumber} - Slot: ${slotNumber} - Port: ${portNumber} ** | Path.id must be a valid Mongo ID`,
                  ];
                }
                return {
                  ...restPort,
                  port: portNumber,
                  path,
                  equipment: equipment || undefined,
                };
              })
            : [];
          return {
            ...restSlot,
            number: slotNumber,
            board: {
              ...restBoard,
              id: boardId,
              ports: validatedPorts,
            },
          };
        }
        return {
          ...restSlot,
          number: slotNumber,
          board: undefined,
        };
      });
      return {
        ...restSubrack,
        id,
        shelfNumber,
        slots: validatedSlots,
      };
    });
  }

  // Validacion de tipo de dato
  private static validateSubracks(subracksData: INESubrack[]): void {
    for (const [indexSubrck, { position, shelfName, shelfNumber, slots }] of subracksData.entries()) {
      if (!position || typeof position !== 'string') throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack position must be a string`];
      if (!shelfName || typeof shelfName !== 'string') throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfName must be a string`];
      if (typeof shelfNumber !== 'number') throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfNumber must be a number`];
      this.validateSlots(slots, indexSubrck);
    }
  }

  // Validacion de tipo de dato
  private static validateSlots(slotsData: INESubrack['slots'], indexSubrack: number): void {
    for (const [indexSlot, { number, physical, logical, board }] of slotsData.entries()) {
      if (!number || typeof number !== 'number')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot} ** | Slot number must be a Number`];
      if (!physical || typeof physical !== 'string')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot} ** | Slot physical must be a string`];
      if (!logical || typeof logical !== 'string')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot} ** | Slot logical must be a string`];
      if (board !== undefined) this.validatePorts(board.ports, indexSubrack, indexSlot);
    }
  }

  // Validacion de tipo de dato
  private static validatePorts(portsData: INEPort[], indexSubrack: number, indexSlot: number): void {
    for (const [indexPort, { port, physical, NMS, type, fullName, equipment, logicalFacilities, path }] of portsData.entries()) {
      if (!port || typeof port !== 'number')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port name must be a number`];
      if (!physical || typeof physical !== 'string')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port physical must be a string`];
      if (!NMS || typeof NMS !== 'string')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port NMS must be a string`];
      if (!type || !Object.values(BoardPortType).includes(type))
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port type must be a valid BoardPortType`];
      if (!fullName || typeof fullName !== 'string')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port fullName must be a string`];
      if (logicalFacilities && typeof logicalFacilities !== 'object')
        throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port logicalFacilities must be an object`];
      this.validatePath(path, indexSubrack, indexSlot, indexPort);
    }
  }

  // Validacion de tipo de dato
  private static validatePath(pathData: INEPort['path'], indexSubrack: number, indexSlot: number, indexPort: number): void {
    const { plannerId, IUId, pathName, datoBasico, type, client, available, observation } = pathData;
    if (plannerId && typeof plannerId !== 'string')
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path plannerId must be a string`];
    if (IUId && typeof IUId !== 'string')
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path IUId must be a string`];
    if (pathName && typeof pathName !== 'string')
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path name must be a string`];
    if (datoBasico && typeof datoBasico !== 'string')
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path datoBasico must be a string`];
    if (type && typeof type !== 'string' && !Object.values(PathType).includes(type))
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path type must be a valid PathType`];
    if (client && typeof client !== 'string')
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path client must be a string`];
    if (available !== undefined && typeof available !== 'boolean')
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path available must be a boolean`];
    if (observation && typeof observation !== 'string')
      throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path observation must be a string`];
  }
}

// private static checkObjectId(subracksData: INESubrack[]): INESubrack[] {
//   return subracksData.map((subrack) => {
//     if (!Array.isArray(subrack.slots) || subrack.slots.length === 0)
//       throw [`Create DTO NE | ** Shelf: ${subrack.shelfNumber} ** | Subrack slots must be an array and cannot be empty`];

//     subrack.slots = subrack.slots.map((slot) => {
//       if (slot.board && (typeof slot.board !== 'object' || !slot.board.id || !helpersDB.isMongoID(slot.board.id)))
//         throw [`Create DTO NE | ** Shelf: ${subrack.shelfNumber} - Slot: ${slot.number} ** | Slot board must be an object with a valid Mongo ID`];
//       // Sanitizar solo si es inválido o vacío
//       if (!slot.board) {
//         slot.board = undefined;
//       } else {
//         if (Array.isArray(slot.board.ports && slot.board.ports.length > 0)) {
//           slot.board.ports = slot.board.ports.map((port) => {
//             if (!port.equipment || port.equipment === '') port.equipment = undefined;
//             if (!port.path || typeof port.path !== 'object')
//               throw [
//                 `Create DTO NE | ** Shelf: ${subrack.shelfNumber} - Slot: ${slot.number} - Port: ${port.port} ** | Path information must be an object in Port`,
//               ];
//             return port;
//           });
//         } else {
//           slot.board.ports = [];
//         }
//       }

//       return slot;
//     });

//     return subrack;
//   });
// }

// import { helpersDB } from '../../../data';
// import { BoardPortType, INEPort, INESubrack, INetworkElement, NETypeEnum, OwnerEnum, PathType, SettingNEEnum } from '../../../interface';

// interface INetworkElementCreateDTO extends Omit<INetworkElement, 'id' | 'createdAt' | 'updatedAt'> {}

// export class CreateNetworkElementDTO implements INetworkElementCreateDTO {
//   constructor(
//     public readonly type: NETypeEnum,
//     public readonly central: string,
//     public readonly vendor: string,
//     public readonly neName: string,
//     public readonly setting: SettingNEEnum,
//     public readonly owner: OwnerEnum,
//     public readonly isDeleted: boolean = false,
//     public readonly subracks: INESubrack[] = [],
//     public readonly neIP?: string,
//     public readonly dbTx?: string,
//     public readonly remarks?: string,
//     public readonly observations?: string
//   ) {}

//   static create(networkElement: INetworkElementCreateDTO): [string?, CreateNetworkElementDTO?] {
//     const { type, central, vendor, neName, setting, neIP, dbTx, remarks, owner, observations, isDeleted = false, subracks } = networkElement;

//     // Verfico si los datos son válidos
//     if (!type || !Object.values(NETypeEnum).includes(type)) throw ['Create DTO NE | Invalid Network Element Type'];
//     if (!central || typeof central !== 'string') throw ['Create DTO NE | Missing Central Name'];
//     if (!vendor || !helpersDB.isMongoID(vendor)) throw ['Create DTO NE | Missing or invalid Vendor'];
//     if (!neName || typeof neName !== 'string') throw ['Create DTO NE | Missing Network Element Name'];
//     if (!setting || !Object.values(SettingNEEnum).includes(setting)) throw ['Create DTO NE | Invalid Setting'];
//     if (!owner || !Object.values(OwnerEnum).includes(owner)) throw ['Create DTO NE | Invalid Owner'];
//     if (neIP !== undefined && typeof neIP !== 'string') throw ['Create DTO NE | NE IP must be a string'];
//     if (dbTx !== undefined && typeof dbTx !== 'string') throw ['Create DTO NE | DBTx must be a string'];
//     if (remarks !== undefined && typeof remarks !== 'string') throw ['Create DTO NE | Remarks must be a string'];
//     if (observations !== undefined && typeof observations !== 'string') throw ['Create DTO NE | Observations must be a string'];
//     if (typeof isDeleted !== 'boolean') throw ['Create DTO NE | isDeleted must be a boolean'];
//     if (subracks && !Array.isArray(subracks)) throw ['Create DTO NE | Subracks must be an array'];

//     // Validación de subracks
//     if (Array.isArray(subracks)) {
//       for (const [indexSubrck, subrack] of subracks.entries()) {
//         if (!helpersDB.isMongoID(subrack.id)) throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Invalid Subrack ID'];
//         if (!subrack.position || typeof subrack.position !== 'string')
//           throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack position must be a string'];
//         if (!subrack.shelfName || typeof subrack.shelfName !== 'string')
//           throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfName must be a string'];
//         if (typeof subrack.shelfNumber !== 'number') throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfNumber must be a number'];

//         if (Array.isArray(subrack.slots)) {
//           for (const [indexSlot, { board, logical, number, physical }] of subrack.slots.entries()) {
//             if (!helpersDB.isMongoID(board.id))
//               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot board must be a valid Mongo ID`];
//             if (!logical || typeof logical !== 'string')
//               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot logical must be a string`];
//             if (typeof number !== 'number')
//               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot number must be a number`];
//             if (!physical || typeof physical !== 'string')
//               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot physical must be a string`];
//             if (Array.isArray(board.ports)) {
//               for (const [indexPort, { equipment, path, type }] of board.ports.entries()) {
//                 if (!helpersDB.isMongoID(equipment))
//                   throw [
//                     `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port equipment must be a valid Mongo ID`,
//                   ];
//                 if (!type || typeof type !== 'string')
//                   throw [
//                     `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port type must be a string`,
//                   ];
//                 if (path) {
//                   if (!path.type || typeof path.type !== 'string')
//                     throw [
//                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path type must be a string`,
//                     ];
//                   if (path.client && typeof path.client !== 'string')
//                     throw [
//                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path client must be a string`,
//                     ];
//                   if (typeof path.available !== 'boolean')
//                     throw [
//                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path available must be a boolean`,
//                     ];
//                   if (path.observation && typeof path.observation !== 'string')
//                     throw [
//                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path observation must be a string`,
//                     ];
//                 }
//               }
//             } else {
//               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot board ports must be an array`];
//             }
//           }
//         } else {
//           throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack slots must be an array`];
//         }
//       }
//     } else {
//       throw ['Create DTO NE | Subracks must be an array'];
//     }

//     return [
//       undefined,
//       new CreateNetworkElementDTO(type, central, vendor, neName, setting, owner, isDeleted, subracks, neIP, dbTx, remarks, observations),
//     ];
//   }

// }

// import { helpersDB } from '../../../data';
// import { INESubrack, INetworkElement, NETypeEnum, OwnerEnum, SettingNEEnum } from '../../../interface';

// interface INetworkElementCreateDTO extends Omit<INetworkElement, 'id' | 'createdAt' | 'updatedAt'> {}

// export class CreateNetworkElementDTO implements INetworkElementCreateDTO {
//   constructor(
//     public readonly type: NETypeEnum,
//     public readonly centralName: string,
//     public readonly vendor: string,
//     public readonly neName: string,
//     public readonly setting: SettingNEEnum,
//     public readonly owner: OwnerEnum,
//     public readonly isDeleted: boolean = false,
//     public readonly subracks: INESubrack[] = [],
//     public readonly neIP?: string,
//     public readonly dbTx?: string,
//     public readonly remarks?: string,
//     public readonly observations?: string
//   ) {}

//   static create(networkElement: { [key: string]: any }): [string?, CreateNetworkElementDTO?] {
//     const { type, centralName, vendor, neName, setting, neIP, dbTx, remarks, owner, observations, isDeleted = false, subracks } = networkElement;

//     // Verfico si los datos son válidos
//     if (!type || !Object.values(NETypeEnum).includes(type)) throw ['Create DTO NE | Invalid Network Element Type'];
//     if (!centralName || typeof centralName !== 'string') throw ['Create DTO NE | Missing Central Name'];
//     if (!vendor || !helpersDB.isMongoID(vendor)) throw ['Create DTO NE | Missing or invalid Vendor'];
//     if (!neName || typeof neName !== 'string') throw ['Create DTO NE | Missing Network Element Name'];
//     if (!setting || !Object.values(SettingNEEnum).includes(setting)) throw ['Create DTO NE | Invalid Setting'];
//     if (!owner || !Object.values(OwnerEnum).includes(owner)) throw ['Create DTO NE | Invalid Owner'];
//     if (neIP !== undefined && typeof neIP !== 'string') throw ['Create DTO NE | NE IP must be a string'];
//     if (dbTx !== undefined && typeof dbTx !== 'string') throw ['Create DTO NE | DBTx must be a string'];
//     if (remarks !== undefined && typeof remarks !== 'string') throw ['Create DTO NE | Remarks must be a string'];
//     if (observations !== undefined && typeof observations !== 'string') throw ['Create DTO NE | Observations must be a string'];
//     if (typeof isDeleted !== 'boolean') throw ['Create DTO NE | isDeleted must be a boolean'];
//     if (subracks && !Array.isArray(subracks)) throw ['Create DTO NE | Subracks must be an array'];

//     // Validación de subracks
//     if (Array.isArray(subracks)) {
//       for (const [indexSubrck, subrack] of subracks.entries()) {
//         if (!subrack.position || typeof subrack.position !== 'string') throw ['Create DTO NE | Subrack position must be a string'];
//         if (!subrack.shelfName || typeof subrack.shelfName !== 'string') throw ['Create DTO NE | Subrack shelfName must be a string'];
//         if (typeof subrack.shelfNumber !== 'number') throw ['Create DTO NE | Subrack shelfNumber must be a number'];
//         if (Array.isArray(subrack.slots)) {
//           for (const [ indexSlot, slotData ] of subrack.slots.entries()) {
//             if (!helpersDB.isMongoID(slotData.board))
//             if (!slotData.position || typeof slotData.position !== 'string') throw [`Create DTO NE | [ Subrack [${indexSubrck}] | Slot [${indexSlot}] ] Slot position must be a string`];
//             if (!slotData.name || typeof slotData.name !== 'string') throw [`Create DTO NE | [ Subrack [${indexSubrck}] | Slot [${indexSlot}] ] Slot name must be a string`];
//             if (typeof slotData.number !== 'number') throw [`Create DTO NE | [ Subrack [${indexSubrck}] | Slot [${indexSlot}] ] Slot number must be a number`];
//           }
//         }
//       }
//     } else {
//       throw ['Create DTO NE | Subracks must be an array'];
//     }

//     return [
//       undefined,
//       new CreateNetworkElementDTO(type, centralName, vendor, neName, setting, owner, isDeleted, subracks, neIP, dbTx, remarks, observations),
//     ];
//   }
// }
// import { helpersDB } from '../../../data';
// import { BoardPortType, INEPort, INESubrack, INetworkElement, NETypeEnum, OwnerEnum, PathType, SettingNEEnum } from '../../../interface';

// interface INetworkElementCreateDTO extends Omit<INetworkElement, 'id' | 'createdAt' | 'updatedAt'> {}

// export class CreateNetworkElementDTO implements INetworkElementCreateDTO {
//   constructor(
//     public readonly type: NETypeEnum,
//     public readonly central: string,
//     public readonly vendor: string,
//     public readonly neName: string,
//     public readonly setting: SettingNEEnum,
//     public readonly owner: OwnerEnum,
//     public readonly isDeleted: boolean = false,
//     public readonly subracks: INESubrack[] = [],
//     public readonly neIp?: string,
//     public readonly dbTx?: string,
//     public readonly remarks?: string,
//     public readonly observations?: string
//   ) {}

//   static create(networkElement: INetworkElementCreateDTO): [string?, CreateNetworkElementDTO?] {

//     // Verfico si los datos son válidos
//     this.validateNetworkElementData(networkElement);
//     return [
//       undefined,
//       new CreateNetworkElementDTO(
//         networkElement.type,
//         networkElement.central,
//         networkElement.vendor,
//         networkElement.neName,
//         networkElement.setting,
//         networkElement.owner,
//         networkElement.isDeleted ?? false,
//         networkElement.subracks ?? [],
//         networkElement.neIp,
//         networkElement.dbTx,
//         networkElement.remarks,
//         networkElement.observations
//       ),
//     ];
//   }

//   private static validateNetworkElementData(networkElementData: INetworkElementCreateDTO): void {
//     const { type, central, vendor, neName, setting, neIp, dbTx, remarks, owner, observations, isDeleted = false, subracks = [] } = networkElementData;

//     if (!type || !Object.values(NETypeEnum).includes(type)) throw ['Create DTO NE | Invalid Network Element Type'];
//     if (!central || !helpersDB.isMongoID(central)) throw ['Create DTO NE | Missing or invalid Central'];
//     if (!vendor || !helpersDB.isMongoID(vendor)) throw ['Create DTO NE | Missing or invalid Vendor'];
//     if (!neName || typeof neName !== 'string') throw ['Create DTO NE | Missing Network Element Name'];
//     if (!setting || !Object.values(SettingNEEnum).includes(setting)) throw ['Create DTO NE | Invalid Setting'];
//     if (!owner || !Object.values(OwnerEnum).includes(owner)) throw ['Create DTO NE | Invalid Owner'];
//     if (neIp !== undefined && typeof neIp !== 'string') throw ['Create DTO NE | NE IP must be a string'];
//     if (dbTx !== undefined && typeof dbTx !== 'string') throw ['Create DTO NE | DBTx must be a string'];
//     if (remarks !== undefined && typeof remarks !== 'string') throw ['Create DTO NE | Remarks must be a string'];
//     if (observations !== undefined && typeof observations !== 'string') throw ['Create DTO NE | Observations must be a string'];
//     if (typeof isDeleted !== 'boolean') throw ['Create DTO NE | isDeleted must be a boolean'];

//     if (subracks && Array.isArray(subracks) && subracks.length !== 0) {
//       this.validateSubracks(subracks);
//     } else {
//       throw ['Create DTO NE | Subracks must be an Array'];
//     }
//   }

//   private static validateSubracks(subracksData: INESubrack[]) {
//     for (const [indexSubrck, { id, position, shelfName, shelfNumber, slots }] of subracksData.entries()) {
//       if (!helpersDB.isMongoID(id)) throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Invalid Subrack ID`];
//       if (!position || typeof position !== 'string') throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack position must be a string`];
//       if (!shelfName || typeof shelfName !== 'string') throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfName must be a string`];
//       if (typeof shelfNumber !== 'number') throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfNumber must be a number`];
//       if (Array.isArray(slots)) {
//         this.validateSlots(slots, indexSubrck);
//       } else {
//         throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack slots must be an array`];
//       }
//     }
//   }

//   private static validateSlots(slotsData: INESubrack['slots'], indexSubrack: number) {
//     for (const [indexSlot, { number, physical, logical, board }] of slotsData.entries()) {
//       if (!number || typeof number !== 'number')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot} ** | Slot number must be a Number`];
//       if (!physical || typeof physical !== 'string')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot} ** | Slot physical must be a string`];
//       if (!logical || typeof logical !== 'string')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot} ** | Slot logical must be a string`];
//       if (board && typeof board === 'object' && helpersDB.isMongoID(board.id)) {
//         if (board.ports && Array.isArray(board.ports) && board.ports.length > 0) {
//           this.validatePorts(board.ports, indexSubrack, indexSlot);
//         } else {
//           throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot} ** | The Board in Slot must be an object with a valid Mongo ID`];
//         }
//       }
//     }
//   }

//   private static validatePorts(portsData: INEPort[], indexSubrack: number, indexSlot: number): void {
//     for (const [indexPort, { port, physical, NMS, type, fullName, equipment, logicalFacilities, path }] of portsData.entries()) {
//       if (!port || typeof port !== 'number')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port name must be a number`];
//       if (!physical || typeof physical !== 'string')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port physical must be a string`];
//       if (!NMS || typeof NMS !== 'string')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port NMS must be a string`];
//       if (!type || !Object.values(BoardPortType).includes(type))
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port type must be a valid BoardPortType`];
//       if (!fullName || typeof fullName !== 'string')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port fullName must be a string`];
//       if (equipment && !helpersDB.isMongoID(equipment))
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port equipment must be a valid Mongo ID`];
//       if (logicalFacilities && typeof logicalFacilities !== 'object')
//         throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port logicalFacilities must be an object`];
//       if (path && typeof path === 'object') {
//         this.validatePath(path, indexSubrack, indexSlot, indexPort);
//       }
//     }
//   }

//   private static validatePath(pathData: INEPort['path'], indexSubrack: number, indexSlot: number, indexPort: number): void {
//     const { id, plannerId, IUId, pathName, datoBasico, type, client, available, observation } = pathData;
//     if (id && !helpersDB.isMongoID(id))
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path ID must be a valid Mongo ID`];
//     if (plannerId && typeof plannerId !== 'string')
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path plannerId must be a string`];
//     if (IUId && typeof IUId !== 'string')
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path IUId must be a string`];
//     if (pathName && typeof pathName !== 'string')
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path name must be a string`];
//     if (datoBasico && typeof datoBasico !== 'string')
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path datoBasico must be a string`];
//     if (type && typeof type !== 'string' && !Object.values(PathType).includes(type))
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path type must be a valid PathType`];
//     if (client && typeof client !== 'string')
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path client must be a string`];
//     if (available !== undefined && typeof available !== 'boolean')
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path available must be a boolean`];
//     if (observation && typeof observation !== 'string')
//       throw [`Create DTO NE | ** Subrack: ${indexSubrack}  Slot: ${indexSlot}  Port: ${indexPort} ** | Port path observation must be a string`];
//   }
// }

// // import { helpersDB } from '../../../data';
// // import { BoardPortType, INEPort, INESubrack, INetworkElement, NETypeEnum, OwnerEnum, PathType, SettingNEEnum } from '../../../interface';

// // interface INetworkElementCreateDTO extends Omit<INetworkElement, 'id' | 'createdAt' | 'updatedAt'> {}

// // export class CreateNetworkElementDTO implements INetworkElementCreateDTO {
// //   constructor(
// //     public readonly type: NETypeEnum,
// //     public readonly central: string,
// //     public readonly vendor: string,
// //     public readonly neName: string,
// //     public readonly setting: SettingNEEnum,
// //     public readonly owner: OwnerEnum,
// //     public readonly isDeleted: boolean = false,
// //     public readonly subracks: INESubrack[] = [],
// //     public readonly neIP?: string,
// //     public readonly dbTx?: string,
// //     public readonly remarks?: string,
// //     public readonly observations?: string
// //   ) {}

// //   static create(networkElement: INetworkElementCreateDTO): [string?, CreateNetworkElementDTO?] {
// //     const { type, central, vendor, neName, setting, neIP, dbTx, remarks, owner, observations, isDeleted = false, subracks } = networkElement;

// //     // Verfico si los datos son válidos
// //     if (!type || !Object.values(NETypeEnum).includes(type)) throw ['Create DTO NE | Invalid Network Element Type'];
// //     if (!central || typeof central !== 'string') throw ['Create DTO NE | Missing Central Name'];
// //     if (!vendor || !helpersDB.isMongoID(vendor)) throw ['Create DTO NE | Missing or invalid Vendor'];
// //     if (!neName || typeof neName !== 'string') throw ['Create DTO NE | Missing Network Element Name'];
// //     if (!setting || !Object.values(SettingNEEnum).includes(setting)) throw ['Create DTO NE | Invalid Setting'];
// //     if (!owner || !Object.values(OwnerEnum).includes(owner)) throw ['Create DTO NE | Invalid Owner'];
// //     if (neIP !== undefined && typeof neIP !== 'string') throw ['Create DTO NE | NE IP must be a string'];
// //     if (dbTx !== undefined && typeof dbTx !== 'string') throw ['Create DTO NE | DBTx must be a string'];
// //     if (remarks !== undefined && typeof remarks !== 'string') throw ['Create DTO NE | Remarks must be a string'];
// //     if (observations !== undefined && typeof observations !== 'string') throw ['Create DTO NE | Observations must be a string'];
// //     if (typeof isDeleted !== 'boolean') throw ['Create DTO NE | isDeleted must be a boolean'];
// //     if (subracks && !Array.isArray(subracks)) throw ['Create DTO NE | Subracks must be an array'];

// //     // Validación de subracks
// //     if (Array.isArray(subracks)) {
// //       for (const [indexSubrck, subrack] of subracks.entries()) {
// //         if (!helpersDB.isMongoID(subrack.id)) throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Invalid Subrack ID'];
// //         if (!subrack.position || typeof subrack.position !== 'string')
// //           throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack position must be a string'];
// //         if (!subrack.shelfName || typeof subrack.shelfName !== 'string')
// //           throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfName must be a string'];
// //         if (typeof subrack.shelfNumber !== 'number') throw ['Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack shelfNumber must be a number'];

// //         if (Array.isArray(subrack.slots)) {
// //           for (const [indexSlot, { board, logical, number, physical }] of subrack.slots.entries()) {
// //             if (!helpersDB.isMongoID(board.id))
// //               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot board must be a valid Mongo ID`];
// //             if (!logical || typeof logical !== 'string')
// //               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot logical must be a string`];
// //             if (typeof number !== 'number')
// //               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot number must be a number`];
// //             if (!physical || typeof physical !== 'string')
// //               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot physical must be a string`];
// //             if (Array.isArray(board.ports)) {
// //               for (const [indexPort, { equipment, path, type }] of board.ports.entries()) {
// //                 if (!helpersDB.isMongoID(equipment))
// //                   throw [
// //                     `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port equipment must be a valid Mongo ID`,
// //                   ];
// //                 if (!type || typeof type !== 'string')
// //                   throw [
// //                     `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port type must be a string`,
// //                   ];
// //                 if (path) {
// //                   if (!path.type || typeof path.type !== 'string')
// //                     throw [
// //                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path type must be a string`,
// //                     ];
// //                   if (path.client && typeof path.client !== 'string')
// //                     throw [
// //                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path client must be a string`,
// //                     ];
// //                   if (typeof path.available !== 'boolean')
// //                     throw [
// //                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path available must be a boolean`,
// //                     ];
// //                   if (path.observation && typeof path.observation !== 'string')
// //                     throw [
// //                       `Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] | Board [${board.id}] | Port [${indexPort}] ** | Port path observation must be a string`,
// //                     ];
// //                 }
// //               }
// //             } else {
// //               throw [`Create DTO NE | ** Subrack [${indexSubrck}] | Slot [${indexSlot}] ** | Slot board ports must be an array`];
// //             }
// //           }
// //         } else {
// //           throw [`Create DTO NE | ** Subrack [${indexSubrck}] ** | Subrack slots must be an array`];
// //         }
// //       }
// //     } else {
// //       throw ['Create DTO NE | Subracks must be an array'];
// //     }

// //     return [
// //       undefined,
// //       new CreateNetworkElementDTO(type, central, vendor, neName, setting, owner, isDeleted, subracks, neIP, dbTx, remarks, observations),
// //     ];
// //   }

// // }

// // import { helpersDB } from '../../../data';
// // import { INESubrack, INetworkElement, NETypeEnum, OwnerEnum, SettingNEEnum } from '../../../interface';

// // interface INetworkElementCreateDTO extends Omit<INetworkElement, 'id' | 'createdAt' | 'updatedAt'> {}

// // export class CreateNetworkElementDTO implements INetworkElementCreateDTO {
// //   constructor(
// //     public readonly type: NETypeEnum,
// //     public readonly centralName: string,
// //     public readonly vendor: string,
// //     public readonly neName: string,
// //     public readonly setting: SettingNEEnum,
// //     public readonly owner: OwnerEnum,
// //     public readonly isDeleted: boolean = false,
// //     public readonly subracks: INESubrack[] = [],
// //     public readonly neIP?: string,
// //     public readonly dbTx?: string,
// //     public readonly remarks?: string,
// //     public readonly observations?: string
// //   ) {}

// //   static create(networkElement: { [key: string]: any }): [string?, CreateNetworkElementDTO?] {
// //     const { type, centralName, vendor, neName, setting, neIP, dbTx, remarks, owner, observations, isDeleted = false, subracks } = networkElement;

// //     // Verfico si los datos son válidos
// //     if (!type || !Object.values(NETypeEnum).includes(type)) throw ['Create DTO NE | Invalid Network Element Type'];
// //     if (!centralName || typeof centralName !== 'string') throw ['Create DTO NE | Missing Central Name'];
// //     if (!vendor || !helpersDB.isMongoID(vendor)) throw ['Create DTO NE | Missing or invalid Vendor'];
// //     if (!neName || typeof neName !== 'string') throw ['Create DTO NE | Missing Network Element Name'];
// //     if (!setting || !Object.values(SettingNEEnum).includes(setting)) throw ['Create DTO NE | Invalid Setting'];
// //     if (!owner || !Object.values(OwnerEnum).includes(owner)) throw ['Create DTO NE | Invalid Owner'];
// //     if (neIP !== undefined && typeof neIP !== 'string') throw ['Create DTO NE | NE IP must be a string'];
// //     if (dbTx !== undefined && typeof dbTx !== 'string') throw ['Create DTO NE | DBTx must be a string'];
// //     if (remarks !== undefined && typeof remarks !== 'string') throw ['Create DTO NE | Remarks must be a string'];
// //     if (observations !== undefined && typeof observations !== 'string') throw ['Create DTO NE | Observations must be a string'];
// //     if (typeof isDeleted !== 'boolean') throw ['Create DTO NE | isDeleted must be a boolean'];
// //     if (subracks && !Array.isArray(subracks)) throw ['Create DTO NE | Subracks must be an array'];

// //     // Validación de subracks
// //     if (Array.isArray(subracks)) {
// //       for (const [indexSubrck, subrack] of subracks.entries()) {
// //         if (!subrack.position || typeof subrack.position !== 'string') throw ['Create DTO NE | Subrack position must be a string'];
// //         if (!subrack.shelfName || typeof subrack.shelfName !== 'string') throw ['Create DTO NE | Subrack shelfName must be a string'];
// //         if (typeof subrack.shelfNumber !== 'number') throw ['Create DTO NE | Subrack shelfNumber must be a number'];
// //         if (Array.isArray(subrack.slots)) {
// //           for (const [ indexSlot, slotData ] of subrack.slots.entries()) {
// //             if (!helpersDB.isMongoID(slotData.board))
// //             if (!slotData.position || typeof slotData.position !== 'string') throw [`Create DTO NE | [ Subrack [${indexSubrck}] | Slot [${indexSlot}] ] Slot position must be a string`];
// //             if (!slotData.name || typeof slotData.name !== 'string') throw [`Create DTO NE | [ Subrack [${indexSubrck}] | Slot [${indexSlot}] ] Slot name must be a string`];
// //             if (typeof slotData.number !== 'number') throw [`Create DTO NE | [ Subrack [${indexSubrck}] | Slot [${indexSlot}] ] Slot number must be a number`];
// //           }
// //         }
// //       }
// //     } else {
// //       throw ['Create DTO NE | Subracks must be an array'];
// //     }

// //     return [
// //       undefined,
// //       new CreateNetworkElementDTO(type, centralName, vendor, neName, setting, owner, isDeleted, subracks, neIP, dbTx, remarks, observations),
// //     ];
// //   }
// // }
