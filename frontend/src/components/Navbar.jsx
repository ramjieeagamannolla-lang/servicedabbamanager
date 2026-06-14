import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

function Navbar() {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className='bg-orange-500 text-white px-6 py-4 flex justify-between items-center'>
            <Link to='/' className='text-2xl font-bold'>
                🍱 Service Dabba
            </Link>

            <div className='flex gap-4 items-center'>
                {user ? (
                    <>
                        <span className='text-sm'>Hello, {user.name}</span>

                        {user.role === 'customer' && (
                            <>
                                <Link to='/dashboard' className='hover:underline'>Menu</Link>
                                <Link to='/cart' className='hover:underline'>🛒 Cart</Link>
                                <Link to='/my-orders' className='hover:underline'>My Orders</Link>
                               
                            </>
                        )}

                        {user.role === 'admin' && (
                            <>
                                <Link to='/admin/dashboard' className='hover:underline'>Dashboard</Link>
                                <Link to='/admin/meals' className='hover:underline'>Meals</Link>
                                <Link to='/admin/orders' className='hover:underline'>Orders</Link>
                                 <Link to='/admin/agents' className='hover:underline'>Agents</Link>
                            </>
                        )}

                        {user.role === 'delivery_agent' && (
                            <Link to='/agent/dashboard' className='hover:underline'>My Deliveries</Link>
                        )}

                        <button
                            onClick={handleLogout}
                            className='bg-white text-orange-500 px-3 py-1 rounded font-semibold hover:bg-orange-100'
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='hover:underline'>Login</Link>
                        <Link to='/register' className='bg-white text-orange-500 px-3 py-1 rounded font-semibold'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar