import express from 'express'
import { getAllMeals, createMeal, updateMeal, deleteMeal } from '../controllers/mealcontroller.js'
import { isAuthenticated, isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAllMeals)
router.post('/', isAuthenticated, isAdmin, createMeal)
router.put('/:id', isAuthenticated, isAdmin, updateMeal)
router.delete('/:id', isAuthenticated, isAdmin, deleteMeal)

export default router