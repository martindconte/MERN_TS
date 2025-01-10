import { Document, Model, Schema, Types } from 'mongoose';
import { BitsRatesEnum, ITransceiver, RoadmapEnum, TechnologyEnum } from '../../../../interface';
import { model } from 'mongoose';

interface TransceiverDocument extends Omit<ITransceiver, 'vendor' | 'id'> {
  vendor: Types.ObjectId;
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
      enum: Object.values(TechnologyEnum),
    },
    bitsRates: [
      {
        type: String,
        enum: BitsRatesEnum,
        default: [],
      },
    ],
    roadmap: {
      type: String,
      default: RoadmapEnum.NA,
      enum: Object.values(RoadmapEnum),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id?.toString(); // Convierte _id a string y crea un campo id legible
        // delete ret._id; // Elimina el campo _id original
        delete ret.__v; // Opcional: elimina __v si no lo necesitas
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id?.toString();
        // delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const TransceiverModel: Model<TransceiverDocument> = model('Transceiver', transceiverSchema);
