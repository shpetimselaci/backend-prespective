import mongoose, { Schema } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

export const User = mongoose.model('User', UserSchema);
