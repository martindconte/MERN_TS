import { Schema, Document, Model, model } from 'mongoose';
import { validateObjectId } from '../../helpers/pre.helpers';
import { CentralOwnerEnum } from '../../../../interface';

interface CentralDocument extends Document {
    centralName: string;
    codeName: string;
    siteCode: string;
    provinceName: string;
    districtName: string;
    localityName: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
    owner: CentralOwnerEnum;
    observations: string;
    status: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const centralSchema = new Schema<CentralDocument>(
    {
        centralName: {
            type: String,
            require: [true, 'Central Name is required'],
            trim: true,
            uppercase: true,
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
            require: [true, 'Owner is required!'],
            trim: true,
            default: CentralOwnerEnum.tasa
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
        isDeleted: {
            type: Boolean,
            default: false,
        }
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

export const CentralModel: Model<CentralDocument> = model('Central', centralSchema)