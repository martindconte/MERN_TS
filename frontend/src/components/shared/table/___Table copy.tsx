import { useState, Dispatch, useMemo } from 'react';
import { Central, Pagination } from '../../../types';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { keyToShowInTable } from './keysToShowInTable';
import { formatDate } from '../../../helpers';
import tableStyles from './styles/table.module.css';
import { PaginationComponent } from './PaginationComponents';
import { ColumnSelector } from './ColumnSelector';

interface Props {
  data: Central[];
  pagination: Pagination;
  info: string;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<React.SetStateAction<number>>;
}

export const Table = ({ data, pagination, info, page, setPage, limit, setLimit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(keyToShowInTable[info].map(({ key }) => key));

  const columnHelper = createColumnHelper<Central>();

  const columns = useMemo<ColumnDef<Central, any>[]>(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => 'Acciones',
        cell: ({ row }) => (
          <div className={tableStyles.actions}>
            <button onClick={() => console.log('Consultar', row.original)}><span className={`material-symbols-outlined ${tableStyles.descriptionIcon}`}>description</span></button>
            <button onClick={() => console.log('Modificar', row.original)}><span className={`material-symbols-outlined ${tableStyles.editIcon}`}>edit</span></button>
            <button onClick={() => console.log('Eliminar', row.original)}><span className={`material-symbols-outlined ${tableStyles.deleteIcon}`}>delete</span></button>
          </div>
        ),
      }),
      ...keyToShowInTable[info]
        .filter(({ key }) => selectedColumns.includes(key))
        .map(({ key, label }) =>
          columnHelper.accessor(key as keyof Central, {
            header: () => label,
            cell: (info) => {
              const value = info.getValue();
              if (value instanceof Date) {
                return formatDate(value);
              } else if (typeof value === 'boolean') {
                return value ? 'Activo' : 'Desafectado';
              }
              return value;
            },
            enableResizing: true,
          })
        ),
    ], [info, selectedColumns]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    pageCount: pagination.totalPages,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      }
    },
    onPaginationChange: (updater) => {
      const newPageIndex = typeof updater === 'function' ? updater(table.getState().pagination).pageIndex : updater.pageIndex;
      setPage(newPageIndex + 1);
    },
  });

  return (
    <div className={tableStyles.tableContainer}>
      <ColumnSelector
        columns={keyToShowInTable[info]}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
      <table className={` ${tableStyles.table} font-oswald`}>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={tableStyles.tr}>
                {
                  headerGroup.headers.map((header) => (
                    <th key={header.id} className={tableStyles.th} style={{ width: header.getSize() }}>
                      {
                        header.isPlaceholder
                          ? null
                          : (
                            <div className={tableStyles.thContent}>
                              <p>
                                {
                                  flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )
                                }
                              </p>
                              <span className={`material-symbols-outlined ${tableStyles.sortIcon}`} onClick={header.column.getToggleSortingHandler()}>swap_vert</span>
                              <div onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} className={`${tableStyles.resizer} ${header.column.getIsResizing() ? tableStyles.isResizing : ''}`}></div>
                            </div>
                          )
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {
                  row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }} className={`${tableStyles.td} ${tableStyles.wrapper}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <PaginationComponent
        table={table}
        limit={limit}
        setLimit={setLimit}
        totalDocs={pagination.totalDocs}
        totalResults={pagination.totalResults}
      />
    </div>
  );
};
