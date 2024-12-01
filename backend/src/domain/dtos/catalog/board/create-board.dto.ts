import { helpersDB } from '../../../../data';
import { BitsRatesEnum, BoardPortType, Port, RoadmapEnum, TechnologyEnum } from '../../../../interface';

export class CreateBoardDTO {
    constructor(
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
    ) { }

    private static checkDataPorts(ports: Port[] | undefined): [string?, Port[]?] {

        if (!ports) return [undefined, []]
        if (!Array.isArray(ports)) return ['Ports must be Array'];
        const setPortsValues = new Set<number>()

        for (const port of ports) {

            const { NMS, physical, port: PortNumber, type, equipments, fullName, logicalFacilities } = port

            if (!PortNumber && typeof PortNumber !== 'number') return ['PortNumber is Required and must be a Number'];
            if (type === undefined || !Object.values(BoardPortType).includes(type)) return ['Invalid port type'];
            if (!physical && typeof physical !== 'string') return ['PortPhysical is Required and must be a String'];
            if (NMS && typeof NMS !== 'string') return ['PortNMS is Required and must be a String'];
            if (typeof fullName !== 'string') return ['PortNMS is Required and must be a String'];
            if (equipments && equipments.length > 0 && !equipments.some((equipment) => typeof equipment === 'string' && helpersDB.isMongoID(equipment))) return ['Invalid Equipment value!'];

            if (logicalFacilities) {

                const keys = Object.keys(logicalFacilities);
                const values = Object.values(logicalFacilities);
                const keysSet = new Set();
                const valuesSet = new Set();

                for (const key of keys) {
                    if (keysSet.has(key)) return [`${key} is Duplicated!`];
                    keysSet.add(key);
                };

                for (const value of values) {
                    for (const data of value) {
                        if (valuesSet.has(data)) return [`value ${data} is Duplicated!`];
                        valuesSet.add(data)
                    };
                };
                // logicalFacilities = {}
                // continue;
            };

            if (setPortsValues.has(port.port)) return [` Port Number ${port.port} is Duplicated!`];
            setPortsValues.add(port.port);
        };

        return [undefined, ports]
    }

    static create(board: CreateBoardDTO): [string?, CreateBoardDTO?] {

        const { boardName, partNumber, vendor, roadmap, description, observations, ports, bandwidthMax, slotSize, technology, bitsRates } = board

        if (!boardName) throw ['Missing BoardName Board'];
        if (!partNumber) throw ['Missing partNumber Board'];
        if (!vendor) throw ['Missing vendor'];
        if (vendor && !helpersDB.isMongoID(vendor)) throw ['Invalid Vendor value!'];
        if (bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate))) throw ['Invalid bitsRate'];
        if (roadmap && !Object.values(RoadmapEnum).includes(roadmap)) throw ['Invalid Status'];
        if (technology && !Object.values(TechnologyEnum).includes(technology)) throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
        if (slotSize && typeof slotSize !== 'number' && slotSize < 0) throw ['Invalid Slot Size. Must be bigger than 0'];
        const [error, portsCheck] = this.checkDataPorts(ports)
        if (error) throw [error]

        return [
            undefined,
            new CreateBoardDTO(
                boardName,
                partNumber,
                vendor,
                false,
                bitsRates || [],
                description,
                observations,
                portsCheck,
                bandwidthMax,
                slotSize,
                technology,
                roadmap,
            )
        ]
    }
}