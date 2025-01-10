import { Dispatch, SetStateAction } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { NEFormData, NESettingEnum, NETypeEnum, OwnerEnum, VendorType } from '../../../types'
import { ErrorMsgForm } from '../../shared/errors/ErrorMsgForm'

interface Props {
  register: UseFormRegister<NEFormData>;
  errors: FieldErrors<NEFormData>;
  vendors: VendorType[];
  centralName: string;
  showCentralModal: Dispatch<SetStateAction<boolean>>;
  cleanCentral: () => void;
  requiredFields?: boolean;
  isDeleted?: boolean;
}
export const FormBodyNE = ({
  errors,
  register,
  vendors,
  isDeleted,
  requiredFields = true,
  centralName = '',
  showCentralModal,
  cleanCentral,
}: Props) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between items-center space-x-3'>
          <label className='w-1/3' htmlFor='centralName'>
            Central:
          </label>
          <p className='w-2/3 flex items-center justify-between bg-white border border-gray-300 p-1 outline-none rounded shadow-md text-black'>
            {centralName}
            {centralName ? (
              <button
                className='material-symbols-outlined text-red-500 hover:bg-red-700 hover:text-white hover:rounded-full'
                type='button'
                onClick={cleanCentral}
              >
                cancel
              </button>
            ) : (
              <button className='uppercase text-xs py-1 bg-emerald-400 px-2 rounded-md' type='button' onClick={() => showCentralModal(true)}>
                Buscar
              </button>
            )}
          </p>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            type='text'
            id='centralName'
            placeholder='Seleccione una Central'
            readOnly
            hidden
            value={centralName}
            onClick={() => showCentralModal(true)}
            {...register('central', {
              required: requiredFields && 'La Central es Obligatoria',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.central && <ErrorMsgForm>{errors.central.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between items-center space-x-3'>
          <label className='w-1/3' htmlFor='neName'>
            Nemonico:
          </label>
          <input
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            type='text'
            id='neName'
            placeholder='BRR-9800-01-R CUY-6500-01-R TMPC01'
            {...register('neName', {
              required: requiredFields && 'El Nemonico es Obligatorio',
              setValueAs: value => value.trim().toUpperCase(),
            })}
          />
        </div>
        {errors.neName && <ErrorMsgForm>{errors.neName.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between items-center space-x-3'>
          <label className='w-1/3' htmlFor='vendor'>
            Vendor:
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
        <div className='flex justify-between items-center space-x-3'>
          <label className='w-1/3' htmlFor='type'>
            Tipo NE:
          </label>
          <select
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            id='type'
            {...register('type', {
              required: requiredFields && 'Seleccione un Tipo de NE',
            })}
          >
            <option value=''></option>
            {Object.values(NETypeEnum).map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {errors.type && <ErrorMsgForm>{errors.type.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className='flex justify-between items-center space-x-3'>
          <label className='w-1/3' htmlFor='setting'>
            Configuracion:
          </label>
          <select
            className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
            id='setting'
            {...register('setting', {
              required: requiredFields && 'Debe Seleccionar una Configuracion',
            })}
          >
            <option value=''></option>
            {Object.values(NESettingEnum).map(setting => (
              <option key={setting} value={setting}>
                {setting}
              </option>
            ))}
          </select>
        </div>
        {errors.setting && <ErrorMsgForm>{errors.setting.message}</ErrorMsgForm>}
      </div>
      <div className='flex justify-between items-center space-x-3'>
        <label className='w-1/3' htmlFor='neIp'>
          IP:
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          type='text'
          id='neIp'
          placeholder='192.168.5.25'
          {...register('neIp')}
        />
      </div>
      <div className='flex justify-between items-center space-x-3'>
        <label className='w-1/3' htmlFor='dbTx'>
          DBTX:
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          type='text'
          id='dbTx'
          placeholder='NUMERO/AÑO XXX/2024'
          {...register('dbTx', {
            setValueAs: value => value.trim().toUpperCase(),
          })}
        />
      </div>
      <div className='flex justify-between items-center space-x-3'>
        <label className='w-1/3' htmlFor='remarks'>
          Comentario:
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          type='text'
          id='remarks'
          placeholder='Ingrese Comentario'
          {...register('remarks', {
            setValueAs: value => value.trim().toUpperCase(),
          })}
        />
      </div>
      <div className='flex justify-between items-center space-x-3'>
        <label className='w-1/3' htmlFor='owner'>
          Propietario:
        </label>
        <select className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black' id='owner' {...register('owner')}>
          <option value=''></option>
          {Object.values(OwnerEnum).map(owner => (
            <option key={owner} value={owner} defaultValue={OwnerEnum.TASA}>
              {owner}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-between items-center space-x-3'>
        <label className='w-1/3' htmlFor='observations'>
          Observaciones:
        </label>
        <input
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          type='text'
          id='observations'
          placeholder='NUMERO/AÑO XXX/2024'
          {...register('observations', {
            setValueAs: value => value.trim().toUpperCase(),
          })}
        />
      </div>
      {isDeleted && <p>Pendiente de Construccion</p>}
    </div>
  )
}
