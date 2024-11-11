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
            // unique: true,
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
        timestamps: true
    }
);

vendorSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id
    },
});

export const VendorModel: Model<VendorDocument> = model('Vendor', vendorSchema)