import { model, Schema, Document, Types } from 'mongoose';
import { BitsRatesEnum, BoardPortType, BoardStatusEnum, BoardTechnologyEnum } from '../../../../interface';
import { Query } from 'mongoose';

export interface Port {
  port: number;
  type: BoardPortType;
  physical: string;
  NMS: string;
  equipment: Types.ObjectId[];
  logicalFacilities?: Record<string, string[]>;
  fullName?: string;
}

export interface BoardDocument extends Document {
  boardName: string;
  partNumber: string;
  vendor: Types.ObjectId;
  signals: BitsRatesEnum[];
  // signals: Types.ObjectId[];
  description?: string;
  observations?: string;
  ports?: Port[];
  bandwidthMax?: number;
  slotSize?: number;
  technology?: BoardTechnologyEnum;
  status?: BoardStatusEnum;
  createdAt: Date;
  updatedAt: Date;
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
    equipment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transceiver',
      },
    ],
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
    signals: [{
        type: String,
        enum: Object.values( BitsRatesEnum ),
      }],
    description: {
      type: String,
      trim: true,
    },
    observations: {
      type: String,
      trim: true,
    },
    ports: [ portSchema ],
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
      default: BoardTechnologyEnum.dwdm,
      enum: Object.values(BoardTechnologyEnum),
      uppercase: true,
    },
    status: {
      type: String,
      trim: true,
      default: BoardStatusEnum.NA,
      enum: Object.values(BoardStatusEnum),
    },
  },
  {
    timestamps: true,
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

boardSchema.pre<Query<BoardDocument, BoardDocument>>(/^find/, function (next) {
  this.populate({
    path: 'ports.equipment',
    populate: {
      path: 'vendor',
      select: 'vendorName' // Selecciona solo el campo vendorName
    }
  });
  next();
});

boardSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const BoardModel = model('Board', boardSchema);


// import {model, Schema, Document, Types } from 'mongoose'
// import { BoardPortType, BoardStatusEnum, BoardTechnologyEnum } from '../../../../interface';

// interface Port {
//     port: number;
//     type: BoardPortType;
//     physical: string;
//     NMS: string;
//     equipment: Types.ObjectId[];
//     logicalFacilities?: Record<string, string[]>,
//     fullName?: string;
// };

// export interface BoardDocument extends Document {
//     boardName: string;
//     partNumber: string;
//     vendor: Types.ObjectId;
//     signals: Types.ObjectId[];
//     description?: string;
//     observations?: string;
//     ports?: Port[];
//     slotSize?: number;
//     technology?: BoardTechnologyEnum;
//     status?: BoardStatusEnum;
//     createdAt: Date;
//     updatedAt: Date;
// }

// const boardSchema = new Schema<BoardDocument>(
//     {
//         boardName: {
//             type: String,
//             unique: true,
//             require: true,
//             trim: true,
//             uppercase: true,
//         },
//         partNumber: {
//             type: String,
//             unique: true,
//             require: true,
//             trim: true,
//             uppercase: true,
//         },
//         vendor: {
//             type: Schema.Types.ObjectId,
//             require: [true, 'Vendor is required!'],
//             ref: 'Vendor',
//             default: '',
//         },
//         signals: [{
//             type: Schema.Types.ObjectId,
//             ref: 'Signal',
//         }],
//         description: {
//             type: String,
//             trim: true,
//         },
//         observations: {
//             type: String,
//             trim: true,
//         },
//         ports: [{
//             port: {
//                 type: Number,
//                 require: [ true, 'Port is required!' ],
//                 trim: true,
//             },
//             type: {
//                 type: String,
//                 require: [ true, 'Port is required!' ],
//                 trim: true,
//                 uppercase: true,
//                 enum: [ 'LINE', 'CLIENT', 'ANY' ]
//             },
//             physical: {
//                 type: String,
//                 require: [ true, 'Port Physical is required!' ],
//                 trim: true,
//                 uppercase: true,
//             },
//             NMS: {
//                 type: String,
//                 require: [ true, 'Port Physical is required!' ],
//                 trim: true,
//                 uppercase: true,
//             },
//             equipment: [{
//                 type: Schema.Types.ObjectId,
//                 ref: 'Transceiver',
//             }],
//             logicalFacilities: {
//                 type: Map, // Mapa para instalaciones lógicas
//                 of: [ String ], // Clave de tipo String[], valor de tipo Array
//                 default: {}, // Inicializa como objeto vacío
//             },
//             fullName: {
//                 type: String,
//                 trim: true,
//                 uppercase: true,
//             },
//         }],
//         slotSize: {
//             type: Number,
//             trim: true,
//             default: 1,
//         },
//         technology: {
//             type: String,
//             trim: true,
//             default: 'DWDM',
//             enum: BoardTechnologyEnum,
//             uppercase: true,
//         },
//         status: {
//             type: String,
//             trim: true,
//             default: '',
//             enum: BoardStatusEnum,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// boardSchema.pre('validate', function (next) {
//     this.ports?.forEach(port => {
//         if (!port.fullName) {
//             port.fullName = `${port.NMS}(${port.physical})`;
//         }
//     });
//     next();
// });

// boardSchema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret, options) {
//         delete ret._id;
//     },
// })

// export const BoardModel = model('Board', boardSchema)