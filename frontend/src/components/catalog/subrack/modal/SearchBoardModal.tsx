import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormSearchBoards } from './FormSearchBoards';
import { VendorType } from '../../../../types';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { SubrackFormData } from '../../../../types/catalog/subrackTypes';

interface Props {
    control: Control<SubrackFormData>;
    vendors: VendorType[];
    close: Dispatch<SetStateAction<boolean>>;
    index: number;
    setValue: UseFormSetValue<SubrackFormData>
}

export const SearchBoardModal = ({ close, vendors, setValue, index, control }: Props) => {

    // const [boardsSelected, setBoardsSelected] = useState<BoardType[]>([]);
    const [boardsIdsSelected, setBoardsIdsSelected] = useState<string[]>([]);

    const { boards } = useWatch({
        control,
        name: `slots.${index}`
    })

    const handleAddBoards = () => {
        setValue(`slots.${index}.boards`, boardsIdsSelected);
        close(false);
    }
    useEffect(() => {
        setBoardsIdsSelected(boards)
    }, [ boards ])
   
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black z-50 font-oswald">
            <div className='flex flex-col justify-center gap-3 items-center mx-5 my-2'>

                <FormSearchBoards
                    vendors={vendors}
                    // boardsSelected={boardsSelected}
                    // setBoardsSelected={setBoardsSelected}
                    // probando la nueva tabla
                    boardsIdsSelected={boardsIdsSelected}
                    setBoardsIdsSelected={setBoardsIdsSelected}
                />

                <div className='flex gap-3'>
                    <button
                        className="text-white bg-green-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-green-800 hover:ring-green-800 hover:ring-2"
                        type="button"
                        onClick={handleAddBoards}
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
        </div>
    )
}
