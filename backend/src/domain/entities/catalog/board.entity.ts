import { helpersDB } from '../../../data';
import { BoardPortType, BoardStatusEnum, BoardTechnologyEnum, Port } from '../../../interface';
import { CustomError } from '../../errors/custom.errors';

export class BoardEntity {
    constructor(
        public readonly id: string,
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
        public readonly createdAt?: string,
        public readonly updatedAt?: string,
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
                // if( port.equipment.length > 0 && !port.equipment.some(( equipment: string ) => helpersDB.isMongoID( equipment ) ) ) return ['Invalid Equipment value!'];

                if( !port.logicalFacilities ) {
                    port.logicalFacilities = {}
                    continue;
                }

            //     const keys = Object.keys( port.logicalFacilities );
            //     const values: string[] = Object.values( port );
            //     const keysSet = new Set();
            //     const valuesSet = new Set();
        
            //     for ( const key of keys ) {
            //         if ( keysSet.has( key ) ) return [ `${key} is Duplicated!` ];
            //         keysSet.add( key );
            //     };
        
            //     for ( const value of values ) {
            //         for ( const data of value ) {
            //             if ( valuesSet.has( data ) ) return [ `${data} is Duplicated!` ];
            //             valuesSet.add( data )
            //         }
            //     }
            };

        return [undefined, ports]
    }

    static fromObject( object: {[ key: string ]: any} ) {

        const { id, _id, boardName, partNumber, vendor, signals, description, observations, ports, slotSize, technology, status, createdAt, updatedAt } = object

        if ( !id && !_id ) throw CustomError.badRequest('Missing id');
        if ( !boardName ) throw CustomError.badRequest('Missing BoardName Board');
        if ( !partNumber ) throw CustomError.badRequest('Missing partNumber Board');
        if ( !vendor ) throw CustomError.badRequest('Missing vendor');
        if ( signals && signals.lenght > 0 && !signals.some(( signal: string ) => helpersDB.isMongoID( signal ) ) ) throw ['Invalid Signal value!'];
        if ( technology && !Object.values( BoardTechnologyEnum ).includes( technology.toUpperCase() ) ) throw CustomError.badRequest('Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO');
        if ( status && !Object.values( BoardStatusEnum ).includes( status )) throw CustomError.badRequest('Invalid Status');
        if ( typeof slotSize !== 'number' && slotSize < 0 ) throw CustomError.badRequest('Invalid Status');
        const [ error, portsCheck ] = this.checkDataPorts( ports )
        if ( error ) throw [ error ]

        return new BoardEntity(
            id || _id,
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
            createdAt,
            updatedAt,
        )
    }
}
