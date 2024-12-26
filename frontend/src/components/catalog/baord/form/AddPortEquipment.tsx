import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SearchPortEquipment } from '../portEquipment/SearchPortEquipment'
import { BoardFormData, BoardPortsType, TransceiverType } from '../../../../types'
import { useFormContext, useWatch } from 'react-hook-form'

interface Props {
    close: Dispatch<SetStateAction<boolean>>
    index: number;
}

export const AddPortEquipment = ( { close, index }: Props ) => {

    // const [selectedData, setSelectedData] = useState<TransceiverType[]>( [] )
    const [selectedData, setSelectedData] = useState<BoardFormData['ports'][number]['equipments']>([]);

    const { control, setValue } = useFormContext<BoardFormData>()

    const { equipments } = useWatch( {
        control,
        name: `ports.${index}`,
    } );
    // const { equipments }: Partial<BoardPortsType> = useWatch( {
    //     control,
    //     name: `ports.${index}`,
    // } );
    
    const handleAddEquipment = () => {
        setValue( `ports.${index}.equipments`, selectedData )
        close( false )
    }

    useEffect( () => {
        setSelectedData( equipments)
    }, [ equipments ] )

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black z-50 font-roboto_condensed">

            <div className='flex flex-col justify-center gap-3 items-center mx-5 my-2'>
                <SearchPortEquipment
                    selectedData={ selectedData }
                    setSelectedData={ setSelectedData }
                />
                <div className='flex gap-3'>
                    <button
                        className="text-white bg-green-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-green-800 hover:ring-green-800 hover:ring-2"
                        type="button"
                        onClick={ handleAddEquipment }
                    >GUARDAR<span className="material-symbols-outlined">save</span></button>
                    <button
                        className="text-white bg-red-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-red-800 hover:ring-red-800 hover:ring-2"
                        type="button"
                        onClick={() => close( false )}
                    >
                        CANCELAR <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
