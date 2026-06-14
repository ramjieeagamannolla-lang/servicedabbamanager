import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div className='min-h-screen bg-orange-50'>
            {/* Hero */}
            <div className='bg-orange-500 text-white text-center py-24 px-4'>
                <h1 className='text-5xl font-bold mb-4'>🍱 Service Dabba</h1>
                <p className='text-xl mb-8'>Fresh Home Food, Delivered Daily</p>
                <div className='flex gap-4 justify-center'>
                    <Link to='/register' className='bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-orange-100'>
                        Get Started
                    </Link>
                    <Link to='/login' className='border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-orange-600'>
                        Login
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-16 px-4'>
                <div className='bg-white rounded-xl shadow p-6 text-center'>
                    <div className='text-4xl mb-3'>🚀</div>
                    <h3 className='text-xl font-bold mb-2'>Fast Delivery</h3>
                    <p className='text-gray-500'>Hot meals delivered to your doorstep quickly</p>
                </div>
                <div className='bg-white rounded-xl shadow p-6 text-center'>
                    <div className='text-4xl mb-3'>🥗</div>
                    <h3 className='text-xl font-bold mb-2'>Fresh Food</h3>
                    <p className='text-gray-500'>Freshly prepared home-style meals daily</p>
                </div>
                <div className='bg-white rounded-xl shadow p-6 text-center'>
                    <div className='text-4xl mb-3'>📱</div>
                    <h3 className='text-xl font-bold mb-2'>Easy Ordering</h3>
                    <p className='text-gray-500'>Order in just a few clicks anytime</p>
                </div>
            </div>
        </div>
    )
}

export default Landing