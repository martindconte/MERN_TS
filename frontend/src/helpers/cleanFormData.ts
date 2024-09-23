export const cleanFormData = <T extends Record<string, any>>(data: T): Partial<T> => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        // Filtra los valores que no deseas enviar en la consulta
        if (value !== 0 && value !== '' && value !== null && value !== undefined) {
            acc[key as keyof T] = value;
        }
        return acc;
    }, {} as Partial<T>);
};