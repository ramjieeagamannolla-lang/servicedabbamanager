import { mealModel } from '../models/mealmodel.js'

export const getAllMeals = async (req, res) => {
    try {
        const meals = await mealModel.find({ isAvailable: true })
        res.status(200).json(meals)
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const createMeal = async (req, res) => {
    try {
        const meal = await mealModel.create(req.body)
        res.status(201).json({ message: 'Meal created successfully', meal })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const updateMeal = async (req, res) => {
    try {
        const meal = await mealModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ message: 'Meal updated successfully', meal })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const deleteMeal = async (req, res) => {
    try {
        await mealModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Meal deleted successfully' })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}