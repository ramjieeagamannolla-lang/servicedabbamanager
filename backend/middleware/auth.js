import jwt from 'jsonwebtoken'

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) return res.status(401).json({ message: 'Not authenticated' })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' })
    }
    next()
}

export const isAgent = (req, res, next) => {
    if(req.user.role !== 'delivery_agent') {
        return res.status(403).json({ message: 'Agent access only' })
    }
    next()
}