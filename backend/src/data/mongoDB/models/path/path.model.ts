import mongoose from 'mongoose';

const pathSchema = new mongoose.Schema({
    pathName: {
        type: String,
        require: [true, 'PathName is required'],
        trim: true,
        uppercase: true,
    },
},
    {
        timestamps: true,
    }
)

export const PathModel = mongoose.model('Path', pathSchema)