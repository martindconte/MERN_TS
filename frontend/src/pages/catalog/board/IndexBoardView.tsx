import { Link } from 'react-router-dom';

import { newBoardIcon, searchBoardIconFill } from '../../../assets/img/catalog/board';

export const IndexBoardView = () => {
  return (
    <main className='flex-1 px-2 py-4 bg-slate-900'>
      <h2 className='text-4xl uppercase font-extrabold text-center my-4 text-white'>DWDM <span className='text-amber-400'>Planner</span></h2>
      <h3 className='text-2xl uppercase font-extrabold text-center my-4 text-white'>Administracion de <span className='text-rose-400'>Placas</span></h3>
      <div className='flex flex-wrap text-center gap-5 justify-center text-black font-roboto'>
        <Link to='search' className='flex flex-col justify-center py-2 px-3 rounded-md bg-lime-300 w-1/5 h-44 hover:bg-lime-500'>
          <p className='font-semibold'>Buscar / Editar / Eliminar Placa</p>
          <img src={searchBoardIconFill} alt="boardLogo" className='my-4 mx-auto' />
          <p className='text-sm'><span className='uppercase text-blue-800 font-bold'>Modificar</span> o <span className='uppercase text-red-800 font-bold'>Eliminar</span> una Placa</p>
        </Link>
        <Link to='new' className='flex flex-col justify-center py-2 px-3 rounded-md bg-orange-200 w-1/5 hover:bg-orange-400'>
          <p className='font-semibold'>Carga de Placas</p>
          <img src={newBoardIcon} alt="newBoardLogo" className='my-4 mx-auto' />
          <p className='text-sm'><span className='uppercase text-green-800 font-bold'>Crear</span> Nueva Placa</p>
        </Link>
        <Link to='deleted' className='flex flex-col justify-center py-2 px-3 rounded-md bg-red-400 w-1/5 hover:bg-red-800 hover:text-white hover:shadow-2xl hover:shadow-red-950 group'>
          <p className='font-semibold'>PLacas Eliminadas</p>
          <span className="material-symbols-outlined text-6xl py-3 group-hover:text-white">mop</span>
          <p className='text-sm'><span className='uppercase font-bold'>Restaure o ELimine</span> DEFINITIVAMENTE una Placa</p>
        </Link>
      </div>
    </main>
  )
}
