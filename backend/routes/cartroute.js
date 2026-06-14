import express from 'express'
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartcontroller.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.get('/', isAuthenticated, getCart)
router.post('/add', isAuthenticated, addToCart)
router.delete('/remove/:mealId', isAuthenticated, removeFromCart)
router.delete('/clear', isAuthenticated, clearCart)

export default router