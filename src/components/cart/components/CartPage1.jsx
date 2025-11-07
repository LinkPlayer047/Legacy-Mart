"use client";
import React, { useEffect, useState } from "react";

const CartPage1 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
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
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const increaseQuantity = (name) => {
    const updatedCart = cartItems.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const decreaseQuantity = (name) => {
    const updatedCart = cartItems.map((item) =>
      item.name === name && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  return (
    <div className="bg-[#f5f7f9] py-20 flex items-center justify-center min-h-screen">
      <div className="mycontainer2 flex items-start gap-5 py-10 w-[90%]">
        <div className="w-[70%] bg-white shadow-lg rounded-xl py-5">
          <div className="flex items-center justify-between px-10">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <h1 className="text-2xl font-bold">₨ {total}</h1>
          </div>

          <div className="px-10 mt-5">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                Your cart is empty 🛒
              </p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-4"
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
                  <div className="flex flex-col items-end">
                    <p className="font-semibold">₨ {item.price * item.quantity}</p>
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

        <div className="w-[30%] bg-white shadow-lg rounded-xl py-5 px-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>₨ {total}</p>
          </div>
          <button className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-[#0075c4]">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage1;
