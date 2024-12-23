import { Link, useLocation } from 'react-router-dom'
import { Dispatch } from 'react'

interface Props {
  id: string
  setSelectedRowId: Dispatch<React.SetStateAction<string | null>>
  setModalView: Dispatch<React.SetStateAction<boolean>>
  btnDelete: boolean
  basePath?: string
  isDeleted?: boolean
  onSelectRowsIds?: (id: string) => void
}

export const BtnActions = ({ id, isDeleted, basePath, setSelectedRowId, btnDelete, setModalView, onSelectRowsIds }: Props) => {
  const { pathname } = useLocation()

  const pathToNavigate = (basePath || window.location.pathname)
    .split('/')
    .filter(segment => segment && segment !== 'search')
    .join('/')

  const handleNavigate = (subpath: string) => {
    const targetPath = `/${pathToNavigate}/${subpath}/${id}`
    return pathname.includes('deleted') && isDeleted ? `${targetPath}?isDeleted=true` : targetPath
  }

  const handleSelected = (id: string) => {
    setModalView && setModalView(true)
    setSelectedRowId && setSelectedRowId(id)
  }

  return (
    <td className='border border-black text-center px-2 py-1 space-x-1'>
      <Link
        to={handleNavigate('details')}
        className='material-symbols-outlined hover:cursor-pointer text-[16px] bg-emerald-400 hover:bg-emerald-800 hover:text-white p-1 rounded-full'
        title='Descripcion'
      >
        description
      </Link>
      <Link
        to={handleNavigate('edit')}
        className='material-symbols-outlined hover:cursor-pointer text-[16px] bg-blue-400 hover:bg-blue-800 hover:text-white p-1 rounded-full'
        title='Editar'
      >
        edit
      </Link>
      {btnDelete && (
        <button
          type='button'
          className='material-symbols-outlined hover:cursor-pointer text-[16px] bg-red-400 hover:bg-red-800 hover:text-white p-1 rounded-full'
          title='Eliminar'
          onClick={() => handleSelected(id)}
        >
          delete
        </button>
      )}
      {onSelectRowsIds && (
        <button
          type='button'
          className='material-symbols-outlined hover:cursor-pointer text-[16px] bg-fuchsia-400 hover:bg-fuchsia-800 hover:text-white p-1 rounded-full'
          title='Seleccionar'
          onClick={() => onSelectRowsIds(id)}
        >
          start
        </button>
      )}
    </td>
  )
}
