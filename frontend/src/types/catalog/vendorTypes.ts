import { z } from "zod";

// Esquemas
export const vendorSchema = z.object({
  id: z.string(),
  vendorName: z.string(),
  country: z.string(),
  observation: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const responseAPIVendors = z.array(vendorSchema)
export const responseAPIVendor = z.object({
  msg: z.string().optional(),
  payload: vendorSchema
});

// Types
export type VendorType = z.infer<typeof vendorSchema>;
export type VendorFormData = Pick<
  VendorType,
  "vendorName" | "country" | "observation"
>;