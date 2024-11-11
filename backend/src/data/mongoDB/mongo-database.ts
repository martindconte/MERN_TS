import mongoose from 'mongoose';

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDB {
    static async connect( options: Options ) {
        const { mongoUrl, dbName } = options

        try {
            
            await mongoose.connect( mongoUrl, { dbName } );

        } catch (error) {
            console.log('Mongo Connection Error!');
            throw error
        }
    }
}