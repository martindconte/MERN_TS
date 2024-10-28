import { helpersDB } from '../../../../data';
import { BitsRatesEnum, BoardPortType, BoardStatusEnum, BoardTechnologyEnum, Port } from '../../../../interface';

export class CreateBoardDTO {
    constructor(
        public readonly boardName: string,
        public readonly partNumber: string,
        public readonly vendor: string,
        public readonly signals: string[],
        public readonly description?: string,
        public readonly observations?: string,
        public readonly ports?: Port[],
        public readonly slotSize?: number,
        public readonly technology?: BoardTechnologyEnum,
        public readonly status?: BoardStatusEnum,
    ) {}

    private static checkDataPorts( ports: Port[] | undefined ): [ string?, Port[]? ] {

        if ( !ports ) return [ undefined, [] ]
        if ( !Array.isArray( ports ) ) return ['Ports must be Array'];
        
            for (const port of ports) {

                if( !port.port && typeof port.port !== 'number' ) return ['PortNumber is Required and must be a Number'];
                if( port.type === undefined || !Object.values(BoardPortType).includes(port.type)) return ['Invalid port type'];
                if( !port.physical && typeof port.physical !== 'string' ) return ['PortPhysical is Required and must be a String'];
                if( !port.NMS && typeof port.NMS !== 'string' ) return ['PortNMS is Required and must be a String'];
                if( !port.equipment ) port.equipment = [];
                if( port.equipment.length > 0 && !port.equipment.some(( equipment: string ) => helpersDB.isMongoID( equipment ) ) ) return ['Invalid Equipment value!'];

                if( !port.logicalFacilities ) {
                    port.logicalFacilities = {}
                    continue;
                }

                const keys = Object.keys( port.logicalFacilities );
                const values = Object.values( port.logicalFacilities );
                const keysSet = new Set();
                const valuesSet = new Set();
        
                for ( const key of keys ) {
                    if ( keysSet.has( key ) ) return [ `${key} is Duplicated!` ];
                    keysSet.add( key );
                };
        
                for ( const value of values ) {
                    for ( const data of value ) {
                        if ( valuesSet.has( data ) ) return [ `${data} is Duplicated!` ];
                        valuesSet.add( data )
                    }
                }
            };

        return [undefined, ports]
    }

    static create( board: { [ key: string ]: any } ): [ string?, CreateBoardDTO? ] {

        const { boardName, partNumber, vendor, signals, description, observations, ports, slotSize, technology, status } = board

        if ( !boardName ) throw ['Missing BoardName Board'];
        if ( !partNumber ) throw ['Missing partNumber Board'];
        if ( !vendor ) throw ['Missing vendor'];
        if ( vendor && !helpersDB.isMongoID( vendor ) ) throw ['Invalid Vendor value!'];
        if ( signals && signals.lenght > 0 && !Object.values( BitsRatesEnum ).includes( signals ) ) throw ['Invalid Signal value!'];
        // if ( signals && signals.lenght > 0 && !signals.some(( signal: string ) => helpersDB.isMongoID( signal ) ) ) throw ['Invalid Signal value!'];
        if ( technology && !Object.values( BoardTechnologyEnum ).includes( technology.toUpperCase() ) ) throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
        if ( status && !Object.values( BoardStatusEnum ).includes( status )) throw ['Invalid Status'];
        if ( typeof slotSize !== 'number' && slotSize < 0 ) throw ['Invalid Status'];
        const [ error, portsCheck ] = this.checkDataPorts( ports )
        if ( error ) throw [ error ]
            
        return [
            undefined,
            new CreateBoardDTO(
                boardName,
                partNumber,
                vendor,
                signals,
                description,
                observations,
                portsCheck,
                slotSize,
                technology,
                status,
            )
        ]
    }
}