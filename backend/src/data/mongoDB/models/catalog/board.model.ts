import { model, Schema, Document, Types, Model } from 'mongoose';
import { BitsRatesEnum, BoardPortType, RoadmapEnum, TechnologyEnum } from '../../../../interface';

export interface Port {
  port: number;
  type: BoardPortType;
  physical: string;
  NMS: string;
  equipments: Types.ObjectId[];
  // logicalFacilities?: {[key: string]: string[] }
  logicalFacilities?: Record<string, string[]>;
  fullName?: string;
}

export interface BoardDocument extends Document {
  // _id: Types.ObjectId,
  boardName: string;
  partNumber: string;
  vendor: Types.ObjectId;
  bitsRates: BitsRatesEnum[];
  // signals: Types.ObjectId[];
  description?: string;
  observations?: string;
  ports?: Port[];
  bandwidthMax?: number;
  slotSize?: number;
  technology?: TechnologyEnum;
  isDeleted: boolean
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

    // todo: DEJAR DE USAR MAP!!!!
    logicalFacilities: {
      type: Map,
      of: [String],
      default: {},
    },
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
      type: [{
        type: String,
        enum: Object.values(BitsRatesEnum),
      }],
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
      default: false
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// boardSchema.virtual('id').get(function (this: Document & { _id: any }) {
//   return this._id.toString();
// });

boardSchema.pre('validate', function (next) {
  this.ports?.forEach((port) => {
    if (!port.fullName) {
      port.fullName = `${port.NMS}(${port.physical})`;
    }
  });
  next();
});

boardSchema.pre('save', async function (next) {
  await this.populate({
    path: 'ports.equipments',
    select: 'partNumber modelName vendor description bitsRates',
    populate: {
      path: 'vendor',
      select: 'vendorName _id' // Populación anidada
    }
  });
  next();
});

// boardSchema.set('toJSON', {
//   virtuals: true,
//   transform: function (doc, ret, options) {
//     ret.vendor.id = ret.vendor._id.toString(); // Agregamos la propiedad id
//     delete ret._id; // Opcional: Eliminamos el _id del objeto board
//     return ret;
//   },
// });

// boardSchema.pre<Query<BoardDocument, BoardDocument>>(/^find/, function (next) {
//   this.populate({
//     path: 'ports.equipments',
//     select: 'partNumber modelName vendor description bitsRates',
//     populate: {
//       path: 'vendor',
//       select: 'vendorName _id',
//       model: 'Vendor',
//       options: { lean: true }, // Aseguramos que se devuelva un objeto plano
//     }
//   })
//   .populate({
//     path: 'vendor', // Este es el campo vendor del BoardDocument
//     select: 'vendorName _id', // Solo el campo vendorName
//     model: 'Vendor',
//     options: { lean: true }, // Devolver como objeto plano
//   });

//   next();
// });

// boardSchema.set('toJSON', {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret, options) {
//     // Eliminar _id de vendor, si existe
//     if (ret.vendor) {
//       ret.vendor.id = ret.vendor._id;
//       delete ret.vendor._id;
//     }

//     // Eliminar _id del objeto board
//     ret.id = ret._id;
//     delete ret._id;

//     return ret;
//   }
// });

// boardSchema.set('toObject', { virtuals: true });
// boardSchema.set('toJSON', { virtuals: true });

export const BoardModel: Model<BoardDocument> = model('Board', boardSchema);

