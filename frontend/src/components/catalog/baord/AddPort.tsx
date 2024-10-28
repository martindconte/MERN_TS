import { useState } from 'react';
import { Control, FieldArrayWithId, FieldErrors, UseFormRegister } from 'react-hook-form'
import { BoardFormData, BoardPortType } from '../../../types'
import { ErrorMsgForm } from '../../shared/errors/ErrorMsgForm';
import { AddPortFacilitiesModal } from './AddPortFacilitiesModal';

interface Props {
    control: Control<BoardFormData>;
    register: UseFormRegister<BoardFormData>;
    field: FieldArrayWithId<BoardFormData, "ports", "id">;
    index: number;
    errors?: FieldErrors<BoardFormData>;
}

export const AddPort = ({ control, field, index, errors, register }: Props) => {

    const [modalLogicalFacilities, setModalLogicalFacilities] = useState<boolean>(false)

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

            { modalLogicalFacilities && <AddPortFacilitiesModal
                                            close={setModalLogicalFacilities}
                                            field={field}
                                            control={control}
                                        /> }

            <div className='flex px-2 py-1 rounded-md bg-stone-200'>
                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}`}>Port</label>
                    <input
                        id={`${field.id}-${index}`}
                        className='px-1 py-1 w-12 outline-none'
                        type="number"
                        min={1}
                        {...register(`ports.${index}.port` as const, {
                            required: 'Invalido',
                            setValueAs: value => parseInt(value),
                            valueAsNumber: true,
                            validate: value => !isNaN(value) || 'Debe ser un número válido',
                            min: 1
                        })}
                    />
                </div>
                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}`}>Tipo</label>
                    <select
                        id={`${field.id}-${index}`}
                        className='px-1 py-1 outline-none'
                        {...register(`ports.${index}.type`)}
                    >
                        {
                            Object.values(BoardPortType).map(type => (
                                <option
                                    key={type}
                                    value={type}
                                >{type}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}`}>Fisico</label>
                    <input
                        id={`${field.id}-${index}`}
                        className='px-1 py-1 w-20 outline-none'
                        type="text"
                        {...register(`ports.${index}.physical` as const, {
                            required: 'Nombre Invalido',
                            setValueAs: value => value.toUpperCase(),
                        })}
                    />
                </div>


                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}`}>NMS</label>
                    <input
                        id={`${field.id}-${index}`}
                        className='px-1 py-1 w-20 outline-none'
                        type="text"
                        {...register(`ports.${index}.NMS` as const, {
                            required: 'Nombre Invalido',
                            setValueAs: value => value.toUpperCase(),
                        })}
                    />
                </div>
                <div className="flex gap-2 items-center px-2 py-1 rounded-md">
                    <label htmlFor={`${field.id}-${index}`}>Full Name</label>
                    <input
                        id={`${field.id}-${index}`}
                        className='px-1 py-1 w-28'
                        type="text"
                        {...register(`ports.${index}.fullName` as const, {
                            required: 'Nombre Invalido',
                            setValueAs: value => value.toUpperCase(),
                        })}
                    />
                </div>
                <div className='flex gap-1'>
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
                    >
                        Modulos
                    </button>
                </div>
            </div>
        </div>
    )
}
