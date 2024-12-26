import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { VendorFormData } from '../../../types'
import { ErrorMsgForm } from '../../shared/errors/ErrorMsgForm'

interface Props {
  register: UseFormRegister<VendorFormData>
  errors: FieldErrors<VendorFormData>
  requiredFields?: boolean
  isDeleted?: boolean
}

export const FormBodyVendor = ({ register, errors, requiredFields, isDeleted = false }: Props) => {
  return (
    <div className='flex flex-col text-black text-sm'>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='vendorName'>
            Nombre
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
            type='text'
            id='vendorName'
            placeholder='Nombre de la Central'
            {...register('vendorName', {
              required: requiredFields && 'El Nombre del Vendor es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.vendorName && <ErrorMsgForm>{errors.vendorName.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='centralName'>
            Pais Origen
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
            type='text'
            id=''
            placeholder='Nombre de la Central'
            {...register('country', {
              required: requiredFields && 'El Pais de Origen es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.country && <ErrorMsgForm>{errors.country.message}</ErrorMsgForm>}
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='description'>
          Observaciones
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='observation'
          placeholder='Descripcion'
          {...register('observation', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      {isDeleted && (
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right text-red-600 uppercase font-semibold' htmlFor='isDeleted'>
            Eliminado?
          </label>
          <select
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
            id='isDeleted'
            {...register('isDeleted', {
              setValueAs: value => value === 'true',
            })}
          >
            <option value='true'>ELIMINADO</option>
            <option value='false'>NO... VOLVER A HABILITAR</option>
          </select>
        </div>
      )}
    </div>
  )
}
