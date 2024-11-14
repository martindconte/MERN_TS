import { z } from "zod";
import { BitsRatesEnum } from "./bitsRatesTypes";
import { RoadmapEnum, TechnologyEnum } from "./commonTypes";
import { boardSchema } from "./boardTypes";

//* enum
// export enum TransceiverTechnologyEnum {
//     DWDM = 'DWDM',
//     SDH = 'SDH',
//     RX = 'RX',
//     CWDM = 'CWDM',
//     IP = 'IP',
//     GENERIC = 'GENERIC'
// };

// export enum TransceiverStatusEnum {
//     inService = 'InService',
//     EndOfSupport = 'EndOfSupport',
//     EndOfMarketing = 'EndOfMarketing',
//     empty = ''
// };

//* schemas
export const transceiverSchema = z.object({
    id: z.string(),
    partNumber: z.string({ required_error: 'Part Number is required!' }).trim().transform((val) => val.toUpperCase()),
    modelName: z.string().trim().optional().default('').transform((val) => val.toUpperCase()),
    description: z.string().optional().default(''),
    type: z.string().optional().default(''),
    vendor: z.object({
        id: z.string(),
        vendorName: z.string().optional(),
    }).refine(data => data.vendorName, { message: 'Vendor is required!', path: ['vendor'] }),
    observations: z.string().trim().optional().default(''),
    technology: z.nativeEnum( TechnologyEnum ).optional().default( TechnologyEnum.DWDM ),
    bitsRates: z.array(z.nativeEnum(BitsRatesEnum)).optional().default([]),
    // bitsRates: z.array(z.nativeEnum(TransceiverBitsRatesEnum)).optional().default([]),
    roadmap: z.nativeEnum( RoadmapEnum ).optional().default(RoadmapEnum.empty),
    // status: z.nativeEnum(TransceiverStatusEnum).optional().default(TransceiverStatusEnum.empty),
    createdAt: z.date(),
    updatedAt: z.date(),
    isDeleted: z.boolean().optional(),
});

//! transceiverTypes importa boardSchema y boardSchema importa transceiverTypes esto creo una refrencia circular! Se soluciono con z.lazy (funcionalidad de zod)
//! otra opcion es mover las partes comunes a un archivo y realizar las importantes desde ahi...

export const TransceiversDeletedSchema = z.object({
    boards: z.array(z.lazy( () => boardSchema )),
    transceivers: z.array( transceiverSchema )
});

//todo --> subracks: z.array(  ),
// export const transceiverSchema = z.object({
//     id: z.string(),
//     partNumber: z.string({ required_error: 'Part Number is required!' }).trim().transform((val) => val.toUpperCase()),
//     model: z.string().trim().optional().default('').transform((val) => val.toUpperCase()),
//     description: z.string().optional().default(''),
//     type: z.string().optional().default(''),
//     vendor: z.object({
//         id: z.string(),
//         vendorName: z.string()
//     }).refine(data => data.vendorName, { message: 'Vendor is required!', path: ['vendor'] }),
//     observations: z.string().trim().optional().default(''),
//     technology: z.nativeEnum(TransceiverTechnologyEnum).optional().default(TransceiverTechnologyEnum.DWDM),
//     bitsRates: z.array(z.nativeEnum(TransceiverBitsRatesEnum)).optional().default([]),
//     status: z.nativeEnum(TransceiverStatusEnum).optional().default(TransceiverStatusEnum.empty),
//     createdAt: z.date(),
//     updatedAt: z.date(),
// }).transform( data => ({
//     ...data,
//     vendor: data.vendor.vendorName
// })) ;

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

//* types
export type TransceiverType = z.infer<typeof transceiverSchema>;
export type TransceiversDeletedType = z.infer<typeof TransceiversDeletedSchema>
export type TransceiverPaginationType = z.infer<typeof paginationSchema>;
export type TransceiverFormData = Pick<
    TransceiverType,
    "partNumber" | "modelName" | "type" | "description" | "observations" | "technology" | "bitsRates" | "roadmap" | "isDeleted"
> & {
    vendor: string
};
// export type TransceiverFormData = Pick<
//     TransceiverType,
//     "partNumber" | "modelName" | "type" | "description" | "vendor" | "observations" | "technology" | "bitsRates" | "roadmap"
// >

//* response APIs
export const responseAPITransceiverSchema = z.object({
    msg: z.string().optional(),
    payload: transceiverSchema
})

// Esquema completo para la respuesta de la API
export const responseAPITransceiversSchema = z.object({
    payload: z.array( transceiverSchema ),
    pagination: paginationSchema,
});