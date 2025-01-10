import { OwnerEnum } from "../catalog/common.interface";

export enum SettingNEEnum {
    roadm = 'ROADM',
    FOADM = 'FOADM',
    OLA = 'OLA',
    sd = 's/d',
}

export interface INetworkElement {
    id: string;
    centralName: string;
    neName: string;
    setting: SettingNEEnum;
    neIp: string;
    dbTx: string;
    remarks: string;
    description: string;
    owner: OwnerEnum;
    observations: string;
    isDeleted: boolean;
    subracks: 'TODO... ARMAR EL SCHEMA PARA SUBRACKS';
    createdAt: Date;
    updatedAt: Date;
}