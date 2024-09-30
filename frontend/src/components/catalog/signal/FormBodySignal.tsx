import { Control, FieldErrors, useFieldArray, UseFormClearErrors, UseFormRegister, UseFormSetError, useWatch } from "react-hook-form"
import { SignalFormData } from "../../../types"
import { ErrorMsgForm } from "../../shared/errors/ErrorMsgForm";

interface Props {
    register: UseFormRegister<SignalFormData>;
    errors: FieldErrors<SignalFormData>;
    requiredFields?: boolean;
    control: Control<SignalFormData>
    setError: UseFormSetError<SignalFormData>
    clearErrors: UseFormClearErrors<SignalFormData>
}

export const FormBodySignal = ({ register, errors, requiredFields = true, control, setError, clearErrors }: Props) => {

    const { fields, append, remove, move } = useFieldArray({
        name: 'bandwidth',
        control
    })

    const bandwidthValues = useWatch({
        name: 'bandwidth',
        control
    });

    const validateDuplicates = (value: any, index: number) => {
        const seen = new Set<string>();
        let hasDuplicates = false;

        bandwidthValues.forEach((field: any, idx: number) => {
            if (idx !== index) {
                const identifier = `${field.amount}-${field.unit}`;
                seen.add(identifier);
            }
        });

        const currentIdentifier = `${value.amount}-${value.unit}`;
        if (seen.has(currentIdentifier)) {
            setError(`bandwidth.${index}.amount`, {
                type: 'manual',
                message: 'Duplicate bandwidth entry'
            });
            setError(`bandwidth.${index}.unit`, {
                type: 'manual',
                message: 'Duplicate bandwidth entry'
            });
            hasDuplicates = true;
        } else {
            clearErrors(`bandwidth.${index}.amount`);
            clearErrors(`bandwidth.${index}.unit`);
        }

        return !hasDuplicates;
    };

    return (
        <div className='flex flex-col text-black text-sm'>
            <div className='flex flex-col-reverse'>
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3" htmlFor="type">Tipo</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="type"
                        placeholder="ETH / DWDM"
                        {...register('type', {
                            required: requiredFields && 'El Tipo de la Señal es Obligatorio',
                            setValueAs: value => value.trim(),
                        })}
                    />
                </div>
                {errors.type && <ErrorMsgForm>{errors.type.message}</ErrorMsgForm>}
            </div>
            <div className='flex flex-col-reverse'>
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3" htmlFor="subType">Sub-Tipo</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="subType"
                        placeholder="Transparente / OCH"
                        {...register('subType', {
                            required: requiredFields && 'El Sub-Tipo de la Señal es Obligatorio',
                            setValueAs: value => value.trim(),
                        })}
                    />
                </div>
                {errors.subType && <ErrorMsgForm>{errors.subType.message}</ErrorMsgForm>}
            </div>
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3" htmlFor="observation">Observaciones</label>
                <input
                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                    type="text"
                    id="observation"
                    placeholder="ETH Transparente / DWDM OCH"
                    {...register('observation')}
                />
            </div>
            {
                fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex items-center justify-between gap-3 bg-yellow-100 px-3 py-2 my-1 rounded-md"
                    >
                        <div className='w-2/5 flex flex-col-reverse'>
                            <div className="flex justify-between my-2 items-center space-x-3">
                                <label htmlFor={`amount-${field.id}`}>Valor</label>
                                <input
                                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                                    type="number"
                                    step={0.05}
                                    min={1}
                                    id={`amount-${field.id}`}
                                    placeholder="1 / 2.5 / 10 / 100"
                                    {...register(`bandwidth.${index}.amount` as const, {
                                        required: requiredFields && 'El Valor es Requerido',
                                        min: 1,
                                        valueAsNumber: true,
                                        // validate: () => validateDuplicates()
                                        validate: value => validateDuplicates({ amount: value, unit: field.unit }, index)
                                    })}
                                />
                            </div>
                            {errors.bandwidth && errors.bandwidth[index]?.amount && <ErrorMsgForm>{errors.bandwidth[index].amount.message}</ErrorMsgForm>}
                        </div>
                        <div className='w-2/5 flex flex-col-reverse'>
                            <div className="flex justify-between my-2 items-center space-x-3">
                                <label htmlFor={`unit-${field.id}`}>Unidad</label>
                                <select
                                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                                    id={`unit-${field.id}`}
                                    {...register(`bandwidth.${index}.unit` as const, {
                                        required: requiredFields && 'La Unidad es Obligatorio',
                                        validate: value => validateDuplicates({ amount: field.amount, unit: value }, index)
                                        
                                    })}
                                >
                                    <option value="" disabled>Seleccionar</option>
                                    <option value="MB">MB</option>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </div>
                            {errors.bandwidth && errors.bandwidth[index]?.unit && <ErrorMsgForm>{errors.bandwidth[index].unit.message}</ErrorMsgForm>}
                        </div>

                        <div className="flex flex-col items-center gap-1 ml-2">
                            <div className="flex gap-1">
                                <button
                                    className={`${index === 0 ? 'opacity-50' : ''} material-symbols-outlined text-xs w-fit p-1 bg-blue-400 h-fit flex items-center justify-center rounded-full`}
                                    type="button"
                                    onClick={() => index > 0 && move(index, index - 1)}
                                    disabled={index === 0}
                                >
                                    arrow_upward
                                </button>
                                <button
                                    className={`${index === fields.length - 1 ? 'opacity-50' : ''} material-symbols-outlined text-xs w-fit p-1 bg-blue-400 h-fit flex items-center justify-center rounded-full`}
                                    type="button"
                                    onClick={() => index < fields.length - 1 && move(index, index + 1)}
                                    disabled={index === fields.length - 1}
                                >
                                    arrow_downward
                                </button>
                            </div>
                            <button
                                className="material-symbols-outlined text-xs w-fit p-1 bg-red-400 h-fit flex items-center justify-center  rounded-full"
                                type="button"
                                onClick={() => remove(index)}
                            // onClick={() => fields.length > 1 && remove(index)}
                            // disabled={fields.length <= 1}
                            >delete</button>
                        </div>
                    </div>
                ))
            }
            <button
                className="flex gap-1 items-center bg-emerald-300 px-3 py-1 w-fit mx-auto my-2 rounded-lg uppercase hover:bg-emerald-800 hover:text-white"
                type="button"
                onClick={() => append({ amount: 0, unit: 'MB' })}
            >Agregar Velocidad <span className="material-symbols-outlined">add_circle</span></button>
        </div>
    );
};
// import { Control, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form"
// import { SignalFormData } from "../../../types"
// import { ErrorMsgForm } from "../../shared/errors/ErrorMsgForm";

