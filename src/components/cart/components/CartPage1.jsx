"use client";

import React, { useEffect, useState } from "react";

const CartPage1 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Client-side pe hi localStorage access hoga
    const storedCart = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems")) || []
      : [];
    setCartItems(storedCart);
    updateTotal(storedCart);
  }, []);

  const updateTotal = (items) => {
    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const removeItem = (name) => {
    const updatedCart = cartItems.filter((item) => item.name !== name);
    setCartItems(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
    updateTotal(updatedCart);
  };

  const increaseQuantity = (name) => {
    const updatedCart = cartItems.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
    updateTotal(updatedCart);
  };

  const decreaseQuantity = (name) => {
    const updatedCart = cartItems.map((item) =>
      item.name === name && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
    updateTotal(updatedCart);
  };

  return (
    <div className="bg-[#f5f7f9] py-20 pt-40 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="mycontainer flex flex-col md:flex-row items-start gap-5 w-full max-w-6xl">
        {/* Cart Items Section */}
        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl py-5 px-6 md:px-10">
          <div className="flex items-center justify-between px-0 md:px-0">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <h1 className="text-2xl font-bold">₨ {total}</h1>
          </div>

          <div className="mt-5">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                Your cart is empty 🛒
              </p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4"
                >
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end mt-3 sm:mt-0">
                    <p className="font-semibold">
                      ₨ {item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item.name)}
                      className="text-red-500 text-sm mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl py-5 px-6 mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>₨ {total}</p>
          </div>
          <button className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-[#0075c4] transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage1;
