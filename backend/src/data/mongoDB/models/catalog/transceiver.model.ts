import { Document, Model, Schema, Types } from 'mongoose'
import { BitsRatesEnum, RoadmapEnum, TechnologyEnum } from '../../../../interface';
import { model } from 'mongoose';

interface TransceiverDocument extends Document {
    partNumber: string;
    vendor: Types.ObjectId;
    type?: string;
    modelName?: string;
    description?: string;
    observations?: string;
    technology?: TechnologyEnum;
    bitsRates?: BitsRatesEnum[];
    roadmap?: RoadmapEnum;
    isDeleted: boolean;
}

const transceiverSchema = new Schema<TransceiverDocument>(
    {
        partNumber: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            uppercase: true,
        },
        type: {
            type: String,
            trim: true,
            uppercase: true,
        },
        modelName: {
            type: String,
            trim: true,
            uppercase: true,
        },
        description: {
            type: String,
            trim: true,
        },
        vendor: {
            type: Schema.Types.ObjectId,
            require: [true, 'Vendor is required!'],
            ref: 'Vendor',
            default: '',
        },
        observations: {
            type: String,
            trim: true,
        },
        technology: {
            type: String,
            trim: true,
            default: TechnologyEnum.dwdm,
            uppercase: true,
            enum: Object.values( TechnologyEnum )
        },
        bitsRates: [{
            type: String,
            enum: BitsRatesEnum,
            default: [],
        }],
        roadmap: {
            type: String,
            default: RoadmapEnum.NA,
            enum: Object.values( RoadmapEnum )
        },
        isDeleted: {
            type: Boolean,
            default: false
        },        
    },
    {
        timestamps: true
    }
);

transceiverSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        //! revisar si es necesario el ret.id = ret._id
        ret.id = ret._id
        delete ret._id;
        return ret;
    },
})

export const TransceiverModel: Model<TransceiverDocument> = model('Transceiver', transceiverSchema);