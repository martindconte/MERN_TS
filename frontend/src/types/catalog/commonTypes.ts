import z from 'zod'

export enum OwnerEnum {
  TASA = 'TASA',
  MVS = 'MVS',
  TELXIUS = 'TELXIUS',
  CLIENT = 'CLIENT',
  OTHER = 'OTHER',
  sd = 's/d',
}

export enum TechnologyEnum {
    DWDM = 'DWDM',
    SDH = 'SDH',
    RX = 'RX',
    CWDM = 'CWDM',
    IP = 'IP',
    GENERIC = 'GENERIC'
};

export enum RoadmapEnum {
    inService = 'InService',
    EndOfSupport = 'EndOfSupport',
    EndOfMarketing = 'EndOfMarketing',
    empty = ''
};

export const colors = [
    'bg-red-500 text-white',    'bg-red-400', 'bg-red-300', 'bg-red-200',
    'bg-orange-500', 'bg-orange-400', 'bg-orange-300', 'bg-orange-200',
    'bg-amber-500',  'bg-amber-400', 'bg-amber-300', 'bg-amber-200',
    'bg-yellow-500', 'bg-yellow-400', 'bg-yellow-300', 'bg-yellow-200',
    'bg-lime-500',   'bg-lime-400', 'bg-lime-300', 'bg-lime-200',
    'bg-green-500',  'bg-green-400', 'bg-green-300', 'bg-green-200',
    'bg-emerald-500','bg-emerald-400', 'bg-emerald-300', 'bg-emerald-200',
    'bg-teal-500', 'bg-teal-400', 'bg-teal-300', 'bg-teal-200',
    'bg-cyan-500', 'bg-cyan-400', 'bg-cyan-300', 'bg-cyan-200',
    'bg-sky-500', 'bg-sky-400', 'bg-sky-300', 'bg-sky-200',
    'bg-blue-500', 'bg-blue-400', 'bg-blue-300', 'bg-blue-200',
    'bg-indigo-500', 'bg-indigo-400', 'bg-indigo-300', 'bg-indigo-200',
    'bg-violet-500', 'bg-violet-400', 'bg-violet-300', 'bg-violet-200',
    'bg-purple-500', 'bg-purple-400', 'bg-purple-300', 'bg-purple-200',
    'bg-fuchsia-500 text-white', 'bg-fuchsia-400', 'bg-fuchsia-300', 'bg-fuchsia-200',
    'bg-pink-500 text-white', 'bg-pink-400', 'bg-pink-300', 'bg-pink-200',
    'bg-rose-500 text-white', 'bg-rose-400', 'bg-rose-300', 'bg-rose-200',
    'bg-slate-500 text-white', 'bg-slate-400', 'bg-slate-300', 'bg-slate-200',
    'bg-gray-500 text-white', 'bg-gray-400', 'bg-gray-300', 'bg-gray-200',
    'bg-zinc-500 text-white', 'bg-zinc-400', 'bg-zinc-300', 'bg-zinc-200',
    'bg-neutral-500 text-white', 'bg-neutral-400', 'bg-neutral-300', 'bg-neutral-200',
    'bg-stone-500 text-white', 'bg-stone-400', 'bg-stone-300', 'bg-stone-200'
];
  
  export enum CategoriesEnum {
    OTN = 'OTN',
    SDH = 'SDH',
    SONNET = 'SONNET',
    ETHERNET = 'ETHERNET',
    FLEXE = 'FLEXE',
    SAN = 'SAN',
    VIDEO = 'VIDEO',
  }

  export interface ICategories {
    SDH: string[];
    SONNET: string[];
    ETHERNET: string[];
    FLEXE: string[];
    SAN: string[];
    OTN: string[];
    VIDEO: string[];
  }
  
  export const categoriesValues = {
    [CategoriesEnum.OTN]: [ 'OTS', 'OMS', 'OSC', 'OCH', 'OTU1', 'OTU2', 'OTU3', 'OTU4', 'OTUCn', 'OTU25', 'OTU50', 'ODU0', 'ODU1', 'ODU2', 'ODU2e', 'ODU3', 'ODU4', 'ODUflex', 'ODUCn', 'OPU0','OPU1', 'OPU2', 'OPU2e', 'OPU3', 'OPU4', 'OPUflex', 'OPUCn' ],
    [CategoriesEnum.SDH]: ["STM-1", "STM-4", "STM-16", "STM-64"],
    [CategoriesEnum.SONNET]: ["OC-3", "OC-12", "OC-48", "OC-192"],
    [CategoriesEnum.ETHERNET]: ["FE", "GE", "10GE WAN", "10GE LAN", "25GE", "40GE", "50GE", "100GE", "200GE", "400GE"],
    [CategoriesEnum.FLEXE]: ["FlexE 100G unaware", "FlexE 200G unaware"],
    [CategoriesEnum.SAN]: ["FDDI", "ESCON", "FC100/FICON", "FC200/FICON Express", "FC400/FICON4G", "FC800/FICON8G", "FC1200/FICON10G", "FC1600", "FC3200"],
    [CategoriesEnum.VIDEO]: ["DVB-ASI", "SD-SDI", "HD-SDI", "HD-SDIRBR", "3G-SDI", "3G-SDIRBR"],
  };

export const paginationSchema = z.object({
    totalDocs: z.number().nonnegative(),
    totalResults: z.number().nonnegative(),
    totalPages: z.number().nonnegative(),
    prevPage: z.string().nullable().optional(), // Acepta string o null
    nextPage: z.string().nullable().optional(), // Acepta string o null
    page: z.number().positive(),
    hasPrevPage: z.boolean(),
    hasNextPage: z.boolean(),
  });

export type Pagination = z.infer<typeof paginationSchema>;
