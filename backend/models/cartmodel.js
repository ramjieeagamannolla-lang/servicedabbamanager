import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            meal: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
            quantity: { type: Number, required: true, default: 1, min: 1 }
        }
    ],
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true })

export const cartModel = model('Cart', cartSchema)