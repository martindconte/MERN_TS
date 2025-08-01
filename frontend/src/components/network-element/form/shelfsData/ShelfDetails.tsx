import { useFormContext } from 'react-hook-form'
import { NEFormData, SubrackType } from '../../../../types'
import { ErrorMsgForm } from '../../../shared'
import { ShelfInfo, ShelfDataInputs, NESlotInput } from './'

interface Props {
  id: string
  subracksAdded: SubrackType[]
  indexShelf: number
}

export const ShelfDetails = ({ subracksAdded, id, indexShelf }: Props) => {
  const subrackInfo = subracksAdded.find(subrack => subrack.id === id)

  if (!subrackInfo) return <p>Error al cargar información del subrack...</p>

  const { formState: { errors } } = useFormContext<NEFormData>()

  return (
    <div className='flex flex-col gap-2'>
      {/* {errors.subracks && errors.subracks[indexShelf] && (
        <div className='text-center mb-2'>
          <ErrorMsgForm>
            {errors.subracks[indexShelf].shelfNumber?.message ||
              errors.subracks[indexShelf].shelfName?.message ||
              errors.subracks[indexShelf].position?.message}
          </ErrorMsgForm>
        </div>
      )} */}
      {/* Componente para mostrar la informacion del shelf */}
      <ShelfInfo
        modelName={subrackInfo.modelName}
        observations={subrackInfo.observations}
        partNumber={subrackInfo.partNumber}
        subrackFamily={subrackInfo.subrackFamily}
        subrackType={subrackInfo.subrackType}
        vendorName={subrackInfo.vendor.vendorName || 's/d'}
      />
      {/* componente para completar la informacion del Shelf (Shelf, nombre, ubicacion, etc) */}
      {/* //todo: pasar las clases del div al componente hijo NESlotInput */}
      <ShelfDataInputs indexShelf={indexShelf} />
      <div className='text-sm font-roboto_condensed flex flex-col gap-1 border border-black px-2 py-1 rounded-lg bg-white h-[390px] overflow-auto'>
        {subrackInfo?.slots.map((slotData, indexSlot) => (
          <div key={slotData.number} className='flex gap-3 items-center'>
            {/* Inputs para completar la informacion por slot (placa del slot, ocupacion, transceiver, etc) */}
            <NESlotInput indexShelf={indexShelf} indexSlot={indexSlot} slotData={slotData} />
          </div>
        ))}
      </div>
    </div>
  )
}
