import mongoose from 'mongoose';

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDB {
    
    
    static async connect( options: Options ) {
        // mongoose.set('strictQuery', true)
        // mongoose.set('debug', true)
        // mongoose.set('debug', function (collectionName, method, query) {
        //     console.log(`Consulting ${collectionName}.${method}:`, JSON.stringify(query));
        // });

        const { mongoUrl, dbName } = options

        try {
            
            await mongoose.connect( mongoUrl, { dbName } );

        } catch (error) {
            console.log('Mongo Connection Error!');
            throw error
        }
    }
}