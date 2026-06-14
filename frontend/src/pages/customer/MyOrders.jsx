import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    preparing: 'bg-orange-100 text-orange-700',
    out_for_delivery: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
}

function MyOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchOrders() }, [])

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/orders/my-orders')
            setOrders(data)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if(loading) return <div className='text-center py-20'>Loading...</div>

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>My Orders</h1>

                {orders.length === 0 ? (
                    <div className='text-center py-20'>
                        <p className='text-5xl mb-4'>📦</p>
                        <p className='text-gray-500'>No orders yet</p>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {orders.map(order => (
                            <div key={order._id} className='bg-white rounded-xl shadow p-4'>
                                <div className='flex justify-between items-start mb-3'>
                                    <div>
                                        <p className='text-xs text-gray-400'>Order ID</p>
                                        <p className='font-mono text-sm'>{order._id}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.orderStatus]}`}>
                                        {order.orderStatus.replace('_', ' ')}
                                    </span>
                                </div>

                                <div className='mb-3'>
                                    {order.items.map(item => (
                                        <p key={item._id} className='text-gray-700 text-sm'>
                                            {item.meal?.name} × {item.quantity} — ₹{item.priceAtOrder * item.quantity}
                                        </p>
                                    ))}
                                </div>

                                <div className='flex justify-between items-center border-t pt-3'>
                                    <span className='text-gray-500 text-sm'>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className='font-bold text-orange-500'>Total: ₹{order.totalPrice}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyOrders