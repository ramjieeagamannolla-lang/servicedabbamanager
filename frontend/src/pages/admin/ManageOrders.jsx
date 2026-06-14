import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

function ManageOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => { fetchOrders() }, [])

    const fetchOrders = async () => {
        const { data } = await API.get('/orders/all')
        setOrders(data)
    }

    const updateStatus = async (orderId, orderStatus) => {
        await API.put(`/orders/update/${orderId}`, { orderStatus })
        fetchOrders()
    }

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>Manage Orders</h1>

                <div className='space-y-4'>
                    {orders.map(order => (
                        <div key={order._id} className='bg-white rounded-xl shadow p-4'>
                            <div className='flex justify-between items-start flex-wrap gap-3'>
                                <div>
                                    <p className='text-xs text-gray-400'>Order ID: {order._id}</p>
                                    <p className='font-bold text-gray-800'>
                                        Customer: {order.user?.name}
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                        Phone: {order.user?.phoneNo}
                                    </p>
                                    <div className='mt-2'>
                                        {order.items.map(item => (
                                            <p key={item._id} className='text-sm text-gray-600'>
                                                {item.meal?.name} × {item.quantity}
                                            </p>
                                        ))}
                                    </div>
                                    <p className='font-bold text-orange-500 mt-1'>
                                        Total: ₹{order.totalPrice}
                                    </p>
                                </div>

                                <div>
                                    <p className='text-sm text-gray-500 mb-1'>Update Status:</p>
                                    <select
                                        value={order.orderStatus}
                                        onChange={e => updateStatus(order._id, e.target.value)}
                                        className='border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400'
                                    >
                                        <option value='pending'>Pending</option>
                                        <option value='confirmed'>Confirmed</option>
                                        <option value='preparing'>Preparing</option>
                                        <option value='out_for_delivery'>Out for Delivery</option>
                                        <option value='delivered'>Delivered</option>
                                        <option value='cancelled'>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageOrders