import { z } from "zod";
import { BitsRatesEnum, LogicalSignal } from "./bitsRatesTypes";
import { transceiverSchema } from "./transceiverTypes";

//* enum
export enum BoardTechnologyEnum {
    dwdm = 'DWDM',
    sdh = 'SDH',
    rx = 'RX',
    cwdm = 'CWDM',
    ip = 'IP',
    generic = 'GENERIC'
};

export enum BoardStatusEnum {
    inService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    NA = ''
};

export enum BoardPortType {
    client = 'CLIENT',
    line = 'LINE',
    any = 'ANY'
}

export enum boardUnitType {
    mb = 'MB',
    gb = 'GB',
    tb = 'TB'
}

//* schemas
// const bandwidthSchema = z.object({
//     amount: z.number(),
//     unit: z.nativeEnum(boardUnitType),
// });

// const signalSchema = z.object({
//     id: z.string(),
//     type: z.string(),
//     subType: z.string(),
//     bandwidth: bandwidthSchema.optional(),
// });

const equipmentsPortsSchema = z.object({
    id: z.string(),
    vendor: z.object({
        id: z.string(),
        vendorName: z.string(),
    }),
    partNumber: z.string(),
    model: z.string(),
    description: z.string(),
    status: z.string(),
    techonology: z.string(),
})

//! transceiverTypes importa boardSchema y boardSchema importa transceiverTypes esto creo una refrencia circular! Se soluciono con z.lazy (funcionalidad de zod)
//! otra opcion es mover las partes comunes a un archivo y realizar las importantes desde ahi...

const portsInBoardSchema = z.object({
    port: z.number(),
    type: z.nativeEnum(BoardPortType).default(BoardPortType.any),
    physical: z.string(),
    NMS: z.string(),
    equipment: z.union([
        z.array( z.lazy(() => transceiverSchema )).optional().default([]),
        z.array( equipmentsPortsSchema ).optional().default([])
    ]),
    logicalFacilities: z.record(z.nativeEnum( LogicalSignal ), z.array(z.string())),
    fullName: z.string()
})

export const boardSchema = z.object({
    id: z.string(),
    boardName: z.string({ required_error: 'Board Name is required!' }).trim().transform((val) => val.toUpperCase()),
    partNumber: z.string({ required_error: 'Part Number is required!' }).trim().transform((val) => val.toUpperCase()),
    signals: z.array( z.nativeEnum( BitsRatesEnum ) ).optional().default([]),
    vendor: z.object({
        id: z.string(),
        vendorName: z.string()
    }).refine(data => data.vendorName, { message: 'Vendor is required!', path: ['vendor'] }),
    bandwidthMax: z.number().optional(),
    description: z.string().optional().default(''),
    observations: z.string().optional().default(''),
    ports: z.array( portsInBoardSchema ).optional().default([]),
    slotSize: z.number().optional().default(1),
    technology: z.nativeEnum(BoardTechnologyEnum).optional().default(BoardTechnologyEnum.dwdm),
    status: z.nativeEnum(BoardStatusEnum).optional().default(BoardStatusEnum.NA),
    createdAt: z.date(),
    updatedAt: z.date(),
})

const paginationSchema = z.object({
    totalDocs: z.number().nonnegative(),
    totalResults: z.number().nonnegative(),
    totalPages: z.number().nonnegative(),
    prevPage: z.string().nullable().optional(), // Acepta string o null
    nextPage: z.string().nullable().optional(), // Acepta string o null
    page: z.number().positive(),
    hasPrevPage: z.boolean(),
    hasNextPage: z.boolean(),
});

// response APIs
export const respAPIBoardSchema = z.object({
    msg: z.string().optional(),
    payload: boardSchema
})

export const respAPIBoardsSchema = z.object({
    payload: z.array( boardSchema ),
    pagination: paginationSchema,
});

//* types
export type BoardType = z.infer< typeof boardSchema >
export type BoardPaginationType = z.infer<typeof paginationSchema>
export type BoardPortsType = z.infer< typeof portsInBoardSchema>
export type BoardFormData = Pick<
  BoardType,
  'id' |
  'boardName' |
  'partNumber' |
  'signals' |
  'vendor' |
  'bandwidthMax' |
  'description' |
  'observations' |
  'ports' |
  'slotSize' |
  'technology' |
  'status'
>;

