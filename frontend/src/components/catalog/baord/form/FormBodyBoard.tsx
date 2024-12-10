// import { useForm } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
// import { UseFormRegister, FieldErrors, useFormContext } from 'react-hook-form'
import { BitsRatesEnum, BoardFormData, RoadmapEnum, TechnologyEnum } from '../../../../types'
import { ErrorMsgForm } from '../../../shared/errors/ErrorMsgForm'
import { useVendors } from '../../../../hook'
import { Spinner } from '../../../shared/spinners/Spinner'

interface Props {
  // register: UseFormRegister<BoardFormData>
  // errors: FieldErrors<BoardFormData>
  requiredFields?: boolean
  isDeleted?: boolean;
}

// export const FormBodyBoard = ({ register, errors, requiredFields }: Props) => {
export const FormBodyBoard = ({ requiredFields, isDeleted }: Props) => {

  const { queryVendors } = useVendors({ enabled: true })
  // const { register, formState: { errors } } = useForm<BoardFormData>()
  const { register, formState: { errors } } = useFormContext<BoardFormData>()

  if (queryVendors.isLoading) return <Spinner />

  return (
    <div className='flex flex-col text-black text-sm max-w-[400px] grow'>
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
              setValueAs: value => value.trim()
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
              setValueAs: value => value.trim()
            })}
          />
        </div>
        {errors.partNumber && <ErrorMsgForm>{errors.partNumber.message}</ErrorMsgForm>}
      </div>
      <div className="flex justify-between my-2 items-center space-x-3">
        <label className="w-1/3 text-right">Sañales</label>
        <div className="w-2/3 h-44 overflow-y-auto border border-gray-300 p-2 outline-none rounded shadow-md bg-white">
          {
            Object.values(BitsRatesEnum).map((bitRate) => (
              <div key={bitRate} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={bitRate}
                  value={bitRate}
                  {...register('bitsRates')}
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
              setValueAs: value => typeof value === 'object' && value !== null ? value.id : value,
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
        {errors.vendor && <ErrorMsgForm>{errors.vendor.message}</ErrorMsgForm>}
      </div>
      <div className='flex flex-col-reverse'>
        <div className="flex justify-between my-2 items-center space-x-3">
          <label className="w-1/3 text-right" htmlFor="bandwidthMax">BW Maximo [Gb]</label>
          <input
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            type="number"
            id="bandwidthMax"
            placeholder="BW Maximo de la Placa"
            {...register('bandwidthMax', {
              required: requiredFields && 'BW debe ser Mayor a 0',
              min: 1,
              setValueAs: value => parseInt(value),
              valueAsNumber: true,
              // validate: value => value && value <= 1 || 'Debe ser un número válido',
              onChange: e => e.target.value < 1 ? '' : e.target.value
            })}
          />
        </div>
        {errors.bandwidthMax && <ErrorMsgForm>{errors.bandwidthMax.message}</ErrorMsgForm>}
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
              required: requiredFields && 'El Tamaño debe ser Mayor a 0',
              min: 1,
              setValueAs: value => parseInt(value),
              valueAsNumber: true,
              onChange: e => e.target.value < 1 ? e.target.value = 1 : e.target.value
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
              Object.values(TechnologyEnum).map(technology => (
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
          <label className="w-1/3 text-right" htmlFor="roadmap">ROADMAP</label>
          <select
            className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
            id="roadmap"
            {...register('roadmap', {
              required: requiredFields && 'Debe Seleccionar un Estado',
            })}
          >
            {
              Object.values(RoadmapEnum).map(roadmap => (
                <option
                  key={roadmap}
                  value={roadmap}>{roadmap}</option>
              ))
            }
          </select>
        </div>
        {errors.technology && <ErrorMsgForm>{errors.technology.message}</ErrorMsgForm>}
      </div>
      {
        isDeleted && (
          <div className="flex justify-between my-2 items-center space-x-3">
            <label className="w-1/3 text-right text-red-600 uppercase font-semibold" htmlFor="isDeleted">Eliminado?</label>
            <select
              className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
              id="isDeleted"
              {...register('isDeleted')}
            >
              <option value="true">ELIMINADO</option>
              <option value="false">NO!... VOLVER A HABILITAR</option>
            </select>
          </div>
        )
      }
    </div>
  )
}
