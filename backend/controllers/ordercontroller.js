import { orderModel } from '../models/ordermodel.js'
import { cartModel } from '../models/cartmodel.js'
import { userModel } from '../models/usermodel.js'

export const placeOrder = async (req, res) => {
    try {

        // Step 1 - find cart
        const cart = await cartModel
            .findOne({ user: req.user.userId })
            .populate('items.meal')

        // Step 2 - check cart exists and has items
        if(!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' })
        }

        // Step 3 - get address and payment from request
        const { deliveryAddress, paymentMethod } = req.body

        // Step 4 - build order items array
        const orderItems = cart.items.map(item => ({
            meal: item.meal._id,
            quantity: item.quantity,
            priceAtOrder: item.meal.price
        }))

        // Step 5 - calculate total price
        const totalPrice = cart.items.reduce((total, item) => {
            return total + (item.meal.price * item.quantity)
        }, 0)

        // Step 6 - create order
        const order = await orderModel.create({
            user: req.user.userId,
            items: orderItems,
            totalPrice: totalPrice,
            deliveryAddress: deliveryAddress || {},
            paymentMethod: paymentMethod || 'cash_on_delivery'
        })

        // Step 7 - clear cart after order placed
        await cartModel.findOneAndDelete({ user: req.user.userId })

        res.status(201).json({
            message: 'Order placed successfully',
            order
        })

    } catch(error) {
        console.log('Place order error:', error)
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}
export const getMyOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user.userId })
            .populate('items.meal')
            .sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate('user', 'name email phoneNo')
            .populate('items.meal')
            .populate('deliveryAgent', 'name phoneNo')
            .sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, deliveryAgent } = req.body
        const order = await orderModel.findByIdAndUpdate(
            req.params.id,
            { orderStatus, deliveryAgent },
            { new: true }
        )
        res.status(200).json({ message: 'Order updated', order })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const getAgentOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ deliveryAgent: req.user.userId })
            .populate('user', 'name phoneNo address')
            .populate('items.meal')
            .sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch(error) {
           console.error('PLACE ORDER ERROR:', error) 
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}