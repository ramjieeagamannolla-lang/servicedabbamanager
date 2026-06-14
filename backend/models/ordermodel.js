import { Schema, model } from 'mongoose'

const orderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            meal: {
                type: Schema.Types.ObjectId,
                ref: 'Meal',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            priceAtOrder: {
                type: Number,
                required: true
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    deliveryAddress: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        pincode: { type: Number, default: 0 }
    },

    orderStatus: {
        type: String,
        enum: [
            'pending',
            'confirmed',
            'preparing',
            'out_for_delivery',
            'delivered',
            'cancelled'
        ],
        default: 'pending'
    },

    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'refunded'],
        default: 'unpaid'
    },

    paymentMethod: {
        type: String,
        enum: ['cash_on_delivery', 'online'],
        default: 'cash_on_delivery'
    },

    deliveryAgent: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    deliveredAt: {
        type: Date,
        default: null
    }

}, { timestamps: true })

export const orderModel = model('Order', orderSchema)