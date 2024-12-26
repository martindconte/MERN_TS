import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { /*TransceiverBitsRatesEnum, */ BitsRatesEnum, TransceiverFormData, VendorType } from '../../../types'
import { ErrorMsgForm } from '../../shared/errors/ErrorMsgForm'
import { TechnologyEnum } from '../../../types/catalog/commonTypes'

interface Props {
  register: UseFormRegister<TransceiverFormData>
  errors: FieldErrors<TransceiverFormData>
  vendors: VendorType[]
  requiredFields?: boolean
  isDeleted?: boolean
}

export const FormBodyTransceiver = ({ register, errors, vendors, requiredFields, isDeleted }: Props) => {
  return (
    <div className='flex flex-col text-black text-sm'>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='partNumber'>
            No. Parte
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
            type='text'
            id='partNumber'
            placeholder='Part Number del Transceiver'
            {...register('partNumber', {
              required: requiredFields && 'El Part Number es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.partNumber && <ErrorMsgForm>{errors.partNumber.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='vendor'>
            Vendor
          </label>
          <select
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
            id='vendor'
            {...register('vendor', {
              required: requiredFields && 'Debe Seleccionar un Proveedor',
              setValueAs: value => (typeof value === 'object' && value !== null ? value.id : value),
            })}
          >
            <option value=''></option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.vendorName}
              </option>
            ))}
          </select>
        </div>
        {errors.vendor && <ErrorMsgForm>{errors.vendor.message}</ErrorMsgForm>}
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='modelName'>
          Model
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='modelName'
          placeholder='Ingrese el modelo. Si no posee Ingrese PN'
          {...register('modelName', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='type'>
          Tipo
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='type'
          placeholder='SFP, SFP+, QSFP28, CFP, MSA, etc...'
          {...register('type', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='description'>
          Descripcion
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='description'
          placeholder='Descripcion del Modulo'
          {...register('description', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='observations'>
          Observaciones
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
          type='text'
          id='observations'
          placeholder='Descripcion del Modulo'
          {...register('observations', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='technology'>
            Tecnologia
          </label>
          <select
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md'
            id='technology'
            {...register('technology', {
              required: requiredFields && 'Debe Seleccionar una Tecnologia',
            })}
          >
            <option value=''></option>
            {Object.values(TechnologyEnum).map(technology => (
              <option key={technology} value={technology}>
                {technology}
              </option>
            ))}
          </select>
        </div>
        {errors.technology && <ErrorMsgForm>{errors.technology.message}</ErrorMsgForm>}
      </div>

      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='bitsRates'>
          Bit Rates
        </label>
        <div className='w-2/3 h-44 overflow-y-auto border border-gray-300 p-2 outline-none rounded shadow-md bg-white'>
          {/* {Object.values(TransceiverBitsRatesEnum).map((bitRate) => ( */}
          {Object.values(BitsRatesEnum).map(bitRate => (
            <div key={bitRate} className='flex items-center space-x-2'>
              <input type='checkbox' id={bitRate} value={bitRate} {...register('bitsRates')} />
              <label htmlFor={bitRate}>{bitRate}</label>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='roadmap'>
          ROADMAP
        </label>
        <select className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md' id='roadmap' {...register('roadmap')}>
          <option value=''>Sin Datos...</option>
          <option value='InService'>InService</option>
          <option value='EndOfSupport'>EndOfSupport</option>
          <option value='EndOfMarketing'>EndOfMarketing</option>
        </select>
      </div>
      {isDeleted && (
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right text-red-600 uppercase font-semibold' htmlFor='isDeleted'>
            Eliminado?
          </label>
          <select className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md' id='isDeleted' {...register('isDeleted')}>
            <option value='true'>ELIMINADO</option>
            <option value='false'>NO... VOLVER A HABILITAR</option>
          </select>
        </div>
      )}
    </div>
  )
}
