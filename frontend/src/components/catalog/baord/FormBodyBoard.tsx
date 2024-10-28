import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { BitsRatesEnum, BoardFormData, BoardStatusEnum, BoardTechnologyEnum } from '../../../types'
import { ErrorMsgForm } from '../../shared/errors/ErrorMsgForm'
import { useVendors } from '../../../hook'
import { Spinner } from '../../shared/spinners/Spinner'

interface Props {
  register: UseFormRegister<BoardFormData>
  errors: FieldErrors<BoardFormData>
  requiredFields?: boolean
}

export const FormBodyBoard = ({ register, errors, requiredFields }: Props) => {

  const { queryVendors } = useVendors({ enabled: true })

  if (queryVendors.isLoading) return <Spinner />

  return (
    <div className='flex flex-col text-black text-sm'>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="boardName">Nombre Placa:</label>
          <input
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            type="text"
            id="boardName"
            placeholder="TNG1M520SM06 TNU5N404C01 TNV3T220S01"
            {...register('boardName', {
              required: requiredFields && 'El Nombre es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.boardName && <ErrorMsgForm>{errors.boardName.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="partNumber">No. Parte:</label>
          <input
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            type="text"
            id="partNumber"
            placeholder="03033YQD 03030MVS 03025QVP"
            {...register('partNumber', {
              required: requiredFields && 'El Part Number es Obligatorio',
              setValueAs: value => value.trim(),
            })}
          />
        </div>
        {errors.partNumber && <ErrorMsgForm>{errors.partNumber.message}</ErrorMsgForm>}
      </div>
      <div className="flex justify-between my-2 items-center space-x-3">
        <label className="w-1/3 text-right" htmlFor="signals">Seañales</label>
        <div className="w-2/3 h-44 overflow-y-auto border border-gray-300 p-2 outline-none rounded shadow-md bg-white">
          {
            Object.values(BitsRatesEnum).map((bitRate) => (
              <div key={bitRate} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={bitRate}
                  value={bitRate}
                  {...register('signals')}
                />
                <label htmlFor={bitRate}>{bitRate}</label>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="vendor">Vendor</label>
          <select
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            id="vendor"
            {...register('vendor', {
              required: requiredFields && 'Debe Seleccionar un Proveedor',
            })}
          >
            <option value=''></option>
            {
              queryVendors.data?.map(vendor => (
                <option
                  key={vendor.id}
                  value={vendor.id}
                >{vendor.vendorName}</option>
              ))
            }
          </select>
        </div>
        {errors.vendor?.id && <ErrorMsgForm>{errors.vendor.id.message}</ErrorMsgForm>}
      </div>
      <div className="flex justify-between my-2 items-center space-x-3">
        <label className="w-1/3 text-right" htmlFor="bandwidthMax">BW Maximo [Gb]</label>
        <input
          className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
          type="number"
          id="bandwidthMax"
          placeholder="BW Maximo de la Placa"
          {...register('bandwidthMax', {
            setValueAs: value => value.trim(),
            valueAsNumber: true,
            validate: value => value && value > 1 || 'Debe ser un número válido',
            min: 1
          })}
        />
      </div>
      <div className="flex justify-between my-2 items-center space-x-3">
        <label className="w-1/3 text-right" htmlFor="description">Descripcion</label>
        <input
          className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
          type="text"
          id="description"
          placeholder="Descripcion del Modulo"
          {...register('description', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className="flex justify-between my-2 items-center space-x-3">
        <label className="w-1/3 text-right" htmlFor="observations">Observaciones</label>
        <input
          className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
          type="text"
          id="observations"
          placeholder="Descripcion del Modulo"
          {...register('observations', {
            setValueAs: value => value.trim(),
          })}
        />
      </div>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="observations">Cant. Slots</label>
          <input
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            type="number"
            id="slotSize"
            placeholder="Descripcion del Modulo"
            {...register('slotSize', {
              setValueAs: value => parseInt(value),
              valueAsNumber: true,
              validate: value => !isNaN(value) || 'Debe ser un número válido',
              min: 1
            })}
          />
        </div>
        {errors.slotSize && <ErrorMsgForm>{errors.slotSize.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="technology">Tecnologia</label>
          <select
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            id="technology"
            {...register('technology', {
              required: requiredFields && 'Debe Seleccionar una Tecnologia',
            })}
          >
            <option value=''></option>
            {
              Object.values(BoardTechnologyEnum).map(technology => (
                <option
                  key={technology}
                  value={technology}>{technology}</option>
              ))
            }
          </select>
        </div>
        {errors.technology && <ErrorMsgForm>{errors.technology.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="status">Estado</label>
          <select
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            id="status"
            {...register('status', {
              required: requiredFields && 'Debe Seleccionar un Estado',
            })}
          >
            {
              Object.values(BoardStatusEnum).map(status => (
                <option
                  key={status}
                  value={status}>{status}</option>
              ))
            }
          </select>
        </div>
        {errors.technology && <ErrorMsgForm>{errors.technology.message}</ErrorMsgForm>}
      </div>
    </div>
  )
}
