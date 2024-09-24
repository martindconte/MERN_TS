import { useState, Dispatch, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { Central, Pagination } from '../../../types';

import { ButtonActions } from './ButtonActions';
import { ColumnSelector } from './ColumnSelector';
import { keyToShowInTable } from './keysToShowInTable';
import { PaginationComponent } from './PaginationComponents';
import { ModalDelete } from '../modalDelete/ModalDelete';

import { formatDate } from '../../../helpers';

import tableStyles from './styles/table.module.css';

export interface DeleteResponse {
  msg: string;
  payload: Central;
}

interface Identifiable {
  id: string;
}

interface Props<T extends Identifiable> {
  data: T[];
  pagination: Pagination;
  info: string;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<React.SetStateAction<number>>;
  fnDelete?: UseMutationResult<
    DeleteResponse,
    Error,
    { centralId: string },
    unknown
  >;
}

export const Table = <T extends Identifiable>({
  data,
  pagination,
  info,
  page,
  setPage,
  limit,
  setLimit,
  fnDelete,
}: Props<T>) => {

  const { pathname } = useLocation();

  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    keyToShowInTable[info].map(({ key }) => key)
  );

  const [modalView, setModalView] = useState(false)
  const [IdSelected, setIdSelected] = useState('')

  const handleDelete = async () => {
    if (IdSelected) {
      const response = await fnDelete?.mutateAsync({ centralId: IdSelected });
      if (response) setModalView(false);
    }
  };

  const columnHelper = createColumnHelper<T>();

  const columns = useMemo<ColumnDef<T, any>[]>(
    () => [
      columnHelper.display({
        id: "actions",
        header: () => "Acciones",
        cell: ({ row }) => (
          <div className={tableStyles.actions}>
            <ButtonActions
              path={ pathname }
              id={ row.original.id }
              setModalView={ setModalView }
              setIdSelected={ setIdSelected }
              fnDelete={ fnDelete }
            />
          </div>
        ),
      }),
      ...keyToShowInTable[info]
        .filter(({ key }) => selectedColumns.includes(key))
        .map(({ key, label }) =>
          columnHelper.accessor((row: T) => row[key as keyof T], {
            id: key,
            header: () => label,
            cell: (info) => {
              const value = info.getValue();
              if (value instanceof Date) {
                return formatDate(value);
              } else if (typeof value === "boolean") {
                return value ? "Activo" : "Desafectado";
              }
              return value;
            },
            enableResizing: true,
          })
        ),
    ],
    [info, selectedColumns, columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    pageCount: pagination.totalPages,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    onPaginationChange: (updater) => {
      const newPageIndex =
        typeof updater === "function"
          ? updater(table.getState().pagination).pageIndex
          : updater.pageIndex;
      setPage(newPageIndex + 1);
    },
  });

  return (
    <>
      {
        modalView && <ModalDelete
          handleDelete={ handleDelete }
          setModalView={ setModalView }
        />
      }
      <div className={tableStyles.tableContainer}>
        <ColumnSelector
          columns={keyToShowInTable[info]}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
        <table className={` ${tableStyles.table} font-oswald`}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={tableStyles.tr}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={tableStyles.th}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className={tableStyles.thContent}>
                        <p>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </p>
                        <span
                          className={`material-symbols-outlined ${tableStyles.sortIcon}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          swap_vert
                        </span>
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`${tableStyles.resizer} ${
                            header.column.getIsResizing()
                              ? tableStyles.isResizing
                              : ""
                          }`}
                        ></div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={`${tableStyles.td} ${tableStyles.wrapper}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
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
    </>
  );
};
