import { useState } from 'react'

interface ColumnVisibilityControlsProps<T> {
  columns: { key: T; label: string }[]
  visibleColumns: Set<T> // Estado inicial de columnas visibles
  onVisibilityChange: (visibleColumns: Set<T>) => void // Callback para enviar cambios al padre
}

export const ColumnVisibilityControls = <T extends string>({ columns, visibleColumns, onVisibilityChange }: ColumnVisibilityControlsProps<T>) => {
  const [showColumnData, setShowColumnData] = useState<boolean>(false)
  const handleCheckboxChange = (key: T) => {
    const updatedColumns = new Set(visibleColumns)
    if (updatedColumns.has(key)) {
      updatedColumns.delete(key)
    } else {
      updatedColumns.add(key)
    }
    onVisibilityChange(updatedColumns)
  }

  return (
    <>
      {showColumnData ? (
        <div className='text-sm space-x-3 bg-yellow-100 px-4 py-1 my-2 rounded-lg'>
          {columns.map(({ key, label }) => (
            <label key={key} className=''>
              <input type='checkbox' checked={visibleColumns.has(key)} onChange={() => handleCheckboxChange(key)} className='mr-1' />
              {label}
            </label>
          ))}
          <button
            type='button'
            className='bg-blue-400 px-3 py-1 uppercase rounded-lg hover:bg-blue-800 hover:text-white'
            onClick={() => setShowColumnData(false)}
          >
            Ocultar Informacion
          </button>
        </div>
      ) : (
        <button
            type='button'
            className='my-2 bg-yellow-300 uppercase text-sm px-3 py-2 rounded-lg hover:bg-yellow-700 hover:text-white'
            onClick={() => setShowColumnData(prev => !prev)}
        >
          Seleecionar Columnas a Visualizar
        </button>
      )}
    </>
  )
}
