import z from 'zod'
import { RoadmapEnum, TechnologyEnum } from './commonTypes';
import { boardSchema } from './boardTypes';

export const boardsInSubracks = boardSchema.pick({
    id: true,
    partNumber: true,
    boardName: true,
    slotSize: true,
    description: true,
    vendor: true,    
})

export const slotsSchema = z.object({
    number: z.number().nonnegative({ message: "Slot number must be a positive number" }),
    physical: z.string().min(1, { message: "Physical field is required" }),
    logical: z.string().min(1, { message: "Logical field is required" }),
    boards: z.array( boardsInSubracks ).optional(),
})

export const subrackSchema = z.object({
    id: z.string(),
    vendor: z.object({
        id: z.string(),
        vendorName: z.string().optional(),
    }).refine(data => data.vendorName, { message: 'Vendor is required!', path: ['vendor'] }),
    subrackType: z.string().trim().min(1, { message: "Subrack type is required" }).transform((val) => val.toUpperCase()),
    subrackFamily: z.string().trim().min(1, { message: "Subrack family is required" }).transform((val) => val.toUpperCase()),
    partNumber: z.string().trim().min(1, { message: "Part number is required" }).default('').transform((val) => val.toUpperCase()),
    modelName: z.string().trim().toUpperCase().optional().default('').transform((val) => val.toUpperCase()),
    totalSlots: z.number().nonnegative({ message: "Total slot must be a positive number" }),
    slots: z.array( slotsSchema ).default([]),
    owner: z.string().trim().toUpperCase().default('TASA'),
    description: z.string().trim().optional().default(''),
    observations: z.string().trim().default(''),
    technology: z.nativeEnum(TechnologyEnum).optional().default(TechnologyEnum.DWDM),
    roadmap: z.nativeEnum(RoadmapEnum).optional().default(RoadmapEnum.empty),
    isDeleted: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type SubrackType = z.infer<typeof subrackSchema>
export type SubrackFormData = Pick<SubrackType,
    'subrackType' | 'subrackFamily' | 'partNumber' | 'modelName' | 'description' | 'totalSlots' | 'slots' |
    'owner' | 'observations' | 'technology' | 'roadmap' | 'isDeleted' | 'createdAt' | 'updatedAt'
> & {
    vendor: string;
    // slots: {
    //     number: number;
    //     physical: string;
    //     logical: string;
    //     boards: string[];
    // }[],
}

export const respAPISubrackSchema = z.object({
    msg: z.string().optional(),
    payload: subrackSchema.pick({ id: true, partNumber: true, subrackFamily: true, subrackType: true, vendor: true, description: true, modelName: true }),
  });