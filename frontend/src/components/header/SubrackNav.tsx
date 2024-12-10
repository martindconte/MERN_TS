import { useState } from 'react'
import { Link } from 'react-router-dom'

export const SubrackNav = () => {
  const [showMenuSubrack, setShowMenuSubrack] = useState<boolean>(false)

  return (
    <li
      className='relative px-4 py-2 hover:bg-neutral-700'
      onMouseEnter={() => setShowMenuSubrack(true)}
      onMouseLeave={() => setShowMenuSubrack(false)}
    >
      <Link
        to='/catalog/subrack'
        className='flex items-center gap-1 cursor-pointer'
      >
        Subracks<span className='material-symbols-outlined'>arrow_right</span>
      </Link>
      {showMenuSubrack && (
        <ul className='absolute left-full top-0 bg-neutral-700 text-white shadow-lg py-2 w-48 z-50'>
          <li className='px-4 py-2 hover:bg-neutral-500 cursor-pointer'>
            <Link to='/catalog/subrack/new'>Crear</Link>
          </li>
          <li className='px-4 py-2 hover:bg-neutral-500'>
            <Link to='/catalog/subrack/search'>
              <span>Buscar</span> <span>Editar</span> <span>Eliminar</span>
            </Link>
          </li>
          <li className='px-4 py-2 hover:bg-neutral-500'>
            <Link to='/catalog/subrack/deleted'>Subracks Eliminados</Link>
          </li>
        </ul>
      )}
    </li>
  )
}
