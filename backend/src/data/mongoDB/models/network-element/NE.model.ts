import { Document, model, Model, Schema, Types } from "mongoose";
import { INetworkElement, OwnerEnum, SettingNEEnum } from "../../../../interface";

interface NetworkElementDocument extends Omit<INetworkElement, 'id'> {}

const networkElementSchema = new Schema<NetworkElementDocument>({
    centralName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    neName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        unique: true,
    },
    setting: {
        type: String,
        enum: Object.values(SettingNEEnum),
        default: SettingNEEnum.sd,
        trim: true,
    },
    neIp: {
        type: String,
        default: '000.000.000.000',
        trim: true,
    },
    dbTx: {
        type: String,
        default: `/${new Date().getFullYear()}`,
        trim: true,
    },
    remarks: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    owner: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        enum: Object.values(OwnerEnum),
    },
    observations: {
        type: String,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    subracks: [{
        default: [Types.ObjectId],
        ref: 'Subrack',
    }]
}, {
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

export const NEModel: Model<NetworkElementDocument> = model('networkElement', networkElementSchema);
