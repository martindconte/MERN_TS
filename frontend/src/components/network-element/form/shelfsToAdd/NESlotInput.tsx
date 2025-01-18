import { UseFormRegister } from "react-hook-form";
import { NEFormData, SubrackType } from "../../../../types";

interface Props {
    register: UseFormRegister<NEFormData>;
    slot: SubrackType['slots'][number];
    indexShelf: number;
    indexSlot: number;
    isBoardConfirm: boolean;
}

export const NESlotInput = ({ register, slot, indexShelf, indexSlot, isBoardConfirm /* handleChangeBoard  */ }: Props) => {
  return (
    <>
      <div className='flex gap-2 items-center'>
        <label htmlFor='physical' className='uppercase font-semibold'>
          Slot:
        </label>
        <input
          className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-16'
          type='string'
          min={0}
          step={1}
          id='physical'
          placeholder='Slot Fisico del Equipo'
          readOnly
          value={slot.physical}
          {...register(`subracks.${indexShelf}.slots.${indexSlot}.physical` as const)}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor='logical' className='uppercase font-semibold'>
          NMS:
        </label>
        <input
          className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-16'
          type='string'
          min={0}
          step={1}
          id='logical'
          placeholder='Slot Fisico del Equipo'
          readOnly
          value={slot.logical}
          {...register(`subracks.${indexShelf}.slots.${indexSlot}.logical` as const)}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor='board' className='uppercase font-semibold'>
          Placa:
        </label>
        <select
          // onChange={event => handleChangeBoard(event.target.value, indexSlot)}
          className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-fit'
          disabled={isBoardConfirm}
          {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.id` as const, {
            // onChange: event => handleChangeBoard(event.target.value, indexSlot)
          })}
        >
          <option value=''>EMPTY</option>
          {slot.boards?.map(board => (
            <option key={board.id} value={board.id}>
              PN: {board.partNumber} / Model: {board.boardName}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
