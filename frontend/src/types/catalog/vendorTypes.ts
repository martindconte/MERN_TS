import { z } from "zod";
import { transceiverSchema } from "./transceiverTypes";
import { boardSchema } from "./boardTypes";

// Esquemas
export const vendorSchema = z.object({
  id: z.string(),
  vendorName: z.string(),
  country: z.string(),
  observation: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean().optional(),
});

export const vendorDeletedSchema = z.object({
  vendors: z.array( vendorSchema ),
  transceivers: z.array( transceiverSchema ),
  boards: z.array( boardSchema ),
})


export const responseAPIVendors = z.array(vendorSchema)
export const responseAPIVendor = z.object({
  msg: z.string().optional(),
  payload: vendorSchema
});

// Types
export type VendorType = z.infer<typeof vendorSchema>;
export type VendorDeletedType = z.infer<typeof vendorDeletedSchema>
export type VendorFormData = Pick<
  VendorType,
  "vendorName" | "country" | "observation" | "isDeleted"
>;