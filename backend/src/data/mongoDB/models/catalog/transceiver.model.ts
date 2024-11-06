import mongoose from 'mongoose'
import { BitsRatesEnum } from '../../../../interface';

// const BitRatesValues = [
//     "STM-1", "STM-4", "STM-16", "STM-64", "OC-3", "OC-12", "OC-48", "OC-192",
//     "FE", "GE", "10GE WAN", "10GE LAN", "25GE", "40GE", "50GE", "100GE",
//     "200GE", "400GE", "FlexE 100G unaware", "FlexE 200G unaware", "FDDI",
//     "ESCON", "FC100/FICON", "FC200/FICON Express", "FC400/FICON4G", "FC800/FICON8G",
//     "FC1200/FICON10G", "FC1600", "FC3200", "OTU1", "OTU2", "OTU2e", "OTU4",
//     "OCH", "DVB-ASI", "SD-SDI", "HD-SDI", "HD-SDIRBR", "3G-SDI", "3G-SDIRBR"
// ] as const;

const transceiverSchema = new mongoose.Schema(
    {
        partNumber: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            uppercase: true,
        },
        type: {
            type: String,
            trim: true,
            uppercase: true,
        },
        model: {
            type: String,
            trim: true,
            uppercase: true,
        },
        description: {
            type: String,
            trim: true,
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, 'Vendor is required!'],
            ref: 'Vendor',
            default: '',
        },
        observations: {
            type: String,
            trim: true,
        },
        technology: {
            type: String,
            trim: true,
            default: 'DWDM',
            uppercase: true,
            enum: ['DWDM', 'SDH', 'RX', 'CWDM', 'IP', 'GENERIC']
        },
        bitsRates: [{
            type: String,
            enum: BitsRatesEnum,
            default: [],
            trim: true
        }],
        status: {
            type: String,
            trim: true,
            default: '',
            enum: ['InService', 'EndOfSupport', 'EndOfMarketing', '']
        },
    },
    {
        timestamps: true
    }
);

transceiverSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
})

export const TransceiverModel = mongoose.model('Transceiver', transceiverSchema)