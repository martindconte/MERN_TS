import z from 'zod'
import { centralSchema } from '../central/centralTypes'
import { vendorSchema } from '../catalog/vendorTypes'
import { OwnerEnum } from '../catalog/commonTypes'
import { subrackSchema } from '../catalog/subrackTypes'
import { BoardPortType } from '../catalog/boardTypes'
import { LogicalSignal } from '../catalog/bitsRatesTypes'

export enum NESettingEnum {
  ROADM = 'ROADM',
  FOADM = 'FOADM',
  OLA = 'OLA',
  na = 'N/A',
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

const NESubrackSchema = subrackSchema.pick({
  id: true,
  vendor: true,
  subrackType: true,
  subrackFamily: true,
  partNumber: true,
  modelName: true,
  totalSlots: true,
  slots: true,
  owner: true,
  description: true,
  observations: true,
  technology: true,
  isDeleted: true,
}).extend({
  position: z.string().default('000000'),
  shelfNumber: z.number(),
  shelfName: z.string().default(''),
})

export const NESchema = z.object({
  id: z.string(),
  central: centralSchema
    .pick({
      id: true,
      centralName: true,
      codeName: true,
    })
    .required(),
  vendor: vendorSchema
    .pick({
      id: true,
      vendorName: true,
    })
    .required(),
  neName: z
    .string()
    .trim()
    .min(3, { message: 'NE name is required' })
    .transform(val => val.toUpperCase()),
  setting: z.nativeEnum(NESettingEnum).default(NESettingEnum.sd),
  type: z.nativeEnum(NETypeEnum).default(NETypeEnum.sd),
  neIp: z.string().trim().default('000.000.000.000'),
  dbTx: z.string().trim().default(`/${new Date().getFullYear()}`),
  remarks: z.string().trim().default(''),
  description: z.string().trim().default(''),
  owner: z.nativeEnum(OwnerEnum).default(OwnerEnum.TASA),
  observations: z.string().trim().default(''),
  isDeleted: z.boolean().optional(),
  subracks: z.array(NESubrackSchema).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type NEFormData = Pick<
  NEType,
  | 'neName' | 'type' | 'setting' | 'neIp' | 'dbTx' | 'remarks' | 'description' | 'owner' | 'observations'
> & {
  central: string,
  vendor: string
  subracks: {
    id: string,
    // vendor: string,
    // subrackType: string,
    // subrackFamily: string,
    // partNumber: string,
    // modelName: string,
    // totalSlots: number,
    // owner: string,
    // observations: string,
    // technology: string,
    position: string,
    shelfNumber: number,
    shelfName: string,
    slots: {
      number: number,
      physical: string,
      logical: string,
      board?: {
        id: string,
        ports: {
          port: number,
          physical: string,
          NMS: string,
          type: BoardPortType,
          fullName: string,
          equipment: string,
          logicalFacilities: Record<LogicalSignal, string[]>,
        }[]
      },
    }[]
  }[]
}

export type NEType = z.infer<typeof NESchema>