// interface Props {
//     register: UseFormRegister<SignalFormData>;
//     errors: FieldErrors<SignalFormData>;
//     requiredFields?: boolean;
//     control: Control<SignalFormData>
// }

// export const FormBodySignal = ({ register, errors, requiredFields = true, control }: Props) => {

//     const { fields, append, remove, move } = useFieldArray({
//         name: 'bandwidth',
//         control
//     })

//     return (
//         <div className='flex flex-col text-black text-sm'>
//             <div className='flex flex-col-reverse'>
//                 <div className="flex justify-between my-2 items-center space-x-3">
//                     <label className="w-1/3 text-right" htmlFor="type">Tipo</label>
//                     <input
//                         className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
//                         type="text"
//                         id="type"
//                         placeholder="ETH / DWDM"
//                         {...register('type', {
//                             required: requiredFields && 'El Tipo de la Señal es Obligatorio',
//                             setValueAs: value => value.trim(),
//                         })}
//                     />
//                 </div>
//                 {errors.type && <ErrorMsgForm>{errors.type.message}</ErrorMsgForm>}
//             </div>
//             <div className='flex flex-col-reverse'>
//                 <div className="flex justify-between my-2 items-center space-x-3">
//                     <label className="w-1/3 text-right" htmlFor="subType">Sub-Tipo</label>
//                     <input
//                         className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
//                         type="text"
//                         id="subType"
//                         placeholder="Transparente / OCH"
//                         {...register('subType', {
//                             required: requiredFields && 'El Sub-Tipo de la Señal es Obligatorio',
//                             setValueAs: value => value.trim(),
//                         })}
//                     />
//                 </div>
//                 {errors.subType && <ErrorMsgForm>{errors.subType.message}</ErrorMsgForm>}
//             </div>
//             <div className="flex justify-between my-2 items-center space-x-3">
//                 <label className="w-1/3 text-right" htmlFor="observation">Observaciones</label>
//                 <input
//                     className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
//                     type="text"
//                     id="observation"
//                     placeholder="ETH Transparente / DWDM OCH"
//                     {...register('observation')}
//                 />
//             </div>
//             {
//                 fields.map((field, index) => (
//                     <div
//                         key={field.id}
//                         className="flex items-center justify-between"
//                     >
//                         <div className="grow">
//                             <div className='flex flex-col-reverse'>
//                                 <div className="flex justify-between my-2 items-center space-x-3">
//                                     <label className="w-1/3 text-right" htmlFor={`amount-${field.id}`}>Valor</label>
//                                     <input
//                                         className="grow border border-gray-300 p-1 outline-none rounded shadow-md"
//                                         type="number"
//                                         step={0.05}
//                                         min={1}
//                                         id={`amount-${field.id}`}
//                                         placeholder="1 / 2.5 / 10 / 100"
//                                         {...register(`bandwidth.${index}.amount` as const, {
//                                             required: requiredFields && 'El Valor es Requerido',
//                                             min: 1,
//                                             valueAsNumber: true,
//                                         })}
//                                     />
//                                 </div>
//                                 {errors.bandwidth && errors.bandwidth[index]?.amount && <ErrorMsgForm>{errors.bandwidth[index].amount.message}</ErrorMsgForm>}
//                             </div>
//                             <div className='flex flex-col-reverse'>
//                                 <div className="flex justify-between my-2 items-center space-x-3">
//                                     <label className="w-1/3 text-right" htmlFor={`unit-${field.id}`}>Unidad</label>
//                                     <select
//                                         className="grow border border-gray-300 p-1 outline-none rounded shadow-md"
//                                         id={`unit-${field.id}`}
//                                         {...register(`bandwidth.${index}.unit` as const, {
//                                             required: requiredFields && 'La Unidad es Obligatorio',
//                                         })}
//                                     >
//                                         <option value="" disabled>Seleccionar</option>
//                                         <option value="MB">MB</option>
//                                         <option value="GB">GB</option>
//                                         <option value="TB">TB</option>
//                                     </select>
//                                 </div>
//                                 {errors.bandwidth && errors.bandwidth[index]?.unit && <ErrorMsgForm>{errors.bandwidth[index].unit.message}</ErrorMsgForm>}
//                             </div>
//                         </div>
//                         <div className="flex flex-col items-center gap-1 ml-2">
//                             <div className="flex gap-1">
//                                 <button
//                                     className={`${ index === 0 ? 'opacity-50' : '' } material-symbols-outlined text-xs w-fit p-1 bg-blue-400 h-fit flex items-center justify-center rounded-full`}
//                                     type="button"
//                                     onClick={() => index > 0 && move(index, index - 1)}
//                                     disabled={index === 0}
//                                 >
//                                     arrow_upward
//                                 </button>
//                                 <button
//                                     className={`${ index === fields.length - 1 ? 'opacity-50' : '' } material-symbols-outlined text-xs w-fit p-1 bg-blue-400 h-fit flex items-center justify-center rounded-full`}
//                                     type="button"
//                                     onClick={() => index < fields.length - 1 && move(index, index + 1)}
//                                     disabled={index === fields.length - 1}
//                                 >
//                                     arrow_downward
//                                 </button>
//                             </div>
//                             <button
//                                 className="material-symbols-outlined text-xs w-fit p-1 bg-red-400 h-fit flex items-center justify-center  rounded-full"
//                                 type="button"
//                                 onClick={() => remove(index)}
//                                 // onClick={() => fields.length > 1 && remove(index)}
//                                 // disabled={fields.length <= 1}
//                             >delete</button>
//                         </div>
//                     </div>
//                 ))
//             }
//             <button
//                 className="flex gap-1 items-center bg-emerald-300 px-3 py-1 w-fit mx-auto my-2 rounded-lg uppercase hover:bg-emerald-800 hover:text-white"
//                 type="button"
//                 onClick={() => append({ amount: 0, unit: 'MB' })}
//             >Agregar Velocidad <span className="material-symbols-outlined">add_circle</span></button>
//         </div>
//     );
// };