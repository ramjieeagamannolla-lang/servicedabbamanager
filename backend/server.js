import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import authRoutes from './routes/authroute.js'
import mealRoutes from './routes/mealroute.js'
import cartRoutes from './routes/cartroute.js'
import orderRoutes from './routes/orderroute.js'
const app = express()
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.endsWith(".vercel.app") || origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/meals', mealRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected successfully')
    } catch(error) {
        console.log('Database connection failed:', error)
        process.exit(1)
    }
}

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})
