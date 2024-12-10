import { useState } from 'react'
import { Link } from 'react-router-dom'

export const TransceiverNav = () => {

    const [showMenuTransceiver, setShowMenuTransceiver] = useState<boolean>(false)

    return (
        <li
          className='relative px-4 py-2 hover:bg-neutral-700'
          onMouseEnter={() => setShowMenuTransceiver(true)}
          onMouseLeave={() => setShowMenuTransceiver(false)}
        >
          <Link to='/catalog/transceiver'className='flex items-center gap-1 cursor-pointer'>
            Modulos <span className='material-symbols-outlined'>arrow_right</span>
          </Link>
          {showMenuTransceiver && (
            <ul className='absolute left-full top-0 bg-neutral-700 text-white shadow-lg py-2 w-48 z-50'>
              <li className='px-4 py-2 hover:bg-neutral-500 cursor-pointer'>
                <Link to='/catalog/transceiver/new'>Crear</Link>
              </li>
              <li className='px-4 py-2 hover:bg-neutral-500'>
                <Link to='/catalog/transceiver/search'>
                  <span>Buscar</span>{' '}
                  <span>Editar</span>{' '}
                  <span>Eliminar</span>
                </Link>
              </li>
              <li className='px-4 py-2 hover:bg-neutral-500'>
                <Link to='/catalog/transceiver/deleted'>Modulos Eliminadas</Link>
              </li>
            </ul>
          )}
        </li>
      )
}
