import { Document, Model, Schema, model } from 'mongoose'

interface VendorDocument extends Document {
    vendorName: string;
    country: string; 
    observation: string;
    isDeleted: boolean;
}

const vendorSchema = new Schema<VendorDocument>({
        vendorName: {
            type: String,
            require: [true, 'vendorName is required!'],
            trim: true,
            uppercase: true,
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
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

export const VendorModel: Model<VendorDocument> = model('Vendor', vendorSchema)