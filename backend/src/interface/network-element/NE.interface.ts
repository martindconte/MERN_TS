import { Interface } from 'readline';
import { IBoard, Port } from '../catalog/board.interface';
import { OwnerEnum } from '../catalog/common.interface';
import { ISlots, ISubrack } from '../catalog/subrack.interface';
import { IVendor } from '../catalog/vendor.interface';
import { ICentral } from '../central/central.interface';
import { PathType } from '../common';
import { ITransceiver } from '../catalog/transceiver.interface';

export enum SettingNEEnum {
  ROADM = 'ROADM',
  FOADM = 'FOADM',
  OLA = 'OLA',
  sd = 's/d',
}

export enum NETypeEnum {
  DWDM = 'DWDM',
  SDH = 'SDH',
  IP = 'IP',
  CLIENT = 'CLIENT',
  RX = 'RX',
  sd = 's/d',
}

//? NE --> Subracks --> Slots --> Boards --> Ports --> Paths

//* Paths in ports in boards in subrack in NE
export interface INESubrackPathInfo {
  id?: string; // ObjectId de MongoDB
  plannerId?: string; // id planificacion
  IUId?: string; // id de IU
  pathName?: string;
  datoBasico?: string;
  type?: PathType;
  client?: string;
  available?: boolean;
  observation?: string;
}

//* Ports in Boards in Subrack in NE
export interface INEPort extends Omit<Port, 'equipments'> {
  equipment?: string;
  path: INESubrackPathInfo;
}

//* Boards in Subrack in NE
export interface INEBoardInSubrack {
  id: string; // ObjectId de MongoDB para board seleccionada
  ports: INEPort[];
};
// export interface INEBoardInSubrack extends Omit<IBoard, 'ports' | 'vendor'> {
//   vendor: IVendor['id'];
//   ports: INEPort[];
// };

export interface INESubrack extends Pick<ISubrack, 'id'> {
  position: string;
  shelfName: string;
  shelfNumber: number;
  slots: (Omit<ISlots, 'boards'> & {
    board?: INEBoardInSubrack;
  })[];
}
// interface INESubrack extends Partial<Omit<ISubrack, 'slots'>> {
//   position: string;
//   shelfName: string;
//   shelfNumber: number;
//   slots: INEBoardInSubrack[];
// }

export interface INetworkElement {
  id: string;
  central: ICentral['id'];
  vendor: IVendor['id'];
  neName: string;
  setting: SettingNEEnum;
  owner: OwnerEnum;
  type: NETypeEnum;
  isDeleted: boolean;
  subracks: INESubrack[];
  neIp?: string;
  dbTx?: string;
  remarks?: string;
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//* Populate Interface
export interface INETransceiver extends Pick<ITransceiver, 'id' | 'partNumber' | 'modelName' | 'type' | 'technology' | 'bitsRates'> {}


export interface INEPorts extends Omit<Port, 'equipments'> {
  equipment?: INETransceiver;
  path: INESubrackPathInfo;
}

export interface INEBoardPopulate extends Pick<IBoard, 'id' | 'partNumber' | 'boardName' | 'vendor'> {
  ports?: INEPorts[];
}

export interface INESlotsPopulate extends Omit <ISlots, 'boards'> {
  board?: INEBoardPopulate;
}

export interface INESubracksPopulate extends Pick<ISubrack, 'id' | 'partNumber' | 'modelName' | 'subrackType' | 'subrackFamily'>{
  slots: INESlotsPopulate[];
}

export interface INetworkElementPopulate {
  id: string;
  central: Pick<ICentral, 'id' | 'centralName'>;
  vendor: Pick<IVendor, 'id' | 'vendorName'>;
  neName: string;
  setting: SettingNEEnum;
  owner: OwnerEnum;
  type: NETypeEnum;
  isDeleted: boolean;
  subracks: INESubracksPopulate[];
  neIp?: string;
  dbTx?: string;
  remarks?: string;
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ************************
// ************************
// **                    ** 
// **     Respuestas     **
// **                    **
// ************************
// ************************
export interface INetworkElementResponse extends Pick<INetworkElement, 'id' | 'neName' | 'setting' | 'type' > {
  vendor: Pick<IVendor, 'vendorName'>;
}