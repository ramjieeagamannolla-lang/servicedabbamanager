import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

function AdminDashboard() {
    const [stats, setStats] = useState({ orders: 0, meals: 0, agents: 0, revenue: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ordersRes, mealsRes] = await Promise.all([
                    API.get('/orders/all'),
                    API.get('/meals'),
                    // API.get('/auth/agents')
                ])
                const revenue = ordersRes.data.reduce((sum, o) => sum + o.totalPrice, 0)
                setStats({
                    orders: ordersRes.data.length,
                    meals: mealsRes.data.length,
                    agents: agentsRes.data.length,
                    revenue
                })
            } catch(error) {
                console.log(error)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>Admin Dashboard</h1>

                {/* Stats */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                    {[
                        { label: 'Total Orders', value: stats.orders, icon: '📦' },
                        { label: 'Total Revenue', value: `₹${stats.revenue}`, icon: '💰' },
                        { label: 'Total Meals', value: stats.meals, icon: '🍱' },
                        { label: 'Agents', value: stats.agents, icon: '🛵' }
                    ].map(stat => (
                        <div key={stat.label} className='bg-white rounded-xl shadow p-4 text-center'>
                            <p className='text-3xl mb-2'>{stat.icon}</p>
                            <p className='text-2xl font-bold text-orange-500'>{stat.value}</p>
                            <p className='text-gray-500 text-sm'>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Link to='/admin/meals' className='bg-white rounded-xl shadow p-6 hover:shadow-lg transition'>
                        <p className='text-3xl mb-2'>🍱</p>
                        <h3 className='text-xl font-bold text-gray-800'>Manage Meals</h3>
                        <p className='text-gray-500'>Add, edit or remove meals</p>
                    </Link>
                    <Link to='/admin/orders' className='bg-white rounded-xl shadow p-6 hover:shadow-lg transition'>
                        <p className='text-3xl mb-2'>📦</p>
                        <h3 className='text-xl font-bold text-gray-800'>Manage Orders</h3>
                        <p className='text-gray-500'>View and update order statuses</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard