import { Link } from 'react-router-dom'

export const CatalogIndexView = () => {
  return (
    <main className='bg-gray-900 text-white py-3 h-svh'>
      <h2 className=' text-4xl uppercase font-extrabold text-center'>
        DWDM <span className='text-orange-600'>Planner</span>
      </h2>
      <h3 className='uppercase font-semibold text-center w-3/4 mx-auto py-4 '>
        Aqui podra <span className='text-green-700 italic font-bold'>Crear</span> <span className='text-blue-700 font-bold italic'>Modificar</span>{' '}
        <span className='text-red-600 font-bold italic'>Eliminar</span> y <span className='text-cyan-700 font-bold italic'>Buscar</span> Catalogo de:{' '}
      </h3>
      <div className='w-11/12 text-black flex flex-wrap gap-4 mx-auto my-4 justify-center cursor-pointer'>
        <Link
          to='subrack '
          className='w-1/5 text-center justify-center bg-gray-100 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-green-400/100 hover:text-white'
        >
          <p className='uppercase text-lg'>Subracks</p>
        </Link>
        <Link
          to='board'
          className='w-1/5 text-center justify-center bg-gray-100 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/95 hover:text-white'
        >
          <p className='uppercase text-lg'>Placas</p>
        </Link>
        <Link
          to='transceiver'
          className='w-1/5 text-center justify-center bg-gray-100 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/95 hover:text-white'
        >
          <p className='uppercase text-lg'>Transceiver</p>
        </Link>
        <Link
          to='bitrate'
          className='w-1/5 text-center justify-center bg-gray-100 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-purple-700 hover:shadow-lg hover:shadow-red-500/95 hover:text-white'
        >
          <p className='uppercase text-lg'>Velocidades</p>
        </Link>
        <Link
          to='signal'
          className='w-1/5 text-center justify-center bg-gray-100 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/95 hover:text-white'
        >
          <p className='uppercase text-lg'>Señales</p>
        </Link>
        <Link
          to='vendor'
          className='w-1/5 text-center justify-center bg-gray-100 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/95 hover:text-white'
        >
          <p className='uppercase text-lg'>Proovedor/vendor</p>
        </Link>
      </div>
    </main>
  )
}
