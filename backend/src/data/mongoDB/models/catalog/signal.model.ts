import mongoose from 'mongoose';

const signalSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, 'Type is required!'],
            trim: true,
            uppercase: true
        },
        subType: {
            type: String,
            required: [true, 'SubType is required!'],
            trim: true,
            uppercase: true,
        },
        bandwidth: [{
            amount: {
                type: Number,
                required: [true, 'Amount is required!'],
                trim: true,
            },
            unit: {
                type: String,
                required: [true, 'Unit is required!'],
                enum: ['MB', 'GB', 'TB'],
                trim: true,
                uppercase: true
            }
    }],
        observation: {
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true
    }
);

export const SignalkModel = mongoose.model('signal', signalSchema)