export enum UnitProps {
    MB = "MB",
    GB = "GB",
    TB = "TB",
}

export interface IBandwidth {
    amount: number;
    unit: UnitProps;
}