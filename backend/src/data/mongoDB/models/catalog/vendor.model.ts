import mongoose from 'mongoose'
import { validateObjectId } from '../../helpers/pre.helpers';

const vendorSchema = new mongoose.Schema(
    {
        vendorName: {
            type: String,
            require: [true, 'vendorName is required!'],
            trim: true,
            uppercase: true
        },
        country: {
            type: String,
            trim: true,
            default: '',
        },
        observation: {
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true
    }
)

// // Middleware para validar ObjectId en consultas
// vendorSchema.pre('find', function (next) {
//     validateObjectId(this.getQuery(), next);
// });

// vendorSchema.pre('findOne', function (next) {
//     console.log(this.getQuery());
//     validateObjectId(this.getQuery(), next);
// });

export const VendorModel = mongoose.model('Vendor', vendorSchema)

