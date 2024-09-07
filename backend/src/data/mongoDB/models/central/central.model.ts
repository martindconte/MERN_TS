import mongoose from 'mongoose';
import { validateObjectId } from '../../helpers/pre.helpers';

const centralSchema = new mongoose.Schema(
    {
        centralName: {
            type: String,
            require: [true, 'Central Name is required'],
            trim: true
        },
        codeName: {
            type: String,
            require: [true, 'Code Name is required'],
            trim: true,
            unique: true,
            uppercase: true
        },
        siteCode: {
            type: String,
            require: [true, 'Site Code is required'],
            trim: true,
            unique: true,
            uppercase: true
        },
        province_name: {
            type: String,
            trim: true,
            uppercase: true,
        },
        district_name: {
            type: String,
            trim: true,
            uppercase: true,
        },
        locality_name: {
            type: String,
            trim: true,
            uppercase: true,
        },
        address: {
            type: String,
            trim: true,
        },
        latitude: {
            type: Number,
            trim: true,
        },
        longitude: {
            type: Number,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: ''
        },
        owner: {
            type: String,
            require: true,
            trim: true,
            default: 'TASA',
            enum: ['TASA', 'MVS', 'OTHER']
        },
        observations: {
            type: String,
            trim: true,
            default: ''
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

// Middleware para validar ObjectId en consultas
centralSchema.pre('find', function (next) {
    validateObjectId(this.getQuery(), next);
});

centralSchema.pre('findOne', function (next) {
    validateObjectId(this.getQuery(), next);
});

export const CentralModel = mongoose.model('Central', centralSchema)