import { Link } from 'react-router-dom'
import { useState } from 'react'
import { VendorNav } from '../../components/header/VendorNav'
import { BoardNav } from '../../components/header/BoardNav'
import { TransceiverNav } from '../../components/header/TransceiverNav'
import { SubrackNav } from '../../components/header/SubrackNav'

export const Header = () => {
  const [showCatalogo, setShowCatalogo] = useState(false)
  // const [showVendor, setShowVendor] = useState(false);

  return (
    <header className='bg-black text-white px-2 py-2 font-roboto'>
      <div className='flex items-center gap-4'>
        <Link to='/'>
          <h1 className='text-xl font-bold'>DWDM Planner</h1>
        </Link>
        <nav>
          <ul className='flex gap-4 relative font-roboto_condensed'>
            {/* Catálogo */}
            <li
              className='relative'
              onMouseEnter={() => setShowCatalogo(true)}
              onMouseLeave={() => setShowCatalogo(false)}
            >
              <div className='flex items-center gap-1 cursor-pointer'>
                Catálogo
                <span className='material-symbols-outlined'>
                  arrow_drop_down
                </span>
              </div>
              {showCatalogo && (
                <ul className='absolute left-0 top-full bg-black text-white shadow-lg py-2 w-36'>
                  <TransceiverNav />
                  <BoardNav />
                  <SubrackNav />
                  <VendorNav />
                </ul>
              )}
            </li>
            {/* Centrales */}
            <li className='flex items-center gap-1'>
              <Link to='/central'>Centrales</Link>
              <span className='material-symbols-outlined'>arrow_drop_down</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
