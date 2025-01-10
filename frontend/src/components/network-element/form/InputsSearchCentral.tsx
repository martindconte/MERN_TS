import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { CentralFormData } from '../../../types'

interface Props {
  register: UseFormRegister<CentralFormData>
  errors?: FieldErrors<CentralFormData>
}

export const InputsSearchCentral = ({ register }: Props) => {
  return (
    <div className='flex text-sm space-x-2'>
      <div className='flex justify-between items-center gap-2'>
        <label className='text-right' htmlFor='centralName'>
          Central
        </label>
        <input
          className='border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='centralName'
          placeholder='Nombre de la Central'
          {...register('centralName', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex justify-between items-center gap-2'>
        <label className='text-right' htmlFor='codeName'>
          Codigo
        </label>
        <input
          className='border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='codeName'
          placeholder='Codigo de la Central (centro IU)'
          {...register('codeName', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex justify-between items-center gap-2'>
        <label className='text-right' htmlFor='siteCode'>
          Emplazamiento
        </label>
        <input
          className='border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='siteCode'
          placeholder='Codigo de EMPLAZAMIENTO'
          {...register('siteCode', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex justify-between items-center gap-2'>
        <label className='text-right' htmlFor='description'>
          Descripcion
        </label>
        <input
          className='border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='description'
          placeholder='Descripcion'
          {...register('description', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex justify-between items-center gap-2'>
          <label className='text-right' htmlFor='owner'>
            Propietario
          </label>
          <select
            className='border border-gray-300 p-1 outline-none rounded shadow-md'
            id='owner'
            {...register('owner')}
          >
            <option value='TASA'>TASA</option>
            <option value='MVS'>MOVIL</option>
            <option value='OTHER'>No Propia</option>
            <option value=''>Cualquiera</option>
          </select>
        </div>
      <div className='flex justify-between items-center gap-2'>
        <label className='text-right' htmlFor='observations'>
          Observaciones
        </label>
        <input
          className='border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='observations'
          placeholder='Informacion adicional'
          {...register('observations', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
    </div>
  )
}
