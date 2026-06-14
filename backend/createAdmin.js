import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { userModel } from './models/usermodel.js'
import dotenv from 'dotenv'

dotenv.config()

async function createAdmin() {
    await mongoose.connect(process.env.MONGODB_URI)
    
    // First delete existing admin if any
    await userModel.deleteOne({ email: 'admin@servicedabba.com' })

    const hashedPassword = await bcrypt.hash('admin123', 10)

    await userModel.create({
        name: 'Admin',
        userName: 'admin',
        email: 'admin@servicedabba.com',
        password: hashedPassword,
        phoneNo: '9999999999',
        role: 'admin'
    })

    console.log('Admin created successfully!')
    process.exit()
}

createAdmin()