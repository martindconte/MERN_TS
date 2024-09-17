import mongoose from "mongoose";

//TODO: Revisar la necesidad de _id en SLOTS
const subrackSchema = new mongoose.Schema(
    {
        subrackType: {
            type: String,
            require: true,
            trim: true
        },
        subrackFamily: {
            type: String,
            require: true,
            trim: true
        },
        partNumber: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            default: ''
        },
        model: {
            type: String,
            trim: true,
            unique: true,
            uppercase: true,
            default: '',
        },
        description: {
            type: String,
            trim: true,
            default: ''
        },
        totalSlot: {
            type: Number,
            require: true,
            trim: true
        },
        slots: [{
            number: { type: Number, require: true },
            physical: { type: String, require: true },
            logical: { type: String, require: true },
            _id: false,
            boardId: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Board',  // Referencia a la colección Board
                required: false  // Opcional en caso de que no siempre haya una board asociada
            }]
        }],
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
            require: true,
        },
        owner: {
            type: String,
            require: true,
            uppercase: true,
            trim: true,
            default: 'TASA'
        },
        observations: {
            type: String,
            trim: true,
            default: ''
        },
        technology: {
            type: String,
            trim: true,
            default: 'DWDM',
            uppercase: true,
            enum: ['DWDM', 'SDH', 'RX', 'CWDM', 'IP', 'GENERICO']
        },
        boards: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Board',
            default: []
          }],
        status: {
            type: String,
            trim: true,
            default: 'InService',
            enum: ['InService', 'EndOfSupport', 'EndOfMarketing']
        }
    },
    {
        timestamps: true
    }
)

export const SubrackModel = mongoose.model('Subrack', subrackSchema)