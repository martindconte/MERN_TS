import { Link } from "react-router-dom"

export const HomePageView = () => {
  return (
    <main className="flex-1 text-white bg-stone-900 px-2 py-4 font-roboto">
      <h2 className="uppercase text-center text-4xl font-bold font-oswald">DWDM <span className="text-yellow-500">Planner</span></h2>
      <h3 className='uppercase font-semibold text-center w-3/4 mx-auto py-4 '>Aqui podra {' '}
        <span className='text-green-700 italic font-bold'>Crear</span>{' '}
        <span className='text-blue-700 font-bold italic'>Modificar</span>{' '}
        <span className='text-red-600 font-bold italic'>Eliminar</span> y {' '}
        <span className='text-cyan-700 font-bold italic'>Buscar</span> elementos de la red
      </h3>

      <div className="flex items-center justify-center my-12">
        <Link
          to='/central'
          className='w-1/5 text-black text-center justify-center bg-blue-300 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/95 hover:text-white'>
          <p className='uppercase text-lg'>Centrales</p>
        </Link>
        <Link
          to='/catalog'
          className='w-1/5 text-black text-center justify-center bg-orange-300 mx-2 my-5 inline-flex flex-col px-3 py-4 gap-2 font-semibold rounded-md transition hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/95 hover:text-white'>
          <p className='uppercase text-lg'>Catalogo</p>
        </Link>
      </div>
    </main>
  )
}
