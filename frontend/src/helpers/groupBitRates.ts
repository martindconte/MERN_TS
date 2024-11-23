import { categoriesValues, ICategories } from "../types";

export const groupBitRates = (data: string[]): { [key in keyof ICategories]: string[] } => {
    return Object.keys(categoriesValues).reduce((acc, category) => {
      acc[category as keyof ICategories] = data.filter((service) => categoriesValues[category as keyof ICategories].includes(service));
      return acc;
    }, {} as { [key in keyof ICategories]: string[] });
  };
