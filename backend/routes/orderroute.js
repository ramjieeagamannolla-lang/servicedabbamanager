import express from 'express'
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, getAgentOrders } from '../controllers/ordercontroller.js'
import { isAuthenticated, isAdmin, isAgent } from '../middleware/auth.js'

const router = express.Router()

router.post('/place', isAuthenticated, placeOrder)
router.get('/my-orders', isAuthenticated, getMyOrders)
router.get('/all', isAuthenticated, isAdmin, getAllOrders)
router.put('/update/:id', isAuthenticated, isAdmin, updateOrderStatus)
router.get('/agent-orders', isAuthenticated, isAgent, getAgentOrders)

export default router