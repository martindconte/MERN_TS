import mongoose from 'mongoose'

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
);

vendorSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id
    },
})

export const VendorModel = mongoose.model('Vendor', vendorSchema)
