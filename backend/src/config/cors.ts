import { CorsOptions } from 'cors'
import { envs } from './envs'

export const corsConfig: CorsOptions = {
    origin: function( origin, callback ) {
        const whiteList = [ envs.FRONTEND_URL, envs.BACKEND_URL ]
        if (!origin) {
            callback(new Error('No CORS origin provided'), false);
        } else if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error CORS: Origin not allowed'), false);
        }
    }
}