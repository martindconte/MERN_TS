export interface Pagination {
    page: number,
    limit: number
}

export interface Filters {
    [key: string]: any
}

export class QueriesDTO {

    static pagination(queries?: { [key: string]: any }): [ Pagination?, Filters? ] {

        let pagination: Pagination | undefined = undefined;
        let filters: Filters = {};

        if (queries) {
            const { page, limit, ...restFilters } = queries;

            // Verifica si 'page' es un número válido y lo asigna
            if (page !== undefined && !isNaN(Number(page))) {
                pagination = pagination || { page: 1, limit: 10 };
                pagination.page = Number(page);
            }

            // Verifica si 'limit' es un número válido y lo asigna
            if (limit !== undefined && !isNaN(Number(limit))) {
                pagination = pagination || { page: 1, limit: 10 };
                pagination.limit = Number(limit);
            }

            // Asigna el resto de las queries a filters
            filters = { ...restFilters };
        }

        return [pagination, filters];
    }

}