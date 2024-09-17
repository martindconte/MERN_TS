import { z } from 'zod'

//* Central
export const centralSchema = z.object({
    id: z.string(),
    centralName: z.string(),
    codeName: z.string(),
    siteCode: z.string(),
    owner: z.string(),
    status: z.boolean(),
    provinceName: z.string(),
    districtName: z.string(),
    localityName: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    description: z.string(),
    observations: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Central = z.infer<typeof centralSchema>
export type CentralFormData = Pick<Central, 
    'centralName'
    | 'codeName'
    | 'siteCode'
    | 'owner'
    | 'status'
    | 'provinceName'
    | 'districtName'
    | 'localityName'
    | 'address'
    | 'latitude'
    | 'longitude'
    | 'description'
    | 'observations'
>
