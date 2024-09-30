import { IBandwidth, UnitProps } from '../../../../interface'

export class UpdateSignalDTO {

    private constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly subType: string,
        public readonly bandwidth: [IBandwidth],
        public readonly observation?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    static create( signal: { [key: string]: any } ): [ string?, UpdateSignalDTO?] {

        const { type, subType, bandwidth, observation, createdAt, updatedAt } = signal

        if( !type ) throw ['Missinbg Type'];
        if( !subType ) throw ['Missinbg SubType'];
        if( bandwidth.length < 1 ) throw ['Missinbg Bandwidth Data'];
        bandwidth.forEach((bw: any) => {
            if (typeof bw.amount !== 'number') throw ['Invalid amount in Bandwidth'];
            if (!Object.values(UnitProps).includes(bw.unit)) throw [`Invalid unit in Bandwidth: ${bw.unit}`];
        });
        if( createdAt ) {
            const date = new Date( createdAt )
            if( date.toString() === 'Invalid Date' ) return ['createdAt must be a valid Date'] 
        };
        if( updatedAt ) {
            const date = new Date( updatedAt )
            if( date.toString() === 'Invalid Date' ) return ['updatedAt must be a valid Date'] 
        };

        return [ undefined, new UpdateSignalDTO( type, subType, bandwidth, observation )]
    }
}