import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayMove, UseFieldArrayRemove } from 'react-hook-form';
import { BoardFormData } from '../../../types';

interface Props {
    index: number;
    fields: FieldArrayWithId<BoardFormData, "ports", "id">[];
    ports: BoardFormData['ports'];
    append: UseFieldArrayAppend<BoardFormData, "ports">;
    move: UseFieldArrayMove;
    remove: UseFieldArrayRemove;
}

export const BtnAddPort = ({ append, fields, index, move, ports,remove }: Props ) => {

    const onClone = ( index: number ) => {
        const portToClone = ports[index]
        append({
            ...portToClone,
            port: portToClone.port + 1,
            physical: portToClone.physical.replace(/\d+/g, (match) => (parseInt(match) + 1).toString()),
            NMS: portToClone.NMS.replace(/\d+/g, (match) => (parseInt(match) + 1).toString())
        })
    }

    return (
        <div className="flex items-center gap-1 px-3 py-2 my-1 bg-orange-100 rounded-lg">
            <button
                className="material-symbols-outlined text-xs w-fit p-1 bg-lime-400 flex items-center justify-center rounded-full hover:bg-lime-800 hover:text-white"
                type="button"
                onClick={() => onClone(index)}
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
                className={`${index === fields.length - 1 ? 'opacity-50' : ''} material-symbols-outlined text-xs w-fit p-1 bg-blue-400 flex items-center justify-center rounded-full`}
                type="button"
                onClick={() => index < fields.length - 1 && move(index, index + 1)}
                disabled={index === fields.length - 1}
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
