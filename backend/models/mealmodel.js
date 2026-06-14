import { Schema, model } from 'mongoose'

const mealSchema = new Schema({
    name: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['veg', 'non-veg', 'egg'], required: true },
    mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true })

export const mealModel = model('Meal', mealSchema)