import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { BoardFormData, LogicalSignal } from '../../../types';

interface Props {
    control: Control<BoardFormData>;
    close: Dispatch<SetStateAction<boolean>>;
    field: FieldArrayWithId<BoardFormData, "ports", "id">;
}

interface ComponentData {
    id: number;
    selectedSignal: LogicalSignal | "";
    inputValue: string;
    from: number;
    to: number;
}

export const AddPortFacilitiesModal = ({ close, field }: Props) => {

    const [components, setComponents] = useState<ComponentData[]>([]);
    const [nextId, setNextId] = useState(1);
    const [logicalFacilities, setLogicalFacilities] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        if (field.fullName) {
            setComponents([{ id: 0, selectedSignal: "", inputValue: field.fullName + '-', from: 1, to: 1 }]);
        }
    }, [field]);

    const addComponent = () => {
        setComponents(prev => [...prev, { id: nextId, selectedSignal: "", inputValue: field.fullName + '-', from: 1, to: 1 }]);
        setNextId(prev => prev + 1);
    };

    const handleInputChange = (id: number, key: keyof ComponentData, value: any) => {
        setComponents(prev =>
            prev.map(component =>
                component.id === id ? { ...component, [key]: value } : component
            )
        );
    };

    const handleInputNumber = (data: string): number => {
        const isNumber = !isNaN(parseInt(data)) && parseInt(data) > 0;
        return isNumber ? Number(data) : 1;
    };

    const handleAddFacility = () => {
        const newFacilities = { ...logicalFacilities };
        components.forEach(component => {
            const { selectedSignal, inputValue, from, to } = component;
            if (selectedSignal && from > 0 && to >= from) {
                const values = [];
                for (let i = from; i <= to; i++) {
                    values.push(`${inputValue}:${i}`);
                }
                if (!newFacilities[selectedSignal]) {
                    newFacilities[selectedSignal] = [];
                }
                newFacilities[selectedSignal] = [...newFacilities[selectedSignal], ...values];
            }
        });
        setLogicalFacilities(newFacilities);
    };

    console.log(logicalFacilities);

    if (!field) return <p>Sin Datos</p>;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black z-50 font-roboto_condensed'>
            <div className='bg-white p-5 rounded-lg flex flex-col justify-center items-center gap-5'>
                <p className='text-lg border-b-4 border-gray-500 pb-2 uppercase w-full text-center'>
                    <strong>Port:</strong> {field.port} / <strong>NMS:</strong> {field.NMS} / <strong>Name:</strong> {field.fullName}
                </p>
                {components.map(component => (
                    <div key={component.id} className='flex gap-2'>
                        <select
                            className='border border-gray-500 outline-none px-2 py-1'
                            value={component.selectedSignal}
                            onChange={(e) => handleInputChange(component.id, 'selectedSignal', e.target.value as LogicalSignal)}
                        >
                            <option value="" disabled>Señal</option>
                            {Object.values(LogicalSignal).map(signal => (
                                <option key={signal} value={signal}>{signal}</option>
                            ))}
                        </select>
                        <input
                            className='border border-gray-500 outline-none px-2 py-1'
                            type="text"
                            value={component.inputValue}
                            onChange={(e) => handleInputChange(component.id, 'inputValue', e.target.value)}
                        />
                        <input
                            className='border border-gray-500 outline-none px-2 py-1 w-16'
                            type="number"
                            value={component.from}
                            onChange={(e) => handleInputChange(component.id, 'from', handleInputNumber(e.target.value))}
                        />
                        <input
                            className='border border-gray-500 outline-none px-2 py-1 w-16'
                            type="number"
                            value={component.to}
                            onChange={(e) => handleInputChange(component.id, 'to', handleInputNumber(e.target.value))}
                        />
                    </div>
                ))}
                <button
                    className='text-white bg-blue-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-blue-800 hover:ring-blue-800 hover:ring-2'
                    type="button"
                    onClick={addComponent}
                >
                    Agregar Componente <span className="material-symbols-outlined">add</span>
                </button>
                <div className='flex gap-4'>
                    <button
                        className='text-white bg-green-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-green-800 hover:ring-green-800 hover:ring-2'
                        type="button"
                        onClick={handleAddFacility}
                    >
                        ACEPTAR <span className="material-symbols-outlined">check_circle</span>
                    </button>
                    <button
                        className='text-white bg-red-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-red-800 hover:ring-red-800 hover:ring-2'
                        type="button"
                        onClick={() => close(false)}
                    >
                        CANCELAR <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


