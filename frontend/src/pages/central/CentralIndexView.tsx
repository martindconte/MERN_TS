import { Link } from "react-router-dom"

export const CentralIndexView = () => {
    return (
        <main className='flex-1 px-2 py-4 bg-stone-700 text-white'>
            <h2 className='text-4xl uppercase font-extrabold text-center my-4'>DWDM <span className='text-red-400'>Planner</span></h2>
            <h3 className='text-2xl uppercase font-extrabold text-center my-4'>Administracion de Centros</h3>
            <div className='flex flex-wrap text-center gap-5 justify-center text-black font-roboto'>
                <Link to='search' className='py-2 px-3 rounded-md bg-yellow-100 w-1/5 hover:bg-orange-300'>
                    <p className='font-semibold'>Buscar Centros</p>
                    <span className="material-symbols-outlined text-6xl py-3 text-blue-700">location_city</span>
                    <p className='text-sm'><span className='uppercase text-blue-800 font-bold'>Modificar</span> o <span className='uppercase text-red-800 font-bold'>Eliminar</span> un Centro</p>
                </Link>
                <Link to='new' className='py-2 px-3 rounded-md bg-yellow-100 w-1/5 hover:bg-orange-300'>
                    <p className='font-semibold'>Carga de Centrales</p>
                    <span className="material-symbols-outlined text-6xl py-3 text-lime-500" >domain_add</span>
                    <p className='text-sm'><span className='uppercase text-green-600 font-bold'>Crear</span> una Nueva Central</p>
                </Link>
                <Link to='deleted' className='py-2 px-3 rounded-md bg-red-400 w-1/5 hover:bg-red-800 hover:text-white group'>
                    <p className='font-semibold'>Centrales Eliminadas</p>
                    <span className="material-symbols-outlined text-6xl py-3 text-lime-800 group-hover:text-white">scan_delete</span>
                    <p className='text-sm'><span className='uppercase font-bold'>Restaure o ELimine</span> DEFINITIVAMENTE una Central</p>
                </Link>
            </div>
        </main>
    )
}