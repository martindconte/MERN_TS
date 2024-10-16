import { Link } from 'react-router-dom'
import transceiverLogo from '../../../assets/img/catalog/transceiver/transceiverLogo.svg'
import newTransceiverLogo from '../../../assets/img/catalog/transceiver/newTransceiverLogo.svg'

export const TransceiverIndexView = () => {
    return (
        <main className='flex-1 px-2 py-4 bg-blue-50'>
            <h2 className='text-4xl uppercase font-extrabold text-center my-4'>DWDM <span className='text-red-700'>Planner</span></h2>
            <h3 className='text-2xl uppercase font-extrabold text-center my-4'>Administracion de Transceivers/Modulos</h3>
            <div className='flex flex-wrap text-center gap-5 justify-center text-black font-roboto'>
                <Link to='search' className='flex flex-col justify-center py-2 px-3 rounded-md bg-sky-300 w-1/5 h-44 hover:bg-sky-500'>
                    <p className='font-semibold'>Buscar Transceiver</p>
                    <img src={transceiverLogo} alt="transceiverLogo" className='my-4 mx-auto' />
                    <p className='text-sm'><span className='uppercase text-blue-800 font-bold'>Modificar</span> o <span className='uppercase text-red-800 font-bold'>Eliminar</span> un Transceiver</p>
                </Link>
                <Link to='new' className='flex flex-col justify-center py-2 px-3 rounded-md bg-violet-300 w-1/5 hover:bg-violet-500'>
                    <p className='font-semibold'>Carga de Transceiver</p>
                    <img src={newTransceiverLogo} alt="newTransceiverLogo" className='my-4 mx-auto' />
                    <p className='text-sm'><span className='uppercase text-indigo-800 font-bold'>Crear</span> un Nuevo Transceiver</p>
                </Link>
            </div>
        </main>
    )
}
