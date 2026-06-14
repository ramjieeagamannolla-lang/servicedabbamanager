import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    userName: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNo: { type: String, required: true },
    role: {
        type: String,
        enum: ['customer', 'delivery_agent', 'admin'],
        default: 'customer'
    },
    isActive: { type: Boolean, default: true },
    profileImage: { type: String, default: '' },
    address: {
        street: { type: String },
        city: { type: String },
        pincode: { type: Number }
    }
}, { timestamps: true })

export const userModel = model('User', userSchema)