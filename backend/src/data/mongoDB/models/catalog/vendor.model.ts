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
            uppercase: true,
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

export const VendorModel = mongoose.model('Vendor', vendorSchema)
