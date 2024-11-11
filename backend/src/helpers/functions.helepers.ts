export function parseSubFilter(filter: any): any {
    const subQuery: { [key: string]: any } = {};

    for (const key in filter) {
        if (filter[key]) {
            switch (key) {
                case 'gte':
                    subQuery[key] = { $gte: filter[key] };
                    break;
                case 'lte':
                    subQuery[key] = { $lte: filter[key] };
                    break;
                default:
                    const regex = new RegExp(filter[key], 'i');
                    subQuery[key] = { $regex: regex };
                    break;
            }
        }
    }
    return subQuery;
}

export function sortBy<T extends { [key: string]: any }>(array: T[], claves: string[]): T[] {
    return array.sort((a, b) => {
        for (let i = 0; i < claves.length; i++) {
            const clave = claves[i];

            // Asumimos que las propiedades pueden ser accedidas mediante string keys
            const valorA = clave.split('.').reduce((acc, part) => acc && acc[part], a);
            const valorB = clave.split('.').reduce((acc, part) => acc && acc[part], b);

            // Comparación de los valores
            if (valorA > valorB) return 1;
            if (valorA < valorB) return -1;
        }
        return 0;
    });
}

export function findDuplicateByKeys<T>(array: T[], keys: (keyof T)[]): T | null {
    const valueMap = new Map<string, Set<any>>();
    for (const obj of array) {
      for (const key of keys) {
        const value = obj[key];
        const keyString = key.toString();
        if (!valueMap.has(keyString)) {
          valueMap.set(keyString, new Set());
        }
        if (valueMap.get(keyString)!.has(value)) {
          return obj;
        } else {
          valueMap.get(keyString)!.add(value);
        }
      }
    }
    return null;
  }

  export function generateRandomCode( quantity: number ): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < quantity; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}