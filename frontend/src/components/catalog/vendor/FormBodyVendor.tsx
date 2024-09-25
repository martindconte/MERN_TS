import { FieldErrors, UseFormRegister } from "react-hook-form"
import { VendorFormData } from "../../../types"
import { ErrorMsgForm } from "../../shared/errors/ErrorMsgForm";

interface Props {
  register: UseFormRegister<VendorFormData>;
  errors: FieldErrors<VendorFormData>;
  requiredFields?: boolean;
}

export const FormBodyVendor = ({ register, errors, requiredFields }: Props) => {
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
            {...register('vendorName', {
              required: requiredFields && 'El Nombre del Vendor es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.vendorName && <ErrorMsgForm>{errors.vendorName.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="centralName">Pais Origen</label>
          <input
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            type="text"
            id=""
            placeholder="Nombre de la Central"
            {...register('country', {
              required: requiredFields && 'El Pais de Origen es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.country && <ErrorMsgForm>{errors.country.message}</ErrorMsgForm>}
      </div>
      <div className="flex justify-between my-2 items-center space-x-3">
        <label className="w-1/3 text-right" htmlFor="description">Observaciones</label>
        <input
          className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
          type="text"
          id="observation"
          placeholder="Descripcion"
          {...register('observation', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
    </div>
  )
}
