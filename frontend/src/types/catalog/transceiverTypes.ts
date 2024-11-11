import { z } from "zod";
import { BitsRatesEnum } from "./bitsRatesTypes";

//* enum
export enum TransceiverTechnologyEnum {
    DWDM = 'DWDM',
    SDH = 'SDH',
    RX = 'RX',
    CWDM = 'CWDM',
    IP = 'IP',
    GENERIC = 'GENERIC'
};

// export enum TransceiverBitsRatesEnum {
//     STM_1 = "STM-1",
//     STM_4 = "STM-4",
//     STM_16 = "STM-16",
//     STM_64 = "STM-64",
//     OC_3 = "OC-3",
//     OC_12 = "OC-12",
//     OC_48 = "OC-48",
//     OC_192 = "OC-192",
//     FE = "FE",
//     GE = "GE",
//     TEN_GE_WAN = "10GE WAN",
//     TEN_GE_LAN = "10GE LAN",
//     TWENTY_FIVE_GE = "25GE",
//     FORTY_GE = "40GE",
//     FIFTY_GE = "50GE",
//     HUNDRED_GE = "100GE",
//     TWO_HUNDRED_GE = "200GE",
//     FOUR_HUNDRED_GE = "400GE",
//     EIGHT_HUNDRED_GE = "800GE",
//     FLEXE_100G_UNAWARE = "FlexE 100G unaware",
//     FLEXE_200G_UNAWARE = "FlexE 200G unaware",
//     FDDI = "FDDI",
//     ESCON = "ESCON",
//     FC100_FICON = "FC100/FICON",
//     FC200_FICON_EXPRESS = "FC200/FICON Express",
//     FC400_FICON4G = "FC400/FICON4G",
//     FC800_FICON8G = "FC800/FICON8G",
//     FC1200_FICON10G = "FC1200/FICON10G",
//     FC1600 = "FC1600",
//     FC3200 = "FC3200",
//     OTS = 'OTS',
//     OMS = 'OMS',
//     OSC = 'OSC',
//     OCH = "OCH",
//     OTU1 = "OTU1",
//     OTU2 = "OTU2",
//     OTU3 = "OTU3",
//     OTU4 = "OTU4",
//     OTUCn = 'OTUCn',
//     OTU25 = 'OTU25',
//     OTU50 = 'OTU50',
//     ODU0 = "ODU0",
//     ODU1 = "ODU1",
//     ODU2 = "ODU2",
//     ODU2e = "ODU2e",
//     ODU3 = "ODU3",
//     ODU4 = "ODU4",
//     ODUflex = "ODUflex",
//     ODUCn = 'OTUCn',
//     OPU0 = "OPU0",
//     OPU1 = "OPU1",
//     OPU2 = "OPU2",
//     OPU2e = "OPU2e",
//     OPU3 = "OPU3",
//     OPU4 = "OPU4",
//     OPUflex = "OPUflex",
//     OPUCn = 'OPUCn',
//     DVB_ASI = "DVB-ASI",
//     SD_SDI = "SD-SDI",
//     HD_SDI = "HD-SDI",
//     HD_SDIRBR = "HD-SDIRBR",
//     THREE_G_SDI = "3G-SDI",
//     THREE_G_SDIRBR = "3G-SDIRBR"
// };

export enum TransceiverStatusEnum {
    inService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    empty = ''
};

//* schemas
export const transceiverSchema = z.object({
    id: z.string(),
    partNumber: z.string({ required_error: 'Part Number is required!' }).trim().transform((val) => val.toUpperCase()),
    model: z.string().trim().optional().default('').transform((val) => val.toUpperCase()),
    description: z.string().optional().default(''),
    type: z.string().optional().default(''),
    vendor: z.object({
        id: z.string(),
        vendorName: z.string().optional(),
    }).refine(data => data.vendorName, { message: 'Vendor is required!', path: ['vendor'] }),
    observations: z.string().trim().optional().default(''),
    technology: z.nativeEnum(TransceiverTechnologyEnum).optional().default(TransceiverTechnologyEnum.DWDM),
    bitsRates: z.array(z.nativeEnum(BitsRatesEnum)).optional().default([]),
    // bitsRates: z.array(z.nativeEnum(TransceiverBitsRatesEnum)).optional().default([]),
    status: z.nativeEnum(TransceiverStatusEnum).optional().default(TransceiverStatusEnum.empty),
    createdAt: z.date(),
    updatedAt: z.date(),
});
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
export type TransceiverPaginationType = z.infer<typeof paginationSchema>;
export type TransceiverFormData = Pick<
    TransceiverType,
    "partNumber" | "model" | "type" | "description" | "vendor" | "observations" | "technology" | "bitsRates" | "status"
>

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


// import { z } from "zod";

// // Esquemas
// export const vendorSchema = z.object({
//   id: z.string(),
//   vendorName: z.string(),
//   country: z.string(),
//   observation: z.string(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// export const responseAPIVendors = z.array(vendorSchema)
// export const responseAPIVendor = z.object({
//   msg: z.string().optional(),
//   payload: vendorSchema
// });

// // Types
// export type VendorType = z.infer<typeof vendorSchema>;
// export type VendorFormData = Pick<
//   VendorType,
//   "vendorName" | "country" | "observation"
// >;