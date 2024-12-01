import { model, Schema, Document, Types, Model } from 'mongoose';
import { BitsRatesEnum, BoardPortType, RoadmapEnum, TechnologyEnum } from '../../../../interface';

export interface Port {
  port: number;
  type: BoardPortType;
  physical: string;
  NMS: string;
  equipments: Types.ObjectId[];
  logicalFacilities?: Record<string, string[]>;
  fullName?: string;
}

export interface BoardDocument extends Document {
  boardName: string;
  partNumber: string;
  vendor: Types.ObjectId;
  bitsRates: BitsRatesEnum[];
  description?: string;
  observations?: string;
  ports?: Port[];
  bandwidthMax?: number;
  slotSize?: number;
  technology?: TechnologyEnum;
  isDeleted: boolean;
  roadmap?: RoadmapEnum;
}

const portSchema = new Schema<Port>(
  {
    port: {
      type: Number,
      required: [true, 'Port is required!'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Port type is required!'],
      trim: true,
      uppercase: true,
      enum: ['LINE', 'CLIENT', 'ANY'],
    },
    physical: {
      type: String,
      required: [true, 'Port Physical is required!'],
      trim: true,
      uppercase: true,
    },
    NMS: {
      type: String,
      required: [true, 'NMS is required!'],
      trim: true,
      uppercase: true,
    },
    equipments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transceiver',
      },
    ],

    logicalFacilities: {
      type: Object,
      default: {},
    },

    // todo: DEJAR DE USAR MAP!!!!
    // logicalFacilities: {
    //   type: Map,
    //   of: [String],
    //   default: {},
    // },
    fullName: {
      type: String,
      trim: true,
      uppercase: true,
    },
  },
  { _id: false } // Evita que Mongoose genere automáticamente el campo _id
);

const boardSchema = new Schema<BoardDocument>(
  {
    boardName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      uppercase: true,
    },
    partNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      uppercase: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      required: [true, 'Vendor is required!'],
      ref: 'Vendor',
      default: '',
    },
    bitsRates: {
      type: [
        {
          type: String,
          enum: Object.values(BitsRatesEnum),
        },
      ],
      default: [], // Establece un array vacío como valor predeterminado
    },
    description: {
      type: String,
      trim: true,
    },
    observations: {
      type: String,
      trim: true,
    },
    ports: [portSchema],
    slotSize: {
      type: Number,
      trim: true,
      default: 1,
    },
    bandwidthMax: {
      type: Number,
      trim: true,
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

boardSchema.pre('validate', function (next) {
  this.ports?.forEach((port) => {
    if (!port.fullName) {
      port.fullName = `${port.NMS}(${port.physical})`;
    }
  });
  next();
});

// boardSchema.pre('save', async function (next) {
//   await this.populate({
//     path: 'ports.equipments',
//     select: 'partNumber modelName vendor description bitsRates',
//     populate: {
//       path: 'vendor',
//       select: 'vendorName _id', // Populación anidada
//     },
//   });
//   next();
// });

export const BoardModel: Model<BoardDocument> = model('Board', boardSchema);
