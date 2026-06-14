import express from 'express'
import {
    register,
    login,
    createAgent,
    getAgents
} from '../controllers/authcontroller.js'
import {
    isAuthenticated,
    isAdmin
} from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/create-agent', isAuthenticated, isAdmin, createAgent)
router.get('/agents', isAuthenticated, isAdmin, getAgents)

export default router