import React from 'react'

const CartPage1 = () => {
  return (
    <div className='bg-[#f5f7f9] py-20 flex items-center justify-center'>
        <div className="mycontainer2 flex items-center gap-5 py-10">
            <div className='w-[70%] shadow-lg  py-5'>
                <div className='flex items-center justify-between px-10'>
                    <h1 className='text-2xl font-bold'>Your Cart</h1>
                    <h1 className='text-2xl font-bold'>$0.00</h1>
                </div>
            </div>
            <div className='w-[30%] shadow-lg py-5'>
                <p></p>
            </div>
        </div>
    </div>
  )
}

export default CartPage1