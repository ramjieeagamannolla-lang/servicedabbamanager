import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

function CustomerDashboard() {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({ category: '', mealType: '' })
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchMeals()
    }, [])

    const fetchMeals = async () => {
        try {
            const { data } = await API.get('/meals')
            setMeals(data)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const addToCart = async (mealId) => {
        try {
            await API.post('/cart/add', { mealId, quantity: 1 })
            setMessage('Added to cart!')
            setTimeout(() => setMessage(''), 2000)
        } catch(error) {
            setMessage('Failed to add to cart')
        }
    }

    const filteredMeals = meals.filter(meal => {
        return (
            (filter.category === '' || meal.category === filter.category) &&
            (filter.mealType === '' || meal.mealType === filter.mealType)
        )
    })

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />

            <div className='max-w-6xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>Today's Menu</h1>

                {/* Success message */}
                {message && (
                    <div className='bg-green-100 text-green-700 p-3 rounded mb-4'>
                        {message}
                    </div>
                )}

                {/* Filters */}
                <div className='flex flex-wrap gap-3 mb-6'>
                    {['', 'veg', 'non-veg', 'egg'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter({ ...filter, category: cat })}
                            className={`px-4 py-2 rounded-full font-semibold border transition
                                ${filter.category === cat
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                                }`}
                        >
                            {cat === '' ? 'All' : cat}
                        </button>
                    ))}

                    {['', 'breakfast', 'lunch', 'dinner'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter({ ...filter, mealType: type })}
                            className={`px-4 py-2 rounded-full font-semibold border transition
                                ${filter.mealType === type
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                                }`}
                        >
                            {type === '' ? 'All Times' : type}
                        </button>
                    ))}
                </div>

                {/* Meals Grid */}
                {loading ? (
                    <p className='text-center text-gray-500'>Loading meals...</p>
                ) : filteredMeals.length === 0 ? (
                    <p className='text-center text-gray-500'>No meals available</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredMeals.map(meal => (
                            <div key={meal._id} className='bg-white rounded-2xl shadow hover:shadow-lg transition p-4'>
                                <div className='bg-orange-100 rounded-xl h-40 flex items-center justify-center mb-4'>
                                    {meal.image
                                        ? <img src={meal.image} alt={meal.name} className='h-full w-full object-cover rounded-xl' />
                                        : <span className='text-5xl'>🍱</span>
                                    }
                                </div>

                                <div className='flex justify-between items-start mb-2'>
                                    <h3 className='font-bold text-lg text-gray-800'>{meal.name}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full font-semibold
                                        ${meal.category === 'veg' ? 'bg-green-100 text-green-700' :
                                          meal.category === 'non-veg' ? 'bg-red-100 text-red-700' :
                                          'bg-yellow-100 text-yellow-700'}`}>
                                        {meal.category}
                                    </span>
                                </div>

                                <p className='text-gray-500 text-sm mb-2'>{meal.description}</p>

                                <div className='flex justify-between items-center mb-3'>
                                    <span className='text-orange-500 font-bold text-lg'>₹{meal.price}</span>
                                    <span className='text-xs text-gray-400 capitalize'>{meal.mealType}</span>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <span className='text-yellow-500'>{'⭐'.repeat(Math.round(meal.rating))} {meal.rating}/5</span>
                                    <button
                                        onClick={() => addToCart(meal._id)}
                                        className='bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600'
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerDashboard