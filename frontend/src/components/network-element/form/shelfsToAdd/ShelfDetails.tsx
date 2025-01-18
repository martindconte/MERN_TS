import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { SubrackType, NEFormData } from '../../../../types';
import { ShelfInfo } from './ShelfInfo';
import { ShelfDataInputs } from './ShelfDataInputs';
import { NESlotInput } from './NESlotInput';
import { useState } from 'react';
import { BtnActions } from './BtnActions';

interface Props {
  subracksAdded: SubrackType[];
  register: UseFormRegister<NEFormData>;
  control: Control<NEFormData, any>;
  setValue: UseFormSetValue<NEFormData>;
  id: string;
  index: number;
}
enum Status {
  new = 'NEW',
  change = 'CHANGE',
  delete = 'DELETE',
}

export const ShelfDetails = ({ register, control, subracksAdded, id, index, setValue }: Props) => {
  const subrackInfo = subracksAdded.find(subrack => subrack.id === id);
  const [baordsStatus, setBaordsStatus] = useState<Map<number, { status: Status, currentBoardId: string }>>(new Map());
  // const [baordsStatus, setBaordsStatus] = useState<Map<number, Status>>(new Map());

  if (!subrackInfo) return <p>Error al cargar información del subrack...</p>;

  const getBoardStatus = (indexSlot: number) => baordsStatus.get(indexSlot);

  console.log('slotIndex: 0 ', getBoardStatus(0));
  console.log('slotIndex: 1', getBoardStatus(1));

  return (
    <div className='flex flex-col gap-2'>
      <ShelfInfo
        modelName={subrackInfo.modelName}
        observations={subrackInfo.observations}
        partNumber={subrackInfo.partNumber}
        subrackFamily={subrackInfo.subrackFamily}
        subrackType={subrackInfo.subrackType}
        vendorName={subrackInfo.vendor.vendorName || 's/d'}
      />
      <ShelfDataInputs register={register} indexShelf={index} />
      <div className='text-sm font-roboto_condensed flex flex-col gap-1 border border-black px-2 py-1 rounded-lg bg-white h-[390px] overflow-auto'>
        {subrackInfo?.slots.map((slot, indexSlot) => (
          <div key={slot.number} className='flex gap-3 items-center'>
            <NESlotInput
              indexShelf={index}
              indexSlot={indexSlot}
              register={register}
              slot={slot}
              isBoardConfirm={getBoardStatus(indexSlot)?.status === Status.new}
              // isBoardConfirm={getBoardStatus(indexSlot) === Status.new}
            />
            <BtnActions
              control={control}
              index={index}
              indexSlot={indexSlot}
              setValue={setValue}
              subrackInfo={subrackInfo}
              baordsStatus={baordsStatus}
              setBaordsStatus={setBaordsStatus}
            />
          </div>
        ))}
      </div>
    </div>
  );
};