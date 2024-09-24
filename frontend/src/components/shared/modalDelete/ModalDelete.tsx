import { Dispatch } from "react"

interface Props {
    handleDelete: () => Promise<void>
    setModalView: Dispatch<React.SetStateAction<boolean>>
}

export const ModalDelete = ({ handleDelete, setModalView }: Props) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black'>
            <div className='bg-white p-5 rounded-lg flex flex-col justify-center items-center gap-5'>
                <h3 className='text-lg border-b-4 border-gray-500 pb-2 uppercase w-full text-center'>Confirmar Eliminar</h3>
                <div className='flex gap-4'>
                    <button
                        className='text-white bg-red-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-red-800 hover:ring-red-800 hover:ring-2'
                        onClick={ handleDelete }
                    >ELIMINAR <span className="material-symbols-outlined">delete</span></button>
                    <button
                        className='text-white bg-green-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-green-800 hover:ring-green-800 hover:ring-2'
                        onClick={() => setModalView(false)}
                    >CANCELAR <span className="material-symbols-outlined">close</span></button>
                </div>
            </div>
        </div>
    )
}
