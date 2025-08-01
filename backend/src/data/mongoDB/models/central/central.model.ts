import { Schema, Document, Model, model } from 'mongoose';
import { validateObjectId } from '../../helpers/pre.helpers';
import { CentralOwnerEnum, ICentral } from '../../../../interface';

interface CentralDocument extends Document, Omit<ICentral, 'id'> {}

const centralSchema = new Schema<CentralDocument>(
  {
    centralName: {
      type: String,
      required: [true, 'Central Name is required'],
      trim: true,
      uppercase: true,
    },
    codeName: {
      type: String,
      required: [true, 'Code Name is required'],
      trim: true,
      unique: true,
      uppercase: true,
    },
    siteCode: {
      type: String,
      required: [true, 'Site Code is required'],
      trim: true,
      unique: true,
      uppercase: true,
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
      default: '',
    },
    owner: {
      type: String,
      require: [true, 'Owner is required!'],
      trim: true,
      default: CentralOwnerEnum.tasa,
    },
    observations: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: Boolean,
      default: true,
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

// // Middleware para validar ObjectId en consultas
// centralSchema.pre('find', function (next) {
//   validateObjectId(this.getQuery(), next);
// });

// centralSchema.pre('findOne', function (next) {
//   validateObjectId(this.getQuery(), next);
// });

export const CentralModel: Model<CentralDocument> = model('Central', centralSchema);
// export const CentralModel = model<CentralDocument>('Central', centralSchema);