// import { Dispatch, SetStateAction, useEffect, useState } from 'react'
// import { FieldArrayWithId } from 'react-hook-form';
// import { BoardFormData, LogicalSignal } from '../../../types';

// interface Props {
//     close: Dispatch<SetStateAction<boolean>>;
//     field: FieldArrayWithId<BoardFormData, "ports", "id">;
// }

// export const AddPortFacilitiesModal = ({ close, field }: Props) => {

//     const [selectedSignal, setSelectedSignal] = useState<LogicalSignal | "">("");
//     const [inputValue, setInputValue] = useState<string>('');
//     const [from, setFrom] = useState<number>(1)
//     const [to, setTto] = useState( 1 )
//     const [facilities, setFacilities] = useState<{ [key in LogicalSignal]?: string[] }>({});

//     useEffect(() => {
//         if (field.fullName) {
//             setInputValue(field.fullName + '-');
//         }
//     }, [ field ])

//     const handleInputNumber = ( data: string ): number => {
//         const isNumber = !isNaN( parseInt(data) ) && parseInt(data) > 0;
//         return isNumber ? Number(data) : 1
//     }

//     if (!field) return <p>Sin Datos</p>

//     return (
//         <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black z-50 font-roboto_condensed'>
//             <div className='bg-white p-5 rounded-lg flex flex-col justify-center items-center gap-5'>
//                 <p className='text-lg border-b-4 border-gray-500 pb-2 uppercase w-full text-center'><strong>Port:</strong> {field.port} / <strong>NMS:</strong> {field.NMS} / <strong>Name:</strong> {field.fullName}   </p>
//                 <div className='flex gap-2'>
//                     <select
//                         className='border border-gray-500 outline-none px-2 py-1'
//                         name="key"
//                         id="key"
//                         value={selectedSignal}
//                         onChange={(e) => setSelectedSignal(e.target.value as LogicalSignal)}
//                     >
//                         <option value="" disabled>Señal</option>
//                         {
//                             Object.values(LogicalSignal).map(signal => (
//                                 <option
//                                     key={signal}
//                                     value={signal}
//                                 >{signal}</option>
//                             ))
//                         }
//                     </select>
//                     <input
//                         className='border border-gray-500 outline-none px-2 py-1'
//                         type="text"
//                         value={ inputValue }
//                         onChange={(e) => setInputValue( e.target.value )}
//                     />
//                     <input
//                         className='border border-gray-500 outline-none px-2 py-1 w-16'
//                         type="number"
//                         value={ from }
//                         onChange={(e) => setFrom( handleInputNumber( e.target.value ))}
//                     />
//                     <input
//                         className='border border-gray-500 outline-none px-2 py-1 w-16'
//                         type="number"
//                         value={ to }
//                         onChange={(e) => setTto( handleInputNumber( e.target.value ))}
//                     />
//                 </div>

//                 <div className='flex gap-4'>
//                     <button
//                         className='text-white bg-green-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-green-800 hover:ring-green-800 hover:ring-2'
//                         type="button"
//                     >CANCELAR <span className="material-symbols-outlined">check_circle</span></button>
//                     <button
//                         className='text-white bg-red-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-red-800 hover:ring-red-800 hover:ring-2'
//                         type="button"
//                         onClick={() => close(false)}
//                     >ACEPTAR <span className="material-symbols-outlined">close</span></button>
//                 </div>
//             </div>
//         </div>
//     )
// }
