import { ChangeEvent, Dispatch } from 'react'
import { Pagination } from './types/tableType'

interface Props {
  pagination: Pagination
  page?: number // También opcional
  setPage?: Dispatch<React.SetStateAction<number>> // Opcional
  limit?: number // Opcional
  setLimit?: Dispatch<React.SetStateAction<number>> // Opcional
}

export const PaginationComponent = ({ pagination, limit, page, setLimit, setPage }: Props) => {
  const handlePageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPage?.(+event.target.value)
  }

  return (
    <div className='text-sm flex items-center justify-center gap-8 mt-2 py-1'>
      <p>
        Cantidad de Datos: {pagination.totalResults} de {pagination.totalDocs}
      </p>
      <div className='flex gap-2'>
        <button
          type='button'
          className={`bg-blue-600 text-white px-3 py-1 rounded-lg ${
            pagination.hasPrevPage ? 'hover:bg-blue-800 cursor-pointer' : 'opacity-65 cursor-auto'
          }`}
          onClick={() => { if (pagination.hasPrevPage && setPage && page && page > 1) setPage(page - 1) }}
        >
          <p className='flex items-center uppercase text-xs'>
            <span className='material-symbols-outlined text-[16px]'>arrow_back</span> Prev
          </p>
        </button>
        <p className='flex items-center gap-2 text-sm'>
          <span>Pagina</span>
          <input
            type='number'
            value={page}
            min={1}
            step={1}
            max={pagination.totalPages}
            className='border border-gray-600 outline-none px-2 py-1 text-xs text-center rounded'
            onChange={handlePageChange}
          />
          <span>de {pagination.totalPages}</span>
        </p>
        <button
          type='button'
          className={`bg-emerald-600 text-white px-3 py-1 rounded-lg ${
            pagination.hasNextPage ? 'hover:bg-emerald-800 cursor-pointer' : 'opacity-65 cursor-auto'
          }`}
          onClick={() => { if (pagination.hasNextPage && setPage && page && page < pagination.totalPages) setPage(page + 1) }}
        >
          <p className='flex items-center uppercase text-xs'>
            <span className='material-symbols-outlined text-[16px]'>arrow_forward</span> Next
          </p>
        </button>
      </div>
      <div className='flex items-center gap-2'>
        <label htmlFor='limitPagination'>Limite:</label>
        <select
          name='limitPagination'
          id='limitPagination'
          className='outline-none border border-gray-400 px-2'
          value={limit}
          onChange={e => setLimit?.(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}