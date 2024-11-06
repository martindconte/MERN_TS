import { LogicalSignal } from '../../../../types';
import { ILogicalPort } from '../AddPortFacilitiesModal';

interface Props {
    id: string;
    signal: "" | LogicalSignal;
    name: string;
    from: number;
    to: number;
    handleInputChange: (id: ILogicalPort["id"], key: keyof ILogicalPort, value: string | number) => void;
    handleDeleteLP: ( id: ILogicalPort["id"] ) => void;
}

export const LogicalPortRow = ({ from, id, name, signal, to, handleInputChange, handleDeleteLP }: Props) => {

    const handleInputNumber = (data: string): number => parseInt(data) > 0 ? parseInt(data) : 1;

    return (
        <tr>
            <td className="px-2 py-1 border border-gray-400">
                <select
                    className="outline-none px-2 py-1"
                    value={signal}
                    onChange={(event) => handleInputChange(id, "signal", event.target.value)}
                >
                    <option value="" disabled>
                        Señal
                    </option>
                    {Object.values(LogicalSignal).map((signal) => (
                        <option key={signal} value={signal}>
                            {signal}
                        </option>
                    ))}
                </select>
            </td>
            <td className="border border-gray-400">
                <input
                    className="outline-none px-2 py-1 w-56"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => handleInputChange(id, "name", event.target.value)}
                />
            </td>
            <td className="border border-gray-400">
                <input
                    className="outline-none px-2 py-1 w-16"
                    type="number"
                    name="from"
                    value={from}
                    onChange={(event) => handleInputChange(id, "from", handleInputNumber(event.target.value))}
                />
            </td>
            <td className="border border-gray-400">
                <input
                    className="outline-none px-2 py-1 w-16"
                    type="number"
                    name="to"
                    value={to}
                    onChange={(event) => handleInputChange(id, "to", handleInputNumber(event.target.value))}
                />
            </td>
            <td className="border border-gray-400">
                <button
                    className="material-symbols-outlined px-2 py-1 text-sm bg-emerald-400 rounded-full mx-1 my-1 cursor-pointer hover:bg-emerald-700 hover:text-white"
                >
                    content_copy
                </button>
                <button
                    className="material-symbols-outlined px-2 py-1 text-sm bg-red-400 rounded-full mx-1 my-1 cursor-pointer hover:bg-red-700 hover:text-white"
                    onClick={() => handleDeleteLP(id)}
                >delete</button>
            </td>
        </tr>
    )
}
