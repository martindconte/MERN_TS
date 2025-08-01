import { Document, Schema } from 'mongoose';
import { BoardPortType, NETypeEnum, OwnerEnum, PathType, SettingNEEnum } from '../../../../interface';
import { model } from 'mongoose';

//? NE --> Subracks --> Boards --> Ports --> Paths

//* interfaces *//
interface INEPathDocument extends Document {
  id?: Schema.Types.ObjectId; // ObjectId de Paths en MongoDB
  plannerId?: string; // id planificacion
  IUId?: string; // id de IU
  pathName?: string;
  datoBasico?: string;
  type?: PathType;
  client?: string;
  available?: boolean;
  observation?: string;
}
interface INEPortDocument extends Document {
  port: number;
  physical: string;
  NMS: string;
  type: BoardPortType;
  fullName: string;
  equipment?: Schema.Types.ObjectId;
  logicalFacilities?: Record<string, any>;
  path: INEPathDocument;
}

interface INEBoardDocument extends Document {
  id: Schema.Types.ObjectId;
  ports: INEPortDocument[];
}

interface INESlotDocument extends Document {
  number: number;
  physical: string;
  logical: string;
  board?: INEBoardDocument;
}

interface INESubrackDocument extends Document {
  id: Schema.Types.ObjectId; // Subrack ID de mongoDB
  position: string;
  shelfName: string;
  shelfNumber: number;
  slots: INESlotDocument[];
}

interface INetworkElementDocument extends Document {
  central: Schema.Types.ObjectId; // Central ID de mongoDB
  neName: string; // Nombre del NE
  vendor: Schema.Types.ObjectId; // Vendor ID de mongoDB
  type: NETypeEnum; // Tipo de NE
  setting: SettingNEEnum; // Configuración del NE
  owner: OwnerEnum; // Propietario del NE
  isDeleted: boolean; // Indica si el NE está eliminado
  subracks: INESubrackDocument[]; // Subracks del NE
  neIp?: string; // IP del NE
  dbTx?: string; // Dato Basico | Proyecto
  remarks?: string;
  observations?: string;
}

//* schemas *//
const NEPathSchema = new Schema<INEPathDocument>(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Paths',
    },
    plannerId: {
      type: String,
      trim: true,
    },
    IUId: {
      type: String,
      trim: true,
    },
    pathName: {
      type: String,
      trim: true,
    },
    datoBasico: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(PathType),
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    observation: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false, // No crear un _id para este subdocumento
  }
);

const NEPortSchema = new Schema<INEPortDocument>(
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
      enum: Object.values(BoardPortType),
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
    equipment: {
      type: Schema.Types.ObjectId,
      ref: 'Transceiver',
    },
    logicalFacilities: {
      type: Object,
    },
    fullName: {
      type: String,
      trim: true,
      uppercase: true,
    },
    path: {
      type: NEPathSchema,
    },
  },
  { _id: false } // Evita que Mongoose genere automáticamente el campo _id
);

const NEBoardSchema = new Schema<INEBoardDocument>(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Boards',
    },
    ports: [
      {
        type: NEPortSchema,
      },
    ],
  },
  { _id: false } // Evita que Mongoose genere automáticamente el campo _id
);

const NESlotSchema = new Schema<INESlotDocument>(
  {
    number: {
      type: Number,
      required: [true, 'Slot number is required!'],
    },
    physical: {
      type: String,
      required: [true, 'Slot physical is required!'],
    },
    logical: {
      type: String,
      required: [true, 'Slot logical is required!'],
    },
    board: {
      type: NEBoardSchema,
    },
  },
  { _id: false } // Evita que Mongoose genere automáticamente el campo _id
);

const NESubrackSchema = new Schema<INESubrackDocument>(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Subrack',
    },
    position: {
      type: String,
      trim: true,
      required: [true, 'Position is required!'],
    },
    shelfName: {
      type: String,
      trim: true,
      required: [true, 'Shelf name is required!'],
    },
    shelfNumber: {
      type: Number,
      required: [true, 'Shelf number is required!'],
      min: [0, 'Shelf number must be at least 0'],
    },
    slots: [
      {
        type: NESlotSchema,
      },
    ],
  },
  { _id: false } // Evita que Mongoose genere automáticamente el campo _id
);

const NetworkElementSchema = new Schema<INetworkElementDocument>(
  {
    central: {
      type: Schema.Types.ObjectId,
      ref: 'Central',
      required: [true, 'Central is required!'],
    },
    neName: {
      type: String,
      required: [true, 'NE name is required!'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: [true, 'Vendor is required!'],
    },
    type: {
      type: String,
      required: [true, 'NE type is required!'],
      trim: true,
      uppercase: true,
      enum: Object.values(NETypeEnum),
    },
    setting: {
      type: String,
      enum: Object.values(SettingNEEnum),
      default: SettingNEEnum.sd,
      trim: true,
    },
    neIp: {
      type: String,
      default: '0.0.0.0',
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
    owner: {
      type: String,
      required: [true, 'Owner is required!'],
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
    subracks: {
      type: [NESubrackSchema],
      default: [],
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

export const NetworkElementModel = model<INetworkElementDocument>('NetworkElement', NetworkElementSchema);