import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'

function ManageAgents() {
    const [agents, setAgents] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
        phoneNo: ''
    })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        fetchAgents()
    }, [])

    const fetchAgents = async () => {
        try {
            const { data } = await API.get('/auth/agents')
            setAgents(data)
        } catch(error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        try {
            await API.post('/auth/create-agent', form)
            setMessage('Agent created successfully!')
            setError('')
            setShowForm(false)
            setForm({
                name: '',
                userName: '',
                email: '',
                password: '',
                phoneNo: ''
            })
            fetchAgents()
            setTimeout(() => setMessage(''), 3000)
        } catch(err) {
            setError(err.response?.data?.message || 'Failed to create agent')
        }
    }

    return (
        <div className='min-h-screen bg-orange-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>

                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        Manage Agents
                    </h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className='bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600'
                    >
                        + Add Agent
                    </button>
                </div>

                {message && (
                    <p className='bg-green-100 text-green-700 p-3 rounded mb-4'>
                        {message}
                    </p>
                )}
                {error && (
                    <p className='bg-red-100 text-red-600 p-3 rounded mb-4'>
                        {error}
                    </p>
                )}

                {showForm && (
                    <div className='bg-white rounded-xl shadow p-6 mb-6'>
                        <h3 className='font-bold text-lg mb-4'>New Delivery Agent</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                placeholder='Full Name'
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <input
                                placeholder='Username'
                                value={form.userName}
                                onChange={e => setForm({ ...form, userName: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <input
                                placeholder='Email'
                                type='email'
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <input
                                placeholder='Password'
                                type='password'
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                            <input
                                placeholder='Phone Number'
                                value={form.phoneNo}
                                onChange={e => setForm({ ...form, phoneNo: e.target.value })}
                                className='border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400'
                            />
                        </div>
                        <div className='flex gap-3 mt-4'>
                            <button
                                onClick={handleSubmit}
                                className='bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600'
                            >
                                Create Agent
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className='bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {agents.length === 0 ? (
                    <div className='text-center py-20'>
                        <p className='text-5xl mb-4'>🛵</p>
                        <p className='text-gray-500'>No agents added yet</p>
                    </div>
                ) : (
                    <div className='bg-white rounded-xl shadow overflow-hidden'>
                        <table className='w-full'>
                            <thead className='bg-orange-500 text-white'>
                                <tr>
                                    <th className='p-3 text-left'>Name</th>
                                    <th className='p-3 text-left'>Username</th>
                                    <th className='p-3 text-left'>Email</th>
                                    <th className='p-3 text-left'>Phone</th>
                                    <th className='p-3 text-left'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agents.map(agent => (
                                    <tr key={agent._id} className='border-b hover:bg-orange-50'>
                                        <td className='p-3'>{agent.name}</td>
                                        <td className='p-3'>{agent.userName}</td>
                                        <td className='p-3'>{agent.email}</td>
                                        <td className='p-3'>{agent.phoneNo}</td>
                                        <td className='p-3'>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                ${agent.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {agent.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageAgents