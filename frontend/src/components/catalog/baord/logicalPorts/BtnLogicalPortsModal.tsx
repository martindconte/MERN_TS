import { SetStateAction } from 'react';

interface Props {
    addLogicalPort: () => void;
    handleAddFacility: () => void;
    close: (value: SetStateAction<boolean>) => void;
}

export const BtnLogicalPortsModal = ({ addLogicalPort, close, handleAddFacility }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <button
                className="text-white uppercase bg-blue-500 font-semibold px-3 py-2 rounded-md ring-offset-1 flex items-center justify-center gap-2 hover:bg-blue-800 hover:ring-blue-800 hover:ring-2"
                type="button"
                onClick={addLogicalPort}
            >Agregar Componente <span className="material-symbols-outlined">add</span></button>
            <div className="flex gap-2">
                <button
                    className="text-white bg-green-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-green-800 hover:ring-green-800 hover:ring-2"
                    type="button"
                    onClick={handleAddFacility}
                >GUARDAR<span className="material-symbols-outlined">save</span></button>
                <button
                    className="text-white bg-red-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-red-800 hover:ring-red-800 hover:ring-2"
                    type="button"
                    onClick={() => close(false)}
                >
                    CANCELAR <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
    )
}
