import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { RoadmapEnum, TechnologyEnum, VendorType } from '../../../../types'
import { SubrackFormData } from '../../../../types/catalog/subrackTypes'
import { ErrorMsgForm } from '../../../shared/errors/ErrorMsgForm'

interface Props {
  register: UseFormRegister<SubrackFormData>
  errors: FieldErrors<SubrackFormData>
  vendors: VendorType[]
  requiredFields?: boolean
  isDeleted?: boolean
}

export const FormBodySubrack = ({ errors, register, vendors, isDeleted, requiredFields = true }: Props) => {
  return (
    <div className='flex flex-col text-sm'>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='subrackType'>
            Tipo
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            type='text'
            id='subrackType'
            placeholder='OSN9800 OSN8800 hiT7300 6500BB mTERA'
            {...register('subrackType', {
              required: requiredFields && 'El Tipo de Subrack es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.subrackType && <ErrorMsgForm>{errors.subrackType.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='subrackFamily'>
            Familia
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            type='text'
            id='subrackFamily'
            placeholder='T32 M24 S14 SRS-2'
            {...register('subrackFamily', {
              required: requiredFields && 'La Familia del Subrack es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.subrackFamily && <ErrorMsgForm>{errors.subrackFamily.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className=' flex flex-col w-1/3 text-right' htmlFor='modelName'>
            Modelo <span className='text-xs uppercase'>Si no posee Ingresar PN</span>
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            type='text'
            id='modelName'
            placeholder='TNFB8CASE TNFK01AFB 81.71S-MTERA-R6'
            {...register('modelName', {
              required: requiredFields && 'El Modelo del Subrack es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.modelName && <ErrorMsgForm>{errors.modelName.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='partNumber'>
            No. Parte
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            type='text'
            id='partNumber'
            placeholder='81.71S-MTERA-R6 02301555-001 S42023-L5082-A110-11'
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
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
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
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='totalSlots'>
            Cant. Slots
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            type='number'
            min={1}
            step={1}
            id='totalSlots'
            placeholder='Cantidad de Slots'
            // readOnly={true}
            {...register('totalSlots', {
              valueAsNumber: true,
              validate: value => !requiredFields || value > 0 || 'Debe Poseer al menos un Slot',
            })}
          />
        </div>
        {errors.totalSlots && <ErrorMsgForm>{errors.totalSlots.message}</ErrorMsgForm>}
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='description'>
          Descripcion
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          type='text'
          id='description'
          placeholder='Descripcion del Subrack'
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
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          type='text'
          id='observations'
          placeholder='Descripcion del Subrack'
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
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
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
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right' htmlFor='roadmap'>
            ROADMAP
          </label>
          <select
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            id='roadmap'
            {...register('roadmap', {
              required: requiredFields && 'Debe Seleccionar un Estado',
            })}
          >
            {Object.values(RoadmapEnum).map(roadmap => (
              <option key={roadmap} value={roadmap}>
                {roadmap}
              </option>
            ))}
          </select>
        </div>
        {errors.roadmap && <ErrorMsgForm>{errors.roadmap.message}</ErrorMsgForm>}
      </div>
      <div className='flex justify-between my-2 items-center space-x-3'>
        <label className='w-1/3 text-right' htmlFor='owner'>
          Propietario
        </label>
        <select className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black' id='owner' {...register('owner')}>
          <option value=''>Sin Datos...</option>
          <option value='TASA'>TASA</option>
          <option value='Client'>Cliente</option>
        </select>
      </div>
      {isDeleted && (
        <div className='flex justify-between my-2 items-center space-x-3'>
          <label className='w-1/3 text-right text-red-600 uppercase font-semibold' htmlFor='isDeleted'>
            Eliminado?
          </label>
          <select className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black' id='isDeleted' {...register('isDeleted')}>
            <option value='true'>ELIMINADO</option>
            <option value='false'>NO!... VOLVER A HABILITAR</option>
          </select>
        </div>
      )}
    </div>
  )
}
