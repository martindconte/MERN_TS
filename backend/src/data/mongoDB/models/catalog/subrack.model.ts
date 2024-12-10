import { Document, model, ObjectId, Schema } from 'mongoose';
import { OwnerEnum, RoadmapEnum, TechnologyEnum } from '../../../../interface';

interface ISlotsDocument {
  number: number;
  physical: string;
  logical: string;
  boards?: ObjectId[];
}

interface SubrackDocument extends Document {
  subrackType: string;
  subrackFamily: string;
  modelName?: string;
  partNumber: string;
  vendor: ObjectId;
  isDeleted: boolean;
  slots?: ISlotsDocument;
  totalSlots?: number;
  description?: string;
  observations?: string;
  owner?: OwnerEnum;
  roadmap?: RoadmapEnum;
  technology?: TechnologyEnum;
}

//TODO: Revisar la necesidad de _id en SLOTS
const subrackSchema = new Schema<SubrackDocument>(
  {
    subrackType: {
      type: String,
      require: [true, 'Subrack Type is required!'],
      trim: true,
    },
    subrackFamily: {
      type: String,
      require: [true, 'Subrack Family is required!'],
      trim: true,
    },
    partNumber: {
      type: String,
      unique: true,
      require: [true, 'Subrack Family is required!'],
      trim: true,
    },
    modelName: {
      type: String,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    totalSlots: {
      type: Number,
      min: 1,
      require: true,
      trim: true,
    },
    slots: [
      {
        number: {
          type: Number,
          require: true,
          min: 1,
        },
        physical: {
          type: String,
          require: true,
        },
        logical: {
          type: String,
          require: true,
        },
        boards: [{
            type: Schema.Types.ObjectId,
            ref: 'Board',
            default: [],
          }],
          _id: false,
      },
    ],
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      require: true,
    },
    owner: {
      type: String,
      uppercase: true,
      trim: true,
      default: 'TASA',
    },
    observations: {
      type: String,
      trim: true,
      default: '',
    },
    technology: {
      type: String,
      trim: true,
      default: TechnologyEnum.dwdm,
      enum: Object.values(TechnologyEnum),
      uppercase: true,
    },
    roadmap: {
      type: String,
      trim: true,
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
        delete ret._id; // Elimina el campo _id original
        delete ret.__v; // Opcional: elimina __v si no lo necesitas
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const SubrackModel = model<SubrackDocument>('Subrack', subrackSchema);
