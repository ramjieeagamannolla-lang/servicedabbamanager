import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import useAuthStore from '../store/useAuthStore'

function Login() {
    const navigate = useNavigate()
    const { setUser } = useAuthStore()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const { data } = await API.post('/auth/login', form)
            setUser(data.user, data.token)

            // redirect based on role
            if(data.user.role === 'admin') navigate('/admin/dashboard')
            else if(data.user.role === 'delivery_agent') navigate('/agent/dashboard')
            else navigate('/dashboard')

        } catch(err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-orange-50 flex items-center justify-center px-4'>
            <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-md'>
                <h2 className='text-3xl font-bold text-orange-500 text-center mb-6'>
                    🍱 Welcome Back
                </h2>

                {error && <p className='bg-red-100 text-red-600 p-3 rounded mb-4'>{error}</p>}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        name='email' type='email' placeholder='Email'
                        value={form.email} onChange={handleChange}
                        className='w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400'
                        required
                    />
                    <input
                        name='password' type='password' placeholder='Password'
                        value={form.password} onChange={handleChange}
                        className='w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400'
                        required
                    />

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className='text-center text-gray-500 mt-4'>
                    New here?{' '}
                    <Link to='/register' className='text-orange-500 font-semibold'>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login