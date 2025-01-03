import express, { Router } from 'express';
import { corsConfig } from '../config/cors';
import morgan from 'morgan'
import cors from 'cors'

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ) {
        const { port, routes, public_path = ' public' } = options
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //* Middleware
        this.app.use( express.json() ) // raw
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
        
        //* Cors
        this.app.use( cors(corsConfig) )

        //* Public Folder
        this.app.use( express.static( this.publicPath ) );

        this.app.use( morgan('dev') )

        //* Routes
        this.app.use( this.routes )

        this.app.listen( this.port , () => console.log('\x1b[31m%s\x1b[0m', `Listening app port ${ this.port } \n***********************************************************************************************************************************************************`));

    }

}