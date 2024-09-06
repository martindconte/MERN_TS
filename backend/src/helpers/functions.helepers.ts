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

export function sortBy<T>(array: T[], claves: (keyof T)[]): T[] {
    return array.sort((a, b) => {
        for (let i = 0; i < claves.length; i++) {
            const clave = claves[i];
            const valorA = a[clave];
            const valorB = b[clave];
            
            // Si los valores no son iguales, devolvemos el resultado de la comparación
            if (valorA > valorB) return 1;
            if (valorA < valorB) return -1;
        }
        // Si son iguales en todas las claves, no cambia el orden
        return 0;
    });
}