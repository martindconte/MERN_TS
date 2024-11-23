import { helpersDB } from "../../../../data";
import { BitsRatesEnum, BoardPortType, Port, RoadmapEnum, TechnologyEnum } from "../../../../interface";
import { TransceiverEntity } from "../../../entities";
import { CreateBoardDTO } from "./create-board.dto";

export class UpdateBoardDTO {
    constructor(
        public readonly id: string,
        public readonly boardName: string,
        public readonly partNumber: string,
        public readonly vendor: string,
        private readonly isDeleted: boolean = false,
        public readonly bitsRates?: BitsRatesEnum[],
        public readonly description?: string,
        public readonly observations?: string,
        public readonly ports?: Port[],
        public readonly bandwidthMax?: number,
        public readonly slotSize?: number,
        public readonly technology?: TechnologyEnum,
        public readonly roadmap?: RoadmapEnum,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    private static checkDataPorts( ports: Port[] | undefined ): [ string?, Port[]? ] {

        if (!ports || ports.length < 0) return [undefined, []]
        const setPortsValues = new Set<number>()

        for (const port of ports) {

            const { NMS, physical, type, equipments = [], fullName, port: portNumber, logicalFacilities } = port

            if (!portNumber && typeof portNumber !== 'number') return ['PortNumber is Required and must be a Number'];
            if (type === undefined || !Object.values(BoardPortType).includes(type)) return ['Invalid port type'];
            if (!physical && typeof physical !== 'string') return ['PortPhysical is Required and must be a String'];
            if (!NMS && typeof NMS !== 'string') return ['PortNMS is Required and must be a String'];
            if (fullName && typeof fullName !== 'string') return ['Full Name Must be a String'];
            if (!equipments.every((equipment) => helpersDB.isMongoID(equipment as string))) return ['Invalid Equipment value!'];
                        
            if (logicalFacilities) {
                const keysSet = new Set<string>();
                const valuesSet = new Set<string>();

                for (const [key, values] of Object.entries(logicalFacilities)) {

                    if (keysSet.has(key)) return [`Key "${key}" is duplicated`];

                    for (const value of values) {
                        if( valuesSet.has( value ) ) return [`In ${key} the value ${value} is Duplicated!`];
                        valuesSet.add( value )
                    };
                };
            };

            if (setPortsValues.has(port.port)) return [` Port Number ${port.port} is Duplicated!`];
            setPortsValues.add(port.port);
        };

        const updatePorts = ports.map( port => ({
            ...port,
            logicalFacilities: port.logicalFacilities instanceof Map
                ? Object.fromEntries( port.logicalFacilities )
                : port.logicalFacilities
        }))

        return [undefined, updatePorts]
    }

    static update( board: UpdateBoardDTO ): [ string?, UpdateBoardDTO? ] {

        const { id, boardName, partNumber, vendor, description, observations, ports, slotSize, technology, bandwidthMax, bitsRates, roadmap, createdAt, updatedAt } = board

        if ( !id ) throw ['Missinbg ID Transceiver'];
        if ( !boardName ) throw ['Missing BoardName Board'];
        if ( !partNumber ) throw ['Missing partNumber Board'];
        if ( !vendor ) throw ['Missing vendor'];
        if ( vendor && !helpersDB.isMongoID( vendor ) ) throw ['Invalid Vendor value!'];
        if ( bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate)) ) throw ['Invalid bitsRate'];
        if( technology === undefined || ( technology && !Object.values( TechnologyEnum ).includes( technology ) )) throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
        if ( roadmap && !Object.values( RoadmapEnum ).includes( roadmap ) ) throw ['Invalid Status'];
        if ( ports && !Array.isArray( ports ) ) throw ['Ports must be Array'];
        if ( slotSize && typeof slotSize !== 'number' && slotSize < 0 ) throw ['Invalid Slot Size. Must be bigger than 0'];
        if ( bandwidthMax && typeof bandwidthMax !== 'number' && bandwidthMax < 0 ) throw ['Invalid Bandwidth. Must be bigger than 0'];
        const [ error, portsCheck ] = this.checkDataPorts( ports )
        if ( error ) throw [ error ]

        return [
            undefined,
            new UpdateBoardDTO(
                id,
                boardName,
                partNumber,
                vendor,
                false,
                bitsRates,
                description,
                observations,
                portsCheck,
                bandwidthMax,
                slotSize,
                technology,
                roadmap,
                createdAt,
                updatedAt,
            )
        ]
    }
}