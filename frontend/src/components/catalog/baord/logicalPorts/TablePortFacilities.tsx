import { ILogicalPort } from "../form/AddPortFacilitiesModal";
import { LogicalPortRow } from "./LogicalPortRow"

interface Props {
    logicalPorts: ILogicalPort[];
    handleInputChange: (id: ILogicalPort["id"], key: keyof ILogicalPort, value: string | number) => void;
    handleDeleteLP: ( id: ILogicalPort["id"] ) => void;
}

export const TablePortFacilities = ({ logicalPorts, handleDeleteLP, handleInputChange }: Props) => {
    return (
        <table className="border-4 border-gray-700">
            <thead>
                <tr className="border-2 border-gray-500 uppercase font-bold">
                    <th className="border border-gray-400 px-2 py-1">Señal</th>
                    <th className="border border-gray-400 px-2 py-1">Nombre</th>
                    <th className="border border-gray-400 px-2 py-1">Desde</th>
                    <th className="border border-gray-400 px-2 py-1">Hasta</th>
                    <th className="border border-gray-400 px-2 py-1">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    logicalPorts.map(({ id, signal, name, from, to }) => (
                        <LogicalPortRow
                            key={ id }
                            id={id}
                            signal={signal}
                            name={name}
                            from={from}
                            to={to}
                            handleInputChange={handleInputChange}
                            handleDeleteLP={handleDeleteLP}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}
