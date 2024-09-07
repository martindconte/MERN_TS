import mongoose from "mongoose";

export function validateObjectId(query: any, next: (err?: any) => void) {
    if (query._id && !mongoose.Types.ObjectId.isValid(query._id)) {
        return next('Invalid ID');
    }
    next();
}