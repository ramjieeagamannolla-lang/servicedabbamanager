import { cartModel } from '../models/cartmodel.js'
import { mealModel } from '../models/mealmodel.js'

export const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.userId }).populate('items.meal')
        if(!cart) return res.status(200).json({ items: [], totalPrice: 0 })
        res.status(200).json(cart)
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { mealId, quantity } = req.body
        const meal = await mealModel.findById(mealId)
        if(!meal) return res.status(404).json({ message: 'Meal not found' })

        let cart = await cartModel.findOne({ user: req.user.userId })

        if(!cart) {
            cart = new cartModel({ user: req.user.userId, items: [], totalPrice: 0 })
        }

        const existingItem = cart.items.find(item => item.meal.toString() === mealId)

        if(existingItem) {
            existingItem.quantity += quantity || 1
        } else {
            cart.items.push({ meal: mealId, quantity: quantity || 1 })
        }

        // calculate total
        await cart.populate('items.meal')
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.meal.price * item.quantity)
        }, 0)

        await cart.save()
        res.status(200).json({ message: 'Added to cart', cart })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.userId })
        if(!cart) return res.status(404).json({ message: 'Cart not found' })

        cart.items = cart.items.filter(item => item.meal.toString() !== req.params.mealId)

        await cart.populate('items.meal')
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.meal.price * item.quantity)
        }, 0)

        await cart.save()
        res.status(200).json({ message: 'Removed from cart', cart })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const clearCart = async (req, res) => {
    try {
        await cartModel.findOneAndDelete({ user: req.user.userId })
        res.status(200).json({ message: 'Cart cleared' })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}