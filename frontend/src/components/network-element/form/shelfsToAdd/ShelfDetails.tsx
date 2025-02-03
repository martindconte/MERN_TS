import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { SubrackType, NEFormData } from '../../../../types';
import { ShelfInfo } from './ShelfInfo';
import { ShelfDataInputs } from './ShelfDataInputs';
import { NESlotInput } from './NESlotInput';

interface Props {
  subracksAdded: SubrackType[];
  register: UseFormRegister<NEFormData>;
  control: Control<NEFormData, any>;
  setValue: UseFormSetValue<NEFormData>;
  id: string;
  indexShelf: number;
}

export const ShelfDetails = ({ register, control, subracksAdded, id, indexShelf, setValue }: Props) => {
  const subrackInfo = subracksAdded.find(subrack => subrack.id === id);

  if (!subrackInfo) return <p>Error al cargar información del subrack...</p>;

  return (
    <div className='flex flex-col gap-2'>
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
      <ShelfDataInputs register={register} control={control} indexShelf={indexShelf} />
      <div className='text-sm font-roboto_condensed flex flex-col gap-1 border border-black px-2 py-1 rounded-lg bg-white h-[390px] overflow-auto'>
        {subrackInfo?.slots.map((slotData, indexSlot) => (
          <div key={slotData.number} className='flex gap-3 items-center'>
            {/* Inputs para completar la informacion por slot (placa del slot, ocupacion, transceiver, etc) */}
            <NESlotInput
              indexShelf={indexShelf}
              indexSlot={indexSlot}
              register={register}
              control={control}
              setValue={setValue}
              slotData={slotData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};