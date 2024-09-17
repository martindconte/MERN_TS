import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMsgForm } from "../shared"
import { CentralFormData } from "../../types";

type FormBodyCentralProps = {
    register: UseFormRegister<CentralFormData>
    errors: FieldErrors<CentralFormData>
    requiredFields?: boolean
}

export const FormBodyCentral = ({ register, errors, requiredFields = true }: FormBodyCentralProps) => {
    return (
        <div className='flex flex-col text-black text-sm'>
            <div className='flex flex-col-reverse'>
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3 text-right" htmlFor="centralName">Central</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="centralName"
                        placeholder="Nombre de la Central"
                        {...register('centralName', {
                            required: requiredFields && 'El Nombre de la Central es Obligatorio'
                        })}
                    />
                </div>
                {errors.centralName && <ErrorMsgForm>{errors.centralName.message}</ErrorMsgForm>}
            </div>
            <div className='flex flex-col-reverse'>
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3 text-right" htmlFor="codeName">Codigo</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="codeName"
                        placeholder="Codigo de la Central (centro IU)"
                        {...register('codeName', {
                            required: requiredFields && 'El Codigo (IU) es Obligatorio'
                        })}
                    />
                </div>
                {errors.codeName && <ErrorMsgForm>{errors.codeName.message}</ErrorMsgForm>}
            </div>
            <div className='flex flex-col-reverse'>
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3 text-right" htmlFor="siteCode">Emplazamiento</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="siteCode"
                        placeholder="Codigo de EMPLAZAMIENTO"
                        {...register('siteCode', {
                            required: requiredFields && 'El Emplazamiento es Obligatorio'
                        })}
                    />
                </div>
                {errors.siteCode && <ErrorMsgForm>{errors.siteCode.message}</ErrorMsgForm>}
            </div>
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3 text-right" htmlFor="description">Descripcion</label>
                <input
                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                    type="text"
                    id="description"
                    placeholder="Descripcion"
                    {...register('description')}
                />
            </div>
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3 text-right" htmlFor="provinceName">Provincia</label>
                <input
                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                    type="text"
                    id="provinceName"
                    placeholder="Ingrese la provincia"
                    {...register('provinceName')}
                />
            </div>
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3 text-right" htmlFor="districtName">Partido</label>
                <input
                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                    type="text"
                    id="districtName"
                    placeholder="Ingrese el partido"
                    {...register('districtName')}
                />
            </div>
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3 text-right" htmlFor="localityName">Localidad</label>
                <input
                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                    type="text"
                    id="localityName"
                    placeholder="Ingrese la localidad"
                    {...register('localityName')}
                />
            </div>
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3 text-right" htmlFor="address">Domicilio</label>
                <input
                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                    type="text"
                    id="address"
                    placeholder="Ingrese domicilio"
                    {...register('address')}
                />
            </div>
            <div className="flex flex-col-reverse">
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3 text-right" htmlFor="latitude">Latitud</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="number"
                        id="latitude"
                        placeholder="Ingrese Latitud en Decimales"
                        {...register('latitude', {
                            valueAsNumber: true,
                            min: {
                                value: -90,
                                message: 'La Latitud no puede ser menor a -90'
                            },
                            max: {
                                value: 90,
                                message: 'La Latitud no puede ser mayor a -90'
                            }
                        })}
                    />
                </div>
                {errors.latitude && <ErrorMsgForm>{errors.latitude.message}</ErrorMsgForm>}
            </div>
            <div className="flex flex-col-reverse">
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3 text-right" htmlFor="longitude">Longitud</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="number"
                        id="longitude"
                        placeholder="Ingrese Longuitd en Decimales"
                        {...register('longitude', {
                            valueAsNumber: true,
                            min: {
                                value: -180,
                                message: 'La Longitud no puede ser menor a -180'
                            },
                            max: {
                                value: 180,
                                message: 'La Longitud no puede ser mayor a 180'
                            }
                        })}
                    />
                </div>
            </div>
            <div className='flex flex-col-reverse'>
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3 text-right" htmlFor="owner">Propietario</label>
                    <select
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        id="owner"
                        {...register('owner', {
                            required: requiredFields && 'El Propietario es Obligatorio'
                        })}
                    >
                        <option value="TASA">TASA</option>
                        <option value="MVS">MOVIL</option>
                        <option value="OTHER">No Propia</option>
                        <option value="">Cualquiera</option>
                    </select>
                </div>
                {errors.owner && <ErrorMsgForm>{errors.owner.message}</ErrorMsgForm>}
            </div>
            <div className="flex justify-between my-2 items-center space-x-3">
                <label className="w-1/3 text-right" htmlFor="observations">Observaciones</label>
                <input
                    className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                    type="text"
                    id="observations"
                    placeholder="Informacion adicional"
                    {...register('observations')}
                />
            </div>
            <div className='flex flex-col-reverse'>
                <div className="flex justify-between my-2 items-center space-x-3">
                    <label className="w-1/3 text-right" htmlFor="status">Estado</label>
                    <select
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        id="status"
                        {...register('status', {
                            required: requiredFields && 'Debe Indicar el estado del Sitio'
                        })}
                    >
                        <option value="true" >Activo</option>
                        <option value="false">Desafectado</option>
                        <option value=''>Cualquiera</option>
                    </select>
                </div>
                {errors.status && <ErrorMsgForm>{errors.status.message}</ErrorMsgForm>}
            </div>
        </div>
    )
}
