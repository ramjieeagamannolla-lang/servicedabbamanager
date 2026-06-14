import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import Cart from './pages/customer/Cart'
import MyOrders from './pages/customer/MyOrders'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageMeals from './pages/admin/ManageMeals'
import ManageOrders from './pages/admin/ManageOrders'
import ManageAgents from './pages/admin/ManageAgents'
import AgentDashboard from './pages/agent/AgentDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/* Customer Routes */}
                <Route path='/dashboard' element={
                    <ProtectedRoute role='customer'>
                        <CustomerDashboard />
                    </ProtectedRoute>
                } />
                <Route path='/cart' element={
                    <ProtectedRoute role='customer'>
                        <Cart />
                    </ProtectedRoute>
                } />
                <Route path='/my-orders' element={
                    <ProtectedRoute role='customer'>
                        <MyOrders />
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path='/admin/dashboard' element={
                    <ProtectedRoute role='admin'>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path='/admin/meals' element={
                    <ProtectedRoute role='admin'>
                        <ManageMeals />
                    </ProtectedRoute>
                } />
                <Route path='/admin/orders' element={
                    <ProtectedRoute role='admin'>
                        <ManageOrders />
                    </ProtectedRoute>
                } />
                <Route path='/admin/agents' element={
                    <ProtectedRoute role='admin'>
                        <ManageAgents />
                    </ProtectedRoute>
                } />

                {/* Agent Routes */}
                <Route path='/agent/dashboard' element={
                    <ProtectedRoute role='delivery_agent'>
                        <AgentDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App