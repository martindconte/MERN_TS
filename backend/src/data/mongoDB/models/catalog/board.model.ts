import {model, Schema, Document, Types } from 'mongoose'
import { BoardPortType, BoardStatusEnum, BoardTechnologyEnum } from '../../../../interface';

export interface Port {
    port: number;
    type: BoardPortType;
    physical: string;
    NMS: string;
    equipment: Types.ObjectId[];
    logicalFacilities?: Record<string, string[]>,
    fullName?: string;
};

export interface BoardDocument extends Document {
    boardName: string;
    partNumber: string;
    vendor: Types.ObjectId;
    signals: Types.ObjectId[];
    description?: string;
    observations?: string;
    ports?: Port[];
    slotSize?: number;
    technology?: BoardTechnologyEnum;
    status?: BoardStatusEnum;
    createdAt: Date;
    updatedAt: Date;
}

const boardSchema = new Schema<BoardDocument>(
    {
        boardName: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            uppercase: true,
        },
        partNumber: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            uppercase: true,
        },
        vendor: {
            type: Schema.Types.ObjectId,
            require: [true, 'Vendor is required!'],
            ref: 'Vendor',
            default: '',
        },
        signals: {
            type: [Schema.Types.ObjectId],
            ref: 'Signal',
            default: null,
        },
        description: {
            type: String,
            trim: true,
        },
        observations: {
            type: String,
            trim: true,
        },
        ports: [{
            port: {
                type: Number,
                require: [ true, 'Port is required!' ],
                trim: true,
            },
            type: {
                type: String,
                require: [ true, 'Port is required!' ],
                trim: true,
                uppercase: true,
                enum: [ 'LINE', 'CLIENT', 'ANY' ]
            },
            physical: {
                type: String,
                require: [ true, 'Port Physical is required!' ],
                trim: true,
                uppercase: true,
            },
            NMS: {
                type: String,
                require: [ true, 'Port Physical is required!' ],
                trim: true,
                uppercase: true,
            },
            equipment: [{
                type: [Schema.Types.ObjectId],
                ref: 'Transceiver',
            }],
            logicalFacilities: {
                type: Map, // Mapa para instalaciones lógicas
                of: [ String ], // Clave de tipo String[], valor de tipo Array
                default: {}, // Inicializa como objeto vacío
            },
            // logicalFacilities: {
            //     type: Map,
            //     of: new Schema({
            //         logicalPort: {
            //             type: String,
            //             trim: true,
            //             uppercase: true,
            //         },
            //         pathName: {
            //             type: Schema.Types.ObjectId,
            //             ref: 'Path',
            //             trim: true,
            //             uppercase: true,
            //         }
            //     }, { _id: false }),
            //     default: {},
            // },
            fullName: {
                type: String,
                trim: true,
                uppercase: true,
            },
            default: []
        }],
        slotSize: {
            type: Number,
            trim: true,
            default: 1,
        },
        technology: {
            type: String,
            trim: true,
            default: 'DWDM',
            enum: BoardTechnologyEnum,
            uppercase: true,
        },
        status: {
            type: String,
            trim: true,
            default: '',
            enum: BoardStatusEnum,
        },
    },
    {
        timestamps: true,
    }
);

boardSchema.pre('validate', function (next) {
    this.ports?.forEach(port => {
        if (!port.fullName) {
            port.fullName = `${port.NMS}(${port.physical})`;
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
})

export const BoardModel = model('Board', boardSchema)