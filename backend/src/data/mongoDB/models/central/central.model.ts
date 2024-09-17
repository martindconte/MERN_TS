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
        provinceName: {
            type: String,
            trim: true,
            uppercase: true,
            default: '',
        },
        districtName: {
            type: String,
            trim: true,
            uppercase: true,
            default: '',
        },
        localityName: {
            type: String,
            trim: true,
            uppercase: true,
            default: '',
        },
        address: {
            type: String,
            trim: true,
            default: '',
        },
        latitude: {
            type: Number,
            trim: true,
            default: 0,
        },
        longitude: {
            type: Number,
            trim: true,
            default: 0,
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