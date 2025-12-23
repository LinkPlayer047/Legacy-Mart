// "use client";

// import React, { useEffect, useState } from "react";

// const CartPage1 = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     // Client-side pe hi localStorage access hoga
//     const storedCart = typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("cartItems")) || []
//       : [];
//     setCartItems(storedCart);
//     updateTotal(storedCart);
//   }, []);

//   const updateTotal = (items) => {
//     const totalPrice = items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotal(totalPrice);
//   };

//   const removeItem = (name) => {
//     const updatedCart = cartItems.filter((item) => item.name !== name);
//     setCartItems(updatedCart);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//     }
//     updateTotal(updatedCart);
//   };

//   const increaseQuantity = (name) => {
//     const updatedCart = cartItems.map((item) =>
//       item.name === name ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updatedCart);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//     }
//     updateTotal(updatedCart);
//   };

//   const decreaseQuantity = (name) => {
//     const updatedCart = cartItems.map((item) =>
//       item.name === name && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setCartItems(updatedCart);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//     }
//     updateTotal(updatedCart);
//   };

//   return (
//     <div className="bg-[#f5f7f9] py-20 pt-40 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="mycontainer flex flex-col md:flex-row items-start gap-5 w-full max-w-6xl">
//         {/* Cart Items Section */}
//         <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl py-5 px-6 md:px-10">
//           <div className="flex items-center justify-between px-0 md:px-0">
//             <h1 className="text-2xl font-bold">Your Cart</h1>
//             <h1 className="text-2xl font-bold">₨ {total}</h1>
//           </div>

//           <div className="mt-5">
//             {cartItems.length === 0 ? (
//               <p className="text-gray-500 text-center py-10">
//                 Your cart is empty 🛒
//               </p>
//             ) : (
//               cartItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4"
//                 >
//                   <div>
//                     <h2 className="font-semibold">{item.name}</h2>
//                     <p className="text-sm text-gray-500">{item.category}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <button
//                         onClick={() => decreaseQuantity(item.name)}
//                         className="px-3 py-1 border rounded"
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => increaseQuantity(item.name)}
//                         className="px-3 py-1 border rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-start sm:items-end mt-3 sm:mt-0">
//                     <p className="font-semibold">
//                       ₨ {item.price * item.quantity}
//                     </p>
//                     <button
//                       onClick={() => removeItem(item.name)}
//                       className="text-red-500 text-sm mt-1 hover:underline"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Order Summary Section */}
//         <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl py-5 px-6 mt-6 md:mt-0">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <p>Subtotal:</p>
//             <p>₨ {total}</p>
//           </div>
//           <button className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-[#0075c4] transition-colors">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage1;


// "use client";

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "../../../../cartSlice"; 

// const CartPage1 = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

//   // Calculate total dynamically from Redux store
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   // Actions now use _id (unique identifier)
//   const handleRemove = (_id) => dispatch(removeFromCart(_id));
//   const handleIncrease = (_id) => dispatch(increaseQuantity(_id));
//   const handleDecrease = (_id) => dispatch(decreaseQuantity(_id));

//   return (
//     <div className="bg-[#f5f7f9] py-20 pt-40 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="mycontainer flex flex-col md:flex-row items-start gap-5 w-full max-w-6xl">
//         {/* Cart Items Section */}
//         <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl py-5 px-6 md:px-10">
//           <div className="flex items-center justify-between px-0 md:px-0">
//             <h1 className="text-2xl font-bold">Your Cart</h1>
//             <h1 className="text-2xl font-bold">₨ {total.toFixed(2)}</h1>
//           </div>

//           <div className="mt-5">
//             {cartItems.length === 0 ? (
//               <p className="text-gray-500 text-center py-10">
//                 Your cart is empty 🛒
//               </p>
//             ) : (
//               cartItems.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4"
//                 >
//                   <div>
//                     <h2 className="font-semibold">{item.name}</h2>
//                     <p className="text-sm text-gray-500">{item.category}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <button
//                         onClick={() => handleDecrease(item._id)}
//                         className="px-3 py-1 border rounded"
//                         disabled={item.quantity <= 1}
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => handleIncrease(item._id)}
//                         className="px-3 py-1 border rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-start sm:items-end mt-3 sm:mt-0">
//                     <p className="font-semibold">
//                       ₨ {(item.price * item.quantity).toFixed(2)}
//                     </p>
//                     <button
//                       onClick={() => handleRemove(item._id)}
//                       className="text-red-500 text-sm mt-1 hover:underline"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Order Summary Section */}
//         <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl py-5 px-6 mt-6 md:mt-0">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <p>Subtotal:</p>
//             <p>₨ {total.toFixed(2)}</p>
//           </div>
//           <button className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-[#0075c4] transition-colors">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage1;



// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const fetchCart = async () => {
//   const token = localStorage.getItem("token");

//   console.log("FRONTEND TOKEN:", token);

//   if (!token) {
//     console.log("❌ No token found");
//     return;
//   }

//   try {
//     const res = await axios.get("/api/cart", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setCartItems(res.data.items || []);
//     updateTotal(res.data.items || []);
//   } catch (err) {
//     console.error("Fetch cart error:", err.response?.data);
//   }
// };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const updateTotal = (items) => {
//     const totalPrice = items.reduce(
//       (acc, item) => acc + item.product.price * item.quantity,
//       0
//     );
//     setTotal(totalPrice);
//   };

//   const removeItem = async (productId) => {
//     try {
//       await axios.delete(`/api/cart?productId=${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Product removed");
//       fetchCart();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to remove product");
//     }
//   };

//   const changeQuantity = async (productId, delta) => {
//     try {
//       await axios.put(
//         "/api/cart",
//         { productId, delta },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update quantity");
//     }
//   };

//   return (
//     <div className="bg-[#f5f7f9] py-20 pt-40 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="mycontainer flex flex-col md:flex-row items-start gap-5 w-full max-w-6xl">
//         {/* Cart Items Section */}
//         <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl py-5 px-6 md:px-10">
//           <div className="flex items-center justify-between px-0 md:px-0">
//             <h1 className="text-2xl font-bold">Your Cart</h1>
//             <h1 className="text-2xl font-bold">₨ {total}</h1>
//           </div>

//           <div className="mt-5">
//             {cartItems.length === 0 ? (
//               <p className="text-gray-500 text-center py-10">Your cart is empty 🛒</p>
//             ) : (
//               cartItems.map((item) => (
//                 <div key={item.product._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4">
//                   <div>
//                     <h2 className="font-semibold">{item.product.name}</h2>
//                     <p className="text-sm text-gray-500">{item.product.category}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <button onClick={() => changeQuantity(item.product._id, -1)} className="px-3 py-1 border rounded">-</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => changeQuantity(item.product._id, 1)} className="px-3 py-1 border rounded">+</button>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-start sm:items-end mt-3 sm:mt-0">
//                     <p className="font-semibold">₨ {item.product.price * item.quantity}</p>
//                     <button onClick={() => removeItem(item.product._id)} className="text-red-500 text-sm mt-1 hover:underline">Remove</button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Order Summary Section */}
//         <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl py-5 px-6 mt-6 md:mt-0">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <p>Subtotal:</p>
//             <p>₨ {total}</p>
//           </div>
//           <button className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-[#0075c4] transition-colors">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, removeItem, changeQuantity } from "../../../../cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items || []);
  const total = useSelector((state) => state.cart.totalPrice || 0);

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setCart(Array.isArray(data.items) ? data.items : []));
      } catch (err) {
        console.error("Fetch cart error:", err);
        if (err.response?.status === 401) {
          toast.error("Unauthorized! Please login again.");
        } else {
          toast.error("Failed to load cart");
        }
      }
    };

    fetchCart();
  }, [dispatch, token]);

  const handleRemove = async (_id) => {
    if (!token) return toast.error("Token not found");

    try {
      await axios.delete(`/api/cart?productId=${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeItem(_id));
      toast.success("Product removed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove product");
    }
  };

  const handleQuantity = (_id, delta) => {
    dispatch(changeQuantity({ _id, delta }));
  };

  return (
    <div className="bg-[#f5f7f9] py-20 pt-40 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="mycontainer flex flex-col md:flex-row items-start gap-5 w-full max-w-6xl">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl py-5 px-6 md:px-10">
          <div className="flex items-center justify-between px-0 md:px-0">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <h1 className="text-2xl font-bold">₨ {total}</h1>
          </div>

          <div className="mt-5">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-10">Your cart is empty 🛒</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4"
                >
                  <div>
                    <h2 className="font-semibold">{item.product.name}</h2>
                    <p className="text-sm text-gray-500">{item.product.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantity(item.product._id, -1)}
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item.product._id, 1)}
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end mt-3 sm:mt-0">
                    <p className="font-semibold">
                      ₨ {(item.product?.price || 0) * (item.quantity || 0)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.product._id)}
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

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl py-5 px-6 mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>₨ {total}</p>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-[#0075c4] transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;




