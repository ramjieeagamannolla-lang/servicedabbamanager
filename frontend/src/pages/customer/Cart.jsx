import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

function Cart() {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState({ street: '', city: '', pincode: '' })
    const navigate = useNavigate()

    useEffect(() => { fetchCart() }, [])

    const fetchCart = async () => {
        try {
            const { data } = await API.get('/cart')
            setCart(data)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const removeItem = async (mealId) => {
        try {
            await API.delete(`/cart/remove/${mealId}`)
            fetchCart()
        } catch(error) {
            console.log(error)
        }
    }

    const placeOrder = async () => {
    if(!address.street || !address.city || !address.pincode) {
        alert('Please fill delivery address')
        return
    }

    try {
        await API.post('/orders/place', {
            deliveryAddress: {
                street: address.street,
                city: address.city,
                pincode: Number(address.pincode)  // convert to number
            },
            paymentMethod: 'cash_on_delivery'
        })
        alert('Order placed successfully!')
        navigate('/my-orders')
    } catch(error) {
        console.log('Order error:', error)
        alert(error.response?.data?.message || 'Failed to place order')
    }
}
    if(loading) return <div className='text-center py-20'>Loading...</div>

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>🛒 Your Cart</h1>

                {!cart || cart.items?.length === 0 ? (
                    <div className='text-center py-20'>
                        <p className='text-5xl mb-4'>🛒</p>
                        <p className='text-gray-500 text-lg'>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className='space-y-4 mb-6'>
                            {cart.items.map(item => (
                                <div key={item._id} className='bg-white rounded-xl shadow p-4 flex justify-between items-center'>
                                    <div>
                                        <h3 className='font-bold text-gray-800'>{item.meal.name}</h3>
                                        <p className='text-gray-500 text-sm'>Qty: {item.quantity}</p>
                                        <p className='text-orange-500 font-semibold'>₹{item.meal.price * item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.meal._id)}
                                        className='bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200'
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className='bg-white rounded-xl shadow p-4 mb-6'>
                            <div className='flex justify-between text-lg font-bold'>
                                <span>Total Amount</span>
                                <span className='text-orange-500'>₹{cart.totalPrice}</span>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className='bg-white rounded-xl shadow p-4 mb-6'>
                            <h3 className='font-bold text-gray-800 mb-3'>Delivery Address</h3>
                            <div className='space-y-3'>
                                <input
                                    placeholder='Street'
                                    value={address.street}
                                    onChange={e => setAddress({ ...address, street: e.target.value })}
                                    className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                                />
                                <input
                                    placeholder='City'
                                    value={address.city}
                                    onChange={e => setAddress({ ...address, city: e.target.value })}
                                    className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                                />
                                <input
                                    placeholder='Pincode'
                                    value={address.pincode}
                                    onChange={e => setAddress({ ...address, pincode: e.target.value })}
                                    className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                                />
                            </div>
                        </div>

                        <button
                            onClick={placeOrder}
                            className='w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600'
                        >
                            Place Order
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Cart