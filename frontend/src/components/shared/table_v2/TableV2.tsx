import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BtnActions } from './BtnActions'
import { ColumnVisibilityControls } from './ColumnVisibilityControls'
import { infoToShowInTable } from './infoToShowInTable'
import { ModalDelete } from '../modalDelete/ModalDelete'
import { Pagination } from './types/tableType'
import { PaginationComponent } from './PaginationComponent'

type InfoToShowInTable = typeof infoToShowInTable
type InfoKey = keyof InfoToShowInTable

type InfoKeys<T extends InfoKey> = InfoToShowInTable[T][number]['key']

interface Props<T extends InfoKey> {
  info: T
  data: (Record<InfoKeys<T>, any> & { id: string; isDeleted?: boolean })[] // Asegura que las claves del objeto coincidan.
  pagination?: Pagination
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
  limit?: number
  setLimit?: Dispatch<SetStateAction<number>>
  fnDelete?: (id: string) => Promise<any> | void
  basePath?: string
  fnSelectRows?: (ids: string[]) => void
  selectedRows?: string[]
  fnSelectData?: (data: (Record<InfoKeys<T>, any> & { id: string; isDeleted?: boolean })[]) => void // Nueva función para manejar datos seleccionados
  selectedData?: (Record<InfoKeys<T>, any> & { id: string; isDeleted?: boolean })[] // Nuevo estado para almacenar los datos seleccionados
}

export const TableV2 = <T extends InfoKey>({
  info,
  data,
  pagination,
  limit,
  page,
  setLimit,
  setPage,
  fnDelete,
  basePath,
  fnSelectRows,
  selectedRows,
  fnSelectData,
  selectedData = [],
}: Props<T>) => {
  const thInfo = infoToShowInTable[info]
  const [visibleColumns, setVisibleColumns] = useState<Set<InfoKeys<T>>>(new Set(thInfo.map(th => th.key as InfoKeys<T>)))
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const [modalView, setModalView] = useState<boolean>(false)
  const [selectedRowsIds, setSelectedRowsIds] = useState<Set<string>>(new Set()) // Estado para almacenar los Ids seleccionados en la funcion fnSelectRows

  const renderCellContent = (key: InfoKeys<T>, value: any) => {
    if (key === 'vendor' && typeof value === 'object' && value?.vendorName) return value.vendorName
    if ((key === 'createdAt' || key === 'updatedAt') && value instanceof Date) return value.toLocaleDateString()
    if ((key === 'createdAt' || key === 'updatedAt') && typeof value === 'string') return new Date(value).toLocaleDateString()
    return value ?? '-'
  }

  useEffect(() => {
    setSelectedRowsIds(new Set(selectedRows))
  }, [selectedRows])

  //* Funcion para manejar la seleccion de filas almacena los ids de las filas seleccionadas
  const handleRowSelection = (id: string) => {
    const updatedSelectedIds = new Set<string>(selectedRowsIds)
    if (updatedSelectedIds.has(id)) {
      updatedSelectedIds.delete(id)
    } else {
      updatedSelectedIds.add(id)
    }
    setSelectedRowsIds(updatedSelectedIds)
    fnSelectRows?.(Array.from(updatedSelectedIds)) // Llama a la función con los IDs seleccionados
  }

  //* Funcion para manejar la seleccion de filas almacena los datos completos de las filas seleccionadas
  const handleRowsData = (rowData: Record<InfoKeys<T>, any> & { id: string; isDeleted?: boolean }) => {
    if (fnSelectData) {
      const isAlreadySelected = selectedData?.some(row => row.id === rowData.id)
      const newSelectedRows = isAlreadySelected ? selectedData?.filter(row => row.id !== rowData.id) || [] : [...(selectedData || []), rowData]
      fnSelectData(newSelectedRows)
    }
  }

  const handleDelete = async () => {
    if (selectedRowId) {
      const result = fnDelete?.(selectedRowId)
      if (result instanceof Promise) {
        await result
      }
      setModalView(false)
    }
  }

  return (
    <>
      {modalView && <ModalDelete handleDelete={handleDelete} setModalView={setModalView} />}
      <div className='overflow-x-auto px-4 py-2 font-oswald text-black bg-gray-50 mx-3 rounded-lg my-3'>
        {/* Controles de visibilidad de columnas */}
        <div className='flex justify-end'>
          {/* Manejo de Visibilidad de las columnas. Elijo que Columna mostrar */}
          <ColumnVisibilityControls
            columns={thInfo.map(({ key, label }) => ({
              key: key as InfoKeys<T>,
              label: label.toUpperCase(),
            }))}
            visibleColumns={visibleColumns}
            onVisibilityChange={setVisibleColumns}
          />
        </div>

        {/* Tabla */}
        <table className='table-auto w-full border-2 border-black'>
          <thead className='border-2 border-black'>
            <tr>
              <th className='border border-black font-normal text-sm py-1 uppercase bg-orange-200'>Acciones</th>
              {thInfo
                .filter(th => visibleColumns.has(th.key as InfoKeys<T>)) // Filtrar columnas visibles
                .map(th => (
                  <th key={th.key} className='border border-black font-normal text-sm py-1 uppercase bg-orange-200'>
                    {th.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className='font-light text-sm'>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-blue-200 ${
                  row.isDeleted
                    ? selectedRowsIds.has(row.id)
                      ? 'bg-red-700 text-white'
                      : 'bg-red-300'
                    : selectedRowsIds.has(row.id)
                    ? 'bg-fuchsia-300'
                    : ''
                }`}
              >
                <BtnActions
                  id={row.id} // paso el id de cada fila
                  isDeleted={row.isDeleted} // paso si el dato renderizado en la fila se encuentra eliminado
                  basePath={basePath} // paso cadena de path por si quiero que los botones redirigan a una direccion especifica
                  btnDelete={!!fnDelete} // booleano para mostrar el boton de eliminar o no (si existe la funcion fnDelete se muestra el bioton)
                  setSelectedRowId={setSelectedRowId} // dispach para manejar el id seleccionado para ser eliminado. Al presionar el boton eliminar se pasa al modal el id para confiormar que sera eliminado
                  setModalView={setModalView} // dispatch para mostrar o no el modal de eliminacion (en caso de cancelar la eliminacion se cierra el modal)
                  onSelectRowsIds={fnSelectRows && handleRowSelection} // dispatch para manejar la seleccion de filas	por id
                  onSelectRowsData={() => handleRowsData(row)} // dispatch para manejar la seleccion de filas por datos completos
                />
                {/* <BtnActions
                  id={ row.id } // paso el id de cada fila
                  isDeleted={ row.isDeleted } // paso si el dato renderizado en la fila se encuentra eliminado
                  basePath={basePath} // paso cadena de path por si quiero que los botones redirigan a una direccion especifica
                  btnDelete={!!fnDelete} // booleano para mostrar el boton de eliminar o no (si existe la funcion fnDelete se muestra el bioton) 
                  setSelectedRowId={setSelectedRowId} // dispach para manejar el id seleccionado para ser eliminado. Al presionar el boton eliminar se pasa al modal el id para confiormar que sera eliminado
                  setModalView={setModalView} // dispatch para mostrar o no el modal de eliminacion (en caso de cancelar la eliminacion se cierra el modal)
                  onSelectRowsIds={fnSelectRows && handleRowSelection} // dispatch para manejar la seleccion de filas	por id
                /> */}
                {thInfo
                  .filter(th => visibleColumns.has(th.key as InfoKeys<T>)) // Filtrar columnas visibles
                  .map(thData => (
                    <td key={thData.key} className='border border-black text-center px-2 py-1'>
                      {renderCellContent(thData.key as InfoKeys<T>, row[thData.key as InfoKeys<T>])}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        {pagination && <PaginationComponent pagination={pagination} page={page} limit={limit} setPage={setPage} setLimit={setLimit} />}
      </div>
    </>
  )
}
