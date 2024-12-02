import { useState } from 'react';
import { FieldArrayWithId, useFormContext, useWatch } from 'react-hook-form'
import { BoardFormData, BoardPortType } from '../../../../types'
import { ErrorMsgForm } from '../../../shared/errors/ErrorMsgForm';
import { AddPortFacilitiesModal } from './AddPortFacilitiesModal';
import { AddPortEquipment } from './AddPortEquipment';

interface Props {
    field: FieldArrayWithId<BoardFormData, "ports", "id">;
    index: number;
    requiredFields?: boolean;
};

export const AddPort = ( { field, index, requiredFields }: Props ) => {

    const [modalLogicalFacilities, setModalLogicalFacilities] = useState<boolean>( false );
    const [modalEquipmentPort, setModalEquipmentPort] = useState<boolean>( false );
    const { control, formState: { errors }, register } = useFormContext<BoardFormData>();

    const ports = useWatch( {
        control,
        name: "ports",
    } );

    return (
        <div
            key={field.id}
            className='flex flex-col items-center gap-1 px-1 py-1 w-fit'
        >
            {
                errors && errors.ports && errors.ports[index] && (
                    <div className='w-full text-center'>
                        <ErrorMsgForm>
                            {errors.ports[index]?.port?.message ||
                                errors.ports[index]?.physical?.message ||
                                errors.ports[index]?.NMS?.message ||
                                errors.ports[index]?.fullName?.message}
                        </ErrorMsgForm>
                    </div>
                )
            }

            {
                modalEquipmentPort && <AddPortEquipment
                    close={setModalEquipmentPort}
                    index={index}
                />
            }
                 
            {
                modalLogicalFacilities && <AddPortFacilitiesModal
                    close={setModalLogicalFacilities}
                    index={index}
                />
            }

            <div className='flex flex-wrap px-2 py-1 rounded-md bg-stone-200'>
                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}-${field.port}`}>Port</label>
                    <input
                        id={`${field.id}-${index}-${field.port}`}
                        className='px-1 py-1 w-12 outline-none'
                        type="number"
                        min={1}
                        {...register( `ports.${index}.port` as const, {
                            required: requiredFields && 'Port Invalido - Debe ser un Numero',
                            setValueAs: value => parseInt( value ),
                            valueAsNumber: true,
                            validate: value => {
                                const isUnique = ports.every( ( port, i ) => i === index || port.port !== value );
                                return isUnique || 'El puerto debe ser único';
                            },
                            // validate: value => !isNaN(value) || 'Debe ser un número válido',
                            min: 1
                        } )}
                    />
                </div>
                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}-${field.type}`}>Tipo</label>
                    <select
                        id={`${field.id}-${index}-${field.type}`}
                        className='px-1 py-1 outline-none'
                        {...register( `ports.${index}.type` )}
                    >
                        <option value=''></option>
                        {
                            Object.values( BoardPortType ).map( type => (
                                <option
                                    key={type}
                                    value={type}
                                >{type}</option>
                            ) )
                        }
                    </select>
                </div>

                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}-${field.physical}+1`}>Fisico</label>
                    <input
                        id={`${field.id}-${index}-${field.physical}+1`}
                        className='px-1 py-1 w-20 outline-none'
                        type="text"
                        {...register( `ports.${index}.physical` as const, {
                            required: requiredFields && 'Nombre Invalido',
                            setValueAs: value => value.toUpperCase(),
                            onChange: ( event ) => event.target.value = event.target.value.toUpperCase()
                        } )}
                    />
                </div>


                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}-${field.NMS}+2`}>NMS</label>
                    <input
                        id={`${field.id}-${index}-${field.NMS}+2`}
                        className='px-1 py-1 w-20 outline-none'
                        type="text"
                        {...register( `ports.${index}.NMS` as const, {
                            required: requiredFields && 'Nombre Invalido',
                            setValueAs: value => value.toUpperCase(),
                        } )}
                    />
                </div>
                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}-${field.fullName}`}>Full Name</label>
                    <input
                        id={`${field.id}-${index}-${field.fullName}`}
                        className='px-1 py-1 w-28'
                        type="text"
                        {...register( `ports.${index}.fullName` as const, {
                            required: requiredFields && 'Nombre Invalido',
                            setValueAs: value => value.toUpperCase(),
                        } )}
                    />
                </div>
                <div className='flex flex-wrap gap-1'>
                    <button
                        type='button'
                        className='bg-yellow-300 text-xs w-16 uppercase font-oswald px-2 py-1 rounded-lg hover:bg-yellow-900 hover:text-white'
                        onClick={() => setModalLogicalFacilities( true )}
                    >
                        Puertos Logicos
                    </button>
                    <button
                        type='button'
                        className='bg-fuchsia-300 text-xs w-16 break-words uppercase font-oswald px-2 py-1 rounded-lg hover:bg-fuchsia-900 hover:text-white'
                        onClick={() => setModalEquipmentPort( true )}
                    >
                        Modulos
                    </button>
                </div>
            </div>
        </div>
    )
}
// import { useState } from 'react';
// import { FieldArrayWithId, useFormContext } from 'react-hook-form'
// // import { Control, FieldArrayWithId, FieldErrors, useFormContext, UseFormRegister } from 'react-hook-form'
// import { BoardFormData, BoardPortType } from '../../../types'
// import { ErrorMsgForm } from '../../shared/errors/ErrorMsgForm';
// import { AddPortFacilitiesModal } from './AddPortFacilitiesModal';

// interface Props {
//     // control: Control<BoardFormData>;
//     // register: UseFormRegister<BoardFormData>;
//     field: FieldArrayWithId<BoardFormData, "ports", "id">;
//     index: number;
//     // errors?: FieldErrors<BoardFormData>;
// }

// export const AddPort = ({ field, index  }: Props) => {
// // export const AddPort = ({ control, field, index, errors, register }: Props) => {

//     const [modalLogicalFacilities, setModalLogicalFacilities] = useState<boolean>(false)

//     const { control, formState: { errors }, register } = useFormContext<BoardFormData>()

//     return (
//         <div
//             key={field.id}
//             className='flex flex-col items-center gap-1 px-1 py-1 w-fit'
//         >
//             {
//                 errors && errors.ports && errors.ports[index] && (
//                     <div className='w-full text-center'>
//                         <ErrorMsgForm>
//                             {errors.ports[index]?.port?.message ||
//                                 errors.ports[index]?.physical?.message ||
//                                 errors.ports[index]?.NMS?.message ||
//                                 errors.ports[index]?.fullName?.message}
//                         </ErrorMsgForm>
//                     </div>
//                 )
//             }

//             { modalLogicalFacilities && <AddPortFacilitiesModal
//                                             close={setModalLogicalFacilities}
//                                             field={field}
//                                             control={control}
//                                         /> }

//             <div className='flex px-2 py-1 rounded-md bg-stone-200'>
//                 <div className="flex gap-2 items-center px-2 py-1 rounded-md">
//                     <label htmlFor={`${field.id}-${index}`}>Port</label>
//                     <input
//                         id={`${field.id}-${index}`}
//                         className='px-1 py-1 w-12 outline-none'
//                         type="number"
//                         min={1}
//                         {...register(`ports.${index}.port` as const, {
//                             required: 'Invalido',
//                             setValueAs: value => parseInt(value),
//                             valueAsNumber: true,
//                             validate: value => !isNaN(value) || 'Debe ser un número válido',
//                             min: 1
//                         })}
//                     />
//                 </div>
//                 <div className="flex gap-2 items-center px-2 py-1 rounded-md">
//                     <label htmlFor={`${field.id}-${index}`}>Tipo</label>
//                     <select
//                         id={`${field.id}-${index}`}
//                         className='px-1 py-1 outline-none'
//                         {...register(`ports.${index}.type`)}
//                     >
//                         {
//                             Object.values(BoardPortType).map(type => (
//                                 <option
//                                     key={type}
//                                     value={type}
//                                 >{type}</option>
//                             ))
//                         }
//                     </select>
//                 </div>

//                 <div className="flex gap-2 items-center px-2 py-1 rounded-md">
//                     <label htmlFor={`${field.id}-${index}`}>Fisico</label>
//                     <input
//                         id={`${field.id}-${index}`}
//                         className='px-1 py-1 w-20 outline-none'
//                         type="text"
//                         {...register(`ports.${index}.physical` as const, {
//                             required: 'Nombre Invalido',
//                             setValueAs: value => value.toUpperCase(),
//                         })}
//                     />
//                 </div>


//                 <div className="flex gap-2 items-center px-2 py-1 rounded-md">
//                     <label htmlFor={`${field.id}-${index}`}>NMS</label>
//                     <input
//                         id={`${field.id}-${index}`}
//                         className='px-1 py-1 w-20 outline-none'
//                         type="text"
//                         {...register(`ports.${index}.NMS` as const, {
//                             required: 'Nombre Invalido',
//                             setValueAs: value => value.toUpperCase(),
//                         })}
//                     />
//                 </div>
//                 <div className="flex gap-2 items-center px-2 py-1 rounded-md">
//                     <label htmlFor={`${field.id}-${index}`}>Full Name</label>
//                     <input
//                         id={`${field.id}-${index}`}
//                         className='px-1 py-1 w-28'
//                         type="text"
//                         {...register(`ports.${index}.fullName` as const, {
//                             required: 'Nombre Invalido',
//                             setValueAs: value => value.toUpperCase(),
//                         })}
//                     />
//                 </div>
//                 <div className='flex gap-1'>
//                     <button
//                         type='button'
//                         className='bg-yellow-300 text-xs w-16 uppercase font-oswald px-2 py-1 rounded-lg hover:bg-yellow-900 hover:text-white'
//                         onClick={() => setModalLogicalFacilities( true )}
//                     >
//                         Puertos Logicos
//                     </button>
//                     <button
//                         type='button'
//                         className='bg-fuchsia-300 text-xs w-16 break-words uppercase font-oswald px-2 py-1 rounded-lg hover:bg-fuchsia-900 hover:text-white'
//                     >
//                         Modulos
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }
