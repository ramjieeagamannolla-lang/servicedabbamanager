import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

function AgentDashboard() {
    const [orders, setOrders] = useState([])

    useEffect(() => { fetchOrders() }, [])

    const fetchOrders = async () => {
        const { data } = await API.get('/orders/agent-orders')
        setOrders(data)
    }

    const markDelivered = async (orderId) => {
        await API.put(`/orders/update/${orderId}`, { orderStatus: 'delivered' })
        fetchOrders()
    }

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>My Deliveries</h1>

                {orders.length === 0 ? (
                    <div className='text-center py-20'>
                        <p className='text-5xl mb-4'>🛵</p>
                        <p className='text-gray-500'>No deliveries assigned yet</p>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {orders.map(order => (
                            <div key={order._id} className='bg-white rounded-xl shadow p-4'>
                                <p className='font-bold text-gray-800 mb-1'>
                                    Customer: {order.user?.name}
                                </p>
                                <p className='text-gray-500 text-sm mb-1'>
                                    Phone: {order.user?.phoneNo}
                                </p>
                                <p className='text-gray-500 text-sm mb-3'>
                                    Address: {order.user?.address?.street}, {order.user?.address?.city}
                                </p>

                                <div className='mb-3'>
                                    {order.items.map(item => (
                                        <p key={item._id} className='text-sm text-gray-600'>
                                            {item.meal?.name} × {item.quantity}
                                        </p>
                                    ))}
                                </div>

                                <div className='flex justify-between items-center'>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                        ${order.orderStatus === 'delivered'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'}`}>
                                        {order.orderStatus}
                                    </span>

                                    {order.orderStatus !== 'delivered' && (
                                        <button
                                            onClick={() => markDelivered(order._id)}
                                            className='bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600'
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AgentDashboard