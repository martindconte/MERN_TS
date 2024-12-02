import { useState } from 'react'
import { Link } from 'react-router-dom'

export const VendorNav = () => {
  const [showMenuVendor, setShowMenuVendor] = useState<boolean>(false)

  return (
    <li
      className='relative px-4 py-2 hover:bg-neutral-700'
      onMouseEnter={() => setShowMenuVendor(true)}
      onMouseLeave={() => setShowMenuVendor(false)}
    >
      <p className='flex items-center gap-1 cursor-pointer'>
        Vendors <span className='material-symbols-outlined'>arrow_right</span>
      </p>
      {showMenuVendor && (
        <ul className='absolute left-full top-0 bg-neutral-700 shadow-lg py-2 w-56 z-50'>
          <li className='px-4 py-2 hover:bg-neutral-500'>
            <Link to='/catalog/vendor'>
              <span>Crear </span>
              <span>Buscar </span>
              <span>Editar </span>
              <span>Eliminar </span>{' '}
            </Link>
          </li>
          <li className='px-4 py-2 hover:bg-neutral-500'>
            <Link to='/catalog/vendor/deleted'>Centrales eliminadas</Link>
          </li>
        </ul>
      )}
    </li>
  )
}
