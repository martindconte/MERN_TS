import { helpersDB } from "../../../../data";
import { BitsRatesEnum, BoardStatusEnum, BoardTechnologyEnum, Port } from "../../../../interface";
import { CreateBoardDTO } from "./create-board.dto";

export class UpdateBoardDTO {
    constructor(
        public readonly boardName: string,
        public readonly partNumber: string,
        public readonly vendor: string,
        public readonly signals?: string[],
        public readonly description?: string,
        public readonly observations?: string,
        public readonly ports?: Port[],
        public readonly slotSize?: number,
        public readonly technology?: BoardTechnologyEnum,
        public readonly status?: BoardStatusEnum,
    ) {}

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
        if ( ports === '' && !Array.isArray( ports ) ) throw ['Ports must be Array'];
        if ( ports && ports.lenght > 0 ) {
            ports.forEach(( port: Port ) => {
                if( !port.port && typeof port.port !== 'number' ) throw ['PortNumber is Required and must be a Number'];
                if( !port.physical && typeof port.physical !== 'string' ) throw ['PortPhysical is Required and must be a String'];
                if( !port.NMS && typeof port.NMS !== 'string' ) throw ['PortNMS is Required and must be a String'];
                //todo: REVISAR QUE NO SE REPITAN LAS FACILIDADES LOGICAS Y CANTIDADES
            });
        };

        return [
            undefined,
            new CreateBoardDTO(
                boardName,
                partNumber,
                vendor,
                signals,
                description,
                observations,
                ports,
                slotSize,
                technology,
                status,
            )
        ]
    }
}