import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

function ProtectedRoute({ children, role }) {
    const { user } = useAuthStore()

    if(!user) return <Navigate to='/login' />

    if(user.role !== role) {
        if(user.role === 'admin') return <Navigate to='/admin/dashboard' />
        if(user.role === 'delivery_agent') return <Navigate to='/agent/dashboard' />
        return <Navigate to='/dashboard' />
    }

    return children
}

export default ProtectedRoute