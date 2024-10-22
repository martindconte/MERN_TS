import mongoose from 'mongoose';

const bandwidthSchema = new mongoose.Schema({
    amount: {
      type: Number,
      trim: true,
      validate: {
        validator: function (value) {
          return this.bandwidth && this.bandwidth.unit !== undefined ? value !== null : true;
        },
        message: 'Amount is required if bandwidth is provided!',
      },
    },
    unit: {
      type: String,
      enum: ['MB', 'GB', 'TB'],
      trim: true,
      uppercase: true,
      validate: {
        validator: function (value) {
          return this.bandwidth && this.bandwidth.amount !== undefined ? value !== null : true;
        },
        message: 'Unit is required if bandwidth is provided!',
      },
    },
  }, { _id: false });

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
        bandwidth: {
            type: bandwidthSchema,
        },
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

signalSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        if (!ret.bandwidth || Object.keys(ret.bandwidth).length === 0) {
            ret.bandwidth = {};
        }
        delete ret._id;
    },
});

export const SignalModel = mongoose.model('Signal', signalSchema);
