import { UseFieldArrayMove, UseFieldArrayRemove } from "react-hook-form";

interface Props {
    index: number;
    move: UseFieldArrayMove;
    remove: UseFieldArrayRemove;
    totalSlots: number;
}

export const BtnSlotsActions = ({ index, move, remove, totalSlots }: Props) => {

    return (
    <div className="flex items-center gap-1 rounded-lg">
            <button
                className="material-symbols-outlined text-xs w-fit p-1 bg-lime-400 flex items-center justify-center rounded-full hover:bg-lime-800 hover:text-white"
                type="button"
                // onClick={() => onClone(index)}
            >
                content_copy
            </button>
            <button
                className={`${index === 0 ? 'opacity-50' : ''} material-symbols-outlined text-xs w-fit p-1 bg-blue-400 flex items-center justify-center rounded-full`}
                type="button"
                onClick={() => index > 0 && move(index, index - 1)}
                disabled={index === 0}
            >
                arrow_upward
            </button>
            <button
                className={`${index === totalSlots - 1 ? 'opacity-50' : ''} material-symbols-outlined text-xs w-fit p-1 bg-blue-400 flex items-center justify-center rounded-full`}
                type="button"
                onClick={() => index < totalSlots - 1 && move(index, index + 1)}
                disabled={index === totalSlots - 1}
            >
                arrow_downward
            </button>
            <button
                className="material-symbols-outlined text-xs w-fit p-1 bg-red-400 flex items-center justify-center rounded-full"
                type="button"
                onClick={() => remove(index)}
            >delete</button>
        </div>

  )
}
