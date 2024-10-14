import { isValidObjectId, Types } from 'mongoose';

export class helpersDB {

    static isMongoID( id: string ) {
        return isValidObjectId( id )
    }

    static toObjectId ( id: string ) {
        return new Types.ObjectId( id )
    }
}