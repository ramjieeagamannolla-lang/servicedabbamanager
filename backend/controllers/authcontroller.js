import { userModel } from '../models/usermodel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, userName, email, password, phoneNo } = req.body

        const existingUser = await userModel.findOne({ email })
        if(existingUser) return res.status(400).json({ message: 'Email already exists' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name, userName, email,
            password: hashedPassword,
            phoneNo
        })

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({ message: 'Registered successfully', token, user: {
            id: user._id, name: user.name, email: user.email, role: user.role
        }})
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if(!user) return res.status(400).json({ message: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(200).json({ message: 'Login successful', token, user: {
            id: user._id, name: user.name, email: user.email, role: user.role
        }})
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const createAgent = async (req, res) => {
    try {
        const { name, userName, email, password, phoneNo } = req.body

        const existingUser = await userModel.findOne({ email })
        if(existingUser) return res.status(400).json({ message: 'Email already exists' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const agent = await userModel.create({
            name, userName, email,
            password: hashedPassword,
            phoneNo,
            role: 'delivery_agent'
        })

        res.status(201).json({ message: 'Agent created successfully', agent })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}
export const getAgents = async (req, res) => {
    try {
        const agents = await userModel.find({ role: 'delivery_agent' })
        res.status(200).json(agents)
    } catch(error) {
        res.status(500).json({ message: 'Server error' })
    }
}