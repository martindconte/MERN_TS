import { useState } from 'react'
import { Link } from 'react-router-dom'

export const BoardNav = () => {
  const [showMenuBoard, setShowMenuBoard] = useState<boolean>(false)

  return (
    <li
      className='relative px-4 py-2 hover:bg-neutral-700'
      onMouseEnter={() => setShowMenuBoard(true)}
      onMouseLeave={() => setShowMenuBoard(false)}
    >
      <p className='flex items-center gap-1 cursor-pointer'>
        Placas <span className='material-symbols-outlined'>arrow_right</span>
      </p>
      {showMenuBoard && (
        <ul className='absolute left-full top-0 bg-neutral-700 text-white shadow-lg py-2 w-48 z-50'>
          <li className='px-4 py-2 hover:bg-neutral-500 cursor-pointer'>
            <Link to='/catalog/board/new'>Crear</Link>
          </li>
          <li className='px-4 py-2 hover:bg-neutral-500'>
            <Link to='/catalog/board/search'>
              <span>Buscar</span>{' '}
              <span>Editar</span>{' '}
              <span>Eliminar</span>
            </Link>
          </li>
          <li className='px-4 py-2 hover:bg-neutral-500'>
            <Link to='/catalog/board/deleted'>Placas Eliminadas</Link>
          </li>
        </ul>
      )}
    </li>
  )
}
