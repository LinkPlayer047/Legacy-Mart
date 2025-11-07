import Link from 'next/link'
import React from 'react'

const Loginform = () => {
  return (
    <div className='bg-[#f5f7f9] py-20 flex items-center justify-center'>
        <div className="flex md:w-[50%] lg:w-[25%] w-[90%] justify-center flex-col rounded-md bg-white shadow-md py-10 px-5">
            <div className="flex items-center justify-center w-full">
                <h1 className="md:text-4xl text-2xl text-black">Log In</h1>
            </div>
            <p className='text-gray-500 mt-5'>Username or Email Address</p>
            <input type="text" placeholder='Name' className='mt-2 border-2 border-gray-300 w-full rounded-md py-2 px-3' />
            <p className='text-gray-500 mt-5'>Password</p>
            <input type="password" placeholder='Password' className='mt-2 border-2 border-gray-300 w-full rounded-md py-2 px-3' />
            <div className="w-full mt-3 flex justify-between">
                <div>
                    <input type="checkbox" className="mr-2" />
                    <span className='text-sm'>Remember me</span>
                </div>
                <div>
                    <Link href={'/'} className="hover:text-[#146191] text-sm text-black text-center mt-3"><span>Forgot Password?</span></Link>
                </div>
            </div>
            <Link href={'/'} className='hover:bg-[#146191] bg-[#0075be] text-white py-3 px-10 rounded text-center mt-5'>Login</Link>
            <div className='w-full flex items-center justify-center'>
                <p className='text-black font-semibold text-xl mt-5'>OR</p>
            </div>
            <Link href={'/'} className='hover:bg-[#146191] bg-[#0075be] text-white py-3 px-10 rounded text-center mt-5'>Login with Google</Link>
            <p className='text-black mt-5'>Don't have an account? <Link href={'/signup'} className='text-[#146191] text-center mt-3'>Sign Up</Link></p>
            
        </div>
    </div>
  )
}

export default Loginform