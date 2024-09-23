import { z } from "zod";

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

  // Esquema completo para la respuesta de la API
export const responseGetCentralsSchema = z.object({
    payload: z.array( centralSchema ),
    pagination: paginationSchema,
  });

export const responseCentralsSchema = z.object({
  msg: z.string(),
  payload: centralSchema
});

export type Central = z.infer<typeof centralSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type CentralFormData = Pick<
  Central,
  | "centralName"
  | "codeName"
  | "siteCode"
  | "owner"
  | "status"
  | "provinceName"
  | "districtName"
  | "localityName"
  | "address"
  | "latitude"
  | "longitude"
  | "description"
  | "observations"
>;

//! nunca UTILIZADA!!!!!!!!!!!!!!!!!!!
// export type ResponseCentrals = z.infer<typeof responseGetCentralsSchema>