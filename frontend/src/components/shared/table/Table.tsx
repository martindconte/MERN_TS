import { useState, Dispatch, useMemo } from 'react';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';

import { Pagination } from '../../../types';

import { ButtonActions } from './ButtonActions';
import { ColumnSelector } from './ColumnSelector';
import { keyToShowInTable } from './keysToShowInTable';
import { PaginationComponent } from './PaginationComponents';
import { ModalDelete } from '../modalDelete/ModalDelete';

import { formatDate } from '../../../helpers';

import tableStyles from './styles/table.module.css';

export interface DeleteResponse<T> {
  msg?: string;
  payload: T;
}

interface Identifiable {
  id: string;
  isDeleted?: boolean;
}

type Props<T extends Identifiable> = {
  data: T[];
  selectedData?: T[];
  info: string;
  fnDelete?: (id: string) => Promise<any> | void;
  // fnDelete?: UseMutationResult<DeleteResponse<T>, Error, { id: string }, unknown>;
  // fnDelete?: ( id: string ) => DeleteResponse<T>
  fnSelected?: (selectedRows: T[]) => void;
  path?: string;
} & (
    | {
      pagination: Pagination;
      page: number;
      setPage: Dispatch<React.SetStateAction<number>>;
      limit: number;
      setLimit: Dispatch<React.SetStateAction<number>>;
    }
    | {
      pagination?: undefined;
      page?: never;
      setPage?: never;
      limit?: never;
      setLimit?: never;
    }
  );

//* type que paso a ButtonActions para usar en las paginas /*****/deleted. Para de esta manera poder armar el link con el condicional si esta o no eliminado
// type BaseRowData = { id: string; isDeleted?: boolean };

export const Table = <T extends Identifiable>({ data, pagination, info, page, setPage, limit, setLimit, fnDelete, fnSelected, selectedData, path }: Props<T>) => {
  // export const Table = <T extends Identifiable & BaseRowData>({ data, pagination, info, page, setPage, limit, setLimit, fnDelete, fnSelected, selectedData, path }: Props<T>) => {

  const [selectedColumns, setSelectedColumns] = useState<string[]>(keyToShowInTable[info].map(({ key }) => key));
  const [modalView, setModalView] = useState(false);
  const [idSelected, setIdSelected] = useState('');

  const handleDelete = async () => {
    if (idSelected) {
      const result = fnDelete?.(idSelected);
      if (result instanceof Promise) {
        await result; // Si es una promesa, espera a que se resuelva
      }
      setModalView(false);
    }
  };
  // const handleDelete = () => {
  //   if (idSelected && fnDelete) {
  //     const response = fnDelete(idSelected);
  //     if (response) setModalView(false);
  //   }
  // };
  // const handleDelete = async () => {
  //   if (idSelected) {
  //     const response = await fnDelete?.mutateAsync({ id: idSelected });
  //     if (response) setModalView(false);
  //   }
  // };

  const handleRowSelect = (rowData: T) => {
    if (fnSelected) {
      const isAlreadySelected = selectedData?.some(row => row.id === rowData.id);
      const newSelectedRows = isAlreadySelected
        ? selectedData?.filter(row => row.id !== rowData.id) || []
        : [...(selectedData || []), rowData];
      fnSelected(newSelectedRows);
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
              path={path}
              // path={ pathname }
              id={row.original.id}
              btnDelete={fnDelete ? true : false}
              setModalView={setModalView}
              setIdSelected={setIdSelected}
              fnSelected={() => handleRowSelect(row.original)}
              selectedData={selectedData}
              isDeleted={row.original?.isDeleted}
            />
          </div>
        ),
      }),

      //todo: bandwidth no tendra mas amount y unit... revisar y corregir esto...
      ...keyToShowInTable[info]
        .filter(({ key }) => selectedColumns.includes(key))
        .map(({ key, label }) =>
          columnHelper.accessor((row: T) => {
            if (key === 'amount' || key === 'unit') {
              // Verifica si row tiene la propiedad bandwidth antes de acceder
              if ('bandwidth' in row && row.bandwidth) {
                return row.bandwidth[key as keyof typeof row.bandwidth];
              }
              return undefined;
            }
            return row[key as keyof T];
          }, {
            id: key,
            header: () => label,
            cell: (info) => {
              const value = info.getValue();
              if (value instanceof Date) return formatDate(value);
              if (typeof value === 'boolean') return value ? "Activo" : "Desafectado";
              if (typeof value === 'object' && value !== null) {
                if ('vendorName' in value) return value.vendorName;
                // if ( 'amount' in value ) return value.amount;
                // if ( 'unit' in value ) return value.unit;
              }
              // const value = info.getValue();
              // if (value instanceof Date) {
              //   return formatDate(value);
              // } else if (typeof value === "boolean") {
              //   return value ? "Activo" : "Desafectado";
              // }
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
    getSortedRowModel: getSortedRowModel(),
    ...(pagination && {
      getPaginationRowModel: getPaginationRowModel(),
      pageCount: pagination.totalPages,
      manualPagination: true,
      state: {
        pagination: {
          pageIndex: (page ?? 1) - 1,
          pageSize: limit ?? 10,
        },
      },
      onPaginationChange: (updater) => {
        const newPageIndex =
          typeof updater === "function"
            ? updater(table.getState().pagination).pageIndex
            : updater.pageIndex;
        setPage?.(newPageIndex + 1);
      },
    }),
  });

  return (
    <>
      {
        modalView && <ModalDelete
          handleDelete={handleDelete}
          setModalView={setModalView}
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
                          className={`${tableStyles.resizer} ${header.column.getIsResizing() ? tableStyles.isResizing : ""}`}
                        ></div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={`${selectedData && selectedData?.length > 0 && selectedData.some(data => data.id === row.original.id) ? 'bg-fuchsia-300 border-2 border-black' : ''} ${ row.original.isDeleted ? 'bg-red-200' : '' }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellValue: any = cell.getContext().getValue();
                    const isDeleted = (typeof cellValue === 'string' && cellValue.includes('_DELETED_')) ||
                      (typeof cellValue === 'object' && cellValue !== null && 'vendorName' in cellValue && typeof cellValue.vendorName === 'string' && cellValue.vendorName.includes('_DELETED_'));
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        // className={`${tableStyles.td} ${tableStyles.wrapper}`}
                        className={`${tableStyles.td} ${tableStyles.wrapper} ${isDeleted ? 'bg-red-600 text-white' : ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {pagination && (
          <PaginationComponent
            table={table}
            limit={limit}
            setLimit={setLimit}
            totalDocs={pagination.totalDocs}
            totalResults={pagination.totalResults}
          />
        )}
      </div>
    </>
  );
};
