import { Link } from "react-router-dom"
import { newSubrackLogo } from '../../../assets/img/catalog/subrack'

export const IndexSubrackView = () => {
  return (
    <main className='flex-1 px-2 py-4 bg-stone-800'>
      <h2 className='text-4xl uppercase font-extrabold text-center my-4 text-white'>DWDM <span className='text-amber-400'>Planner</span></h2>
      <h3 className='text-2xl uppercase font-extrabold text-center my-4 text-white'>Administracion de <span className='text-yellow-300'>Subracks</span></h3>
      <div className='flex flex-wrap text-center gap-5 justify-center text-black font-roboto'>
        <Link to='search' className='flex flex-col justify-center py-2 px-3 rounded-md w-1/5 h-56 bg-orange-300 hover:bg-orange-500'>
          <p className='font-semibold'>Buscar / Editar / Eliminar Subrack</p>
          <span className="material-symbols-outlined text-6xl py-3 group-hover:text-white">search</span>
          <p className='text-sm'><span className='uppercase text-blue-800 font-bold'>Modificar</span> o <span className='uppercase text-red-800 font-bold'>Eliminar</span> un Subrack</p>
        </Link>
        <Link to='new' className='flex flex-col justify-center py-2 px-3 rounded-md w-1/5 h-56 bg-emerald-400 hover:bg-emerald-700'>
          <p className='font-semibold'>Carga de Placas</p>
          <img src={newSubrackLogo} alt="newBoardLogo" className='my-4 mx-auto' />
          <p className='text-sm'><span className='uppercase text-blue-900 font-bold'>Crear</span> Nueva Placa</p>
        </Link>
        <Link to='deleted' className='flex flex-col justify-center py-2 px-3 rounded-md w-1/5 h-56 bg-red-400 hover:bg-red-800 hover:text-white hover:shadow-2xl hover:shadow-red-950 group'>
          <p className='font-semibold'>Subracks Eliminados</p>
          <span className="material-symbols-outlined text-6xl py-3 group-hover:text-white">delete</span>
          <p className='text-sm'><span className='uppercase font-bold'>Restaure o ELimine</span> DEFINITIVAMENTE un Subrack</p>
        </Link>
      </div>
    </main>
  )
}
