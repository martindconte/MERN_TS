import { ReactElement, useState } from 'react'

export const HiddenComponent = ({ children }: { children: ReactElement }) => {

    const [hidden, setHidden] = useState(true)

    const handleHidden = () => setHidden(!hidden)

    return (
        <>
            <div className="text-sm cursor-pointer text-center" onClick={handleHidden} >
                {hidden ? (
                    <p className="flex gap-3 items-center bg-orange-400 px-3 py-2 rounded-md shadow-lg shadow-red-500/100 w-fit">Ocultar Filtros<span className="material-symbols-outlined">filter_alt_off</span></p>
                ) : (
                    <p className="flex gap-3 items-center bg-emerald-400 px-3 py-2 rounded-md shadow-lg shadow-green-500/100 w-fit">Mostrar Filtros<span className="material-symbols-outlined">filter_alt</span></p>
                )}
            </div>
            <div className={`w-full ${hidden ? '' : 'hidden'}`}>
                { children }
            </div>
        </>
    )
}
