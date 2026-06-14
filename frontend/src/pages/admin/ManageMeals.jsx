import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

function ManageMeals() {
    const [meals, setMeals] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        name: '', price: '', description: '',
        category: 'veg', mealType: 'lunch', image: ''
    })

    useEffect(() => { fetchMeals() }, [])

    const fetchMeals = async () => {
        const { data } = await API.get('/meals')
        setMeals(data)
    }

    const handleSubmit = async () => {
        try {
            await API.post('/meals', form)
            setShowForm(false)
            setForm({ name: '', price: '', description: '', category: 'veg', mealType: 'lunch', image: '' })
            fetchMeals()
        } catch(error) {
            alert('Failed to create meal')
        }
    }

    const deleteMeal = async (id) => {
        if(!confirm('Delete this meal?')) return
        await API.delete(`/meals/${id}`)
        fetchMeals()
    }

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 py-8'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800'>Manage Meals</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className='bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600'
                    >
                        + Add Meal
                    </button>
                </div>

                {/* Add Meal Form */}
                {showForm && (
                    <div className='bg-white rounded-xl shadow p-6 mb-6'>
                        <h3 className='font-bold text-lg mb-4'>New Meal</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input placeholder='Meal Name' value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <input placeholder='Price' type='number' value={form.price}
                                onChange={e => setForm({ ...form, price: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <input placeholder='Description' value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <input placeholder='Image URL (optional)' value={form.image}
                                onChange={e => setForm({ ...form, image: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <select value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            >
                                <option value='veg'>Veg</option>
                                <option value='non-veg'>Non-Veg</option>
                                <option value='egg'>Egg</option>
                            </select>
                            <select value={form.mealType}
                                onChange={e => setForm({ ...form, mealType: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            >
                                <option value='breakfast'>Breakfast</option>
                                <option value='lunch'>Lunch</option>
                                <option value='dinner'>Dinner</option>
                            </select>
                        </div>
                        <button onClick={handleSubmit}
                            className='mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600'
                        >
                            Save Meal
                        </button>
                    </div>
                )}

                {/* Meals Table */}
                <div className='bg-white rounded-xl shadow overflow-hidden'>
                    <table className='w-full'>
                        <thead className='bg-orange-500 text-white'>
                            <tr>
                                <th className='p-3 text-left'>Name</th>
                                <th className='p-3 text-left'>Category</th>
                                <th className='p-3 text-left'>Type</th>
                                <th className='p-3 text-left'>Price</th>
                                <th className='p-3 text-left'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map(meal => (
                                <tr key={meal._id} className='border-b hover:bg-orange-50'>
                                    <td className='p-3'>{meal.name}</td>
                                    <td className='p-3 capitalize'>{meal.category}</td>
                                    <td className='p-3 capitalize'>{meal.mealType}</td>
                                    <td className='p-3'>₹{meal.price}</td>
                                    <td className='p-3'>
                                        <button onClick={() => deleteMeal(meal._id)}
                                            className='bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageMeals