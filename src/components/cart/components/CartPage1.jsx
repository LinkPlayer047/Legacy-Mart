"use client";

import React, { useEffect, useState } from 'react'

const CartPage1 = () => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || []
    setCartItems(storedCart)
    const totalPrice = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotal(totalPrice)
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setFade(true)
      else setFade(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='bg-[#f5f7f9] py-20 flex items-center justify-center min-h-screen'>
      <div className="mycontainer2 flex items-start gap-5 py-10 w-[90%]">
        <div className='w-[70%] bg-white shadow-lg rounded-xl py-5'>
          <div className='flex items-center justify-between px-10'>
            <h1 className={`text-2xl font-bold transition-opacity duration-700 ${fade ? 'opacity-50' : 'opacity-100'}`}>
              Your Cart
            </h1>
            <h1 className='text-2xl font-bold'>${total.toFixed(2)}</h1>
          </div>

          <div className='px-10 mt-5'>
            {cartItems.length === 0 ? (
              <p className='text-gray-500 text-center py-10'>Your cart is empty 🛒</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className='flex justify-between items-center border-b py-4'>
                  <div>
                    <h2 className='font-semibold'>{item.name}</h2>
                    <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                  </div>
                  <p className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='w-[30%] bg-white shadow-lg rounded-xl py-5 px-6'>
          <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
          <div className='flex justify-between mb-2'>
            <p>Subtotal:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <button className='w-full bg-black text-white py-2 mt-4 rounded hover:bg-[#0075c4]'>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage1
