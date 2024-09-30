export enum UnitProps {
    MB = "MB",
    GB = "GB",
    TB = "TB",
}

export interface IBandwidthWithId {
    id: string;
    amount: number;
    unit: UnitProps;
}

export interface IBandwidthWith_Id {
    _id: string;
    amount: number;
    unit: UnitProps;
}

export type IBandwidth = IBandwidthWithId | IBandwidthWith_Id;