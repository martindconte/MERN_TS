import { z } from 'zod';
import { BitsRatesEnum, LogicalSignal } from './bitsRatesTypes';
import { transceiverSchema } from './transceiverTypes';
import { RoadmapEnum, TechnologyEnum } from './commonTypes';

//* enum
export enum BoardPortType {
  client = 'CLIENT',
  line = 'LINE',
  any = 'ANY',
}

//* schemas
const equipmentsPortsSchema = transceiverSchema.pick({
  id: true,
  partNumber: true,
  modelName: true,
  description: true,
  type: true,
  vendor: true,
  bitsRates: true,
});

//! transceiverTypes importa boardSchema y... boardSchema importa transceiverTypes esto creo una refrencia circular! Se soluciono con z.lazy (funcionalidad de zod)
//! otra opcion es mover las partes comunes a un archivo y realizar las importantes desde ahi...
const portsInBoardSchema = z.object({
  port: z.number(),
  type: z.nativeEnum(BoardPortType).default(BoardPortType.any),
  physical: z.string(),
  NMS: z.string(),
  fullName: z.string(),
  equipments: z.array(equipmentsPortsSchema).optional().default([]),
  // equipment: z.union([
  //     z.array( z.lazy(() => transceiverSchema )).optional().default([]),
  //     z.array( equipmentsPortsSchema ).optional().default([])
  // ]),
  logicalFacilities: z.record(z.nativeEnum(LogicalSignal), z.array(z.string())),
});

export const boardSchema = z.object({
  id: z.string(),
  boardName: z
    .string({ required_error: 'Board Name is required!' })
    .trim()
    .transform((val) => val.toUpperCase()),
  partNumber: z
    .string({ required_error: 'Part Number is required!' })
    .trim()
    .transform((val) => val.toUpperCase()),
  bitsRates: z.array(z.nativeEnum(BitsRatesEnum)).optional().default([]),
  vendor: z.object({
    id: z.string(),
    vendorName: z.string().optional(),
}).refine(data => data.vendorName, { message: 'Vendor is required!', path: ['vendor'] }),
  bandwidthMax: z.number().optional(),
  description: z.string().optional().default(''),
  observations: z.string().optional().default(''),
  ports: z.array(portsInBoardSchema).optional().default([]),
  slotSize: z.number().optional().default(1),
  technology: z.nativeEnum(TechnologyEnum).optional().default(TechnologyEnum.DWDM),
  roadmap: z.nativeEnum(RoadmapEnum).optional().default(RoadmapEnum.empty),
  isDeleted: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

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
  payload: boardSchema.pick({ id: true, boardName: true, partNumber: true, vendor: true, description: true }),
});

export const respAPIBoardsSchema = z.object({
  payload: z.array(boardSchema),
  pagination: paginationSchema,
});

export const boardsDeletedSchema = z.object({
  boards: z.array(boardSchema),
  subracks: z.string().default('TODO... PENDIENTE SUBRACKS')
});

//* types
export type BoardType = z.infer<typeof boardSchema>;
export type BoardPaginationType = z.infer<typeof paginationSchema>;
export type BoardPortsType = z.infer<typeof portsInBoardSchema>;
export type EquipmentType = z.infer<typeof equipmentsPortsSchema>;
export type BoardsDeletedType = z.infer<typeof boardsDeletedSchema>;
export type BoardFormData = Pick<
  BoardType,
  'boardName'| 'partNumber'| 'bitsRates'| 'bandwidthMax'| 'description'| 'observations'| 'ports'| 'slotSize'| 'technology'| 'roadmap' | 'isDeleted'
> & {
  vendor: string
};
