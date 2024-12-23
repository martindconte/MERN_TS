export interface Pagination {
    page: number,
    totalDocs: number;
    totalResults: number;
    totalPages: number;
    prevPage?: string | null; // Acepta string o null
    nextPage?: string | null; // Acepta string o null
    hasPrevPage: boolean,
    hasNextPage: boolean,
}