import { useFormContext } from 'react-hook-form'
import { NEFormData, PathType } from '../../../../../types'
import { ToggleComponent } from '../../../../shared'

interface Props {
  toggleName: string
  indexShelf: number
  indexSlot: number
  indexPort: number
}

export const PathDataInput = ({ indexShelf, indexSlot, indexPort, toggleName }: Props) => {

  const { register, control } = useFormContext<NEFormData>()

  return (
    <div className='relative flex items-center gap-2 pt-5 pb-2 px-3 border border-gray-300 rounded-md mt-3 grow hover:ring-2 hover:ring-blue-500'>
      <span className='absolute -top-2 left-2 bg-white px-2 text-sm text-gray-600 uppercase'>Path</span>
      <div className='flex flex-col gap-3 w-full'>
        <div className='flex items-center gap-2 w-full'>
          <div className='flex items-center gap-2'>
            <label htmlFor={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-IDIU`} className='text-nowrap'>
              ID IU:
            </label>
            <input
              type='text'
              id={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-IDIU`}
              className='block w-20 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
              // value={IUId}
              {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.IUId` as const)}
            />
          </div>
          <div className='flex items-center gap-2 grow'>
            <label htmlFor={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-path`} className='text-nowrap'>
              Path:
            </label>
            <input
              type='text'
              id={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-path`}
              className='block w-full min-w-80  border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
              {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.pathName` as const)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-datoBasico`} className='text-nowrap'>
              DBTX
            </label>
            <input
              type='text'
              id={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-datoBasico`}
              className='block w-20 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
              {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.datoBasico` as const)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-type`} className='text-nowrap'>
              Estado
            </label>
            <select
              id={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-type`}
              className='uppercase p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
              {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.type` as const)}
            >
              <option value=''></option>
              {Object.values(PathType).map(value => {
                const labels = {
                  [PathType.RESERVED]: 'Reservado',
                  [PathType.PLANNED]: 'Planificado',
                  [PathType.IN_SERVICE]: 'En servicio',
                  [PathType.TO_BE_OCCUPIED]: 'A ocuparse',
                }
                return (
                  <option key={value} value={value}>
                    {labels[value] || value}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <label htmlFor={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-client`} className='text-nowrap'>
              Cliente:
            </label>
            <input
              type='text'
              id={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-client`}
              className='block w-36 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
              {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.client` as const)}
            />
          </div>
          <ToggleComponent
            register={register}
            control={control}
            indexShelf={indexShelf}
            indexSlot={indexSlot}
            indexPort={indexPort}
            toggleName='Accesible'
            registerName={`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.available` as const}
            labelName={toggleName}
          />
          <div className='flex items-center gap-2 grow'>
            <label htmlFor={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-observation`} className='text-nowrap'>
              Observaciones:
            </label>
            <textarea
              id={`shelf${indexShelf}-slot${indexSlot}-port${indexPort}-observation`}
              className='w-full min-h-8 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
              {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.observation` as const)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
