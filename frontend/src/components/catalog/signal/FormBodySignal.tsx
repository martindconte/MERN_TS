import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { SignalFormData } from '../../../types'
import { ErrorMsgForm } from '../../shared/errors/ErrorMsgForm';
import { ChangeEvent, Dispatch } from 'react';

interface Props {
    register: UseFormRegister<SignalFormData>;
    errors: FieldErrors<SignalFormData>;
    requiredFields?: boolean;
    // control: Control<SignalFormData>;
    // setError: UseFormSetError<SignalFormData>;
    // clearErrors: UseFormClearErrors<SignalFormData>;
    showBandwidth: boolean;
    setShowBandwidth: Dispatch<React.SetStateAction<boolean>>;

}

export const FormBodySignal = ({ register, errors, requiredFields = true, showBandwidth, setShowBandwidth }: Props) => {

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShowBandwidth(event.target.checked);
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
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3" htmlFor="showBandwidth">Agregar Velocidad</label>
                <input
                    type="checkbox"
                    id="showBandwidth"
                    onChange={handleCheckboxChange}
                />
            </div>
            {
                    showBandwidth && (
                            <div
                                className="flex justify-between gap-3"
                            >
                                <div className='flex flex-col-reverse w-1/2'>
                                    <div className="flex justify-between my-2 items-center space-x-3">
                                        <label className="w-1/3" htmlFor="amount">Rate:</label>
                                        <input
                                            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                                            type="number"
                                            id="amount"
                                            placeholder="Cantidad"
                                            {...register('bandwidth.amount', {
                                                required: requiredFields && showBandwidth && 'La cantidad es obligatoria',
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                    {errors.bandwidth?.amount && <ErrorMsgForm>{errors.bandwidth.amount.message}</ErrorMsgForm>}
                                </div>
                                <div className='flex flex-col-reverse w-1/2'>
                                    <div className="flex justify-between my-2 items-center space-x-3">
                                        <label className="w-1/3" htmlFor="unit">Unidad</label>
                                        <select
                                            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                                            id="unit"
                                            {...register('bandwidth.unit', {
                                                required: requiredFields && 'La unidad es obligatoria',
                                                setValueAs: value => value.trim().toUpperCase(),
                                            })}
                                        >
                                            <option value="MB">MB</option>
                                            <option value="GB">GB</option>
                                            <option value="TB">TB</option>
                                        </select>
                                    </div>
                                    {errors.bandwidth?.unit && <ErrorMsgForm>{errors.bandwidth.unit.message}</ErrorMsgForm>}
                                </div>
                            </div>
                    )
                }
        </div>
    );
};