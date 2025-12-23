// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCart(state, action) {
//       state.items = action.payload;
//     },

//     addToCart(state, action) {
//       const product = action.payload;
//       const existing = state.items.find(
//         (item) => item._id === product._id
//       );

//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.items.push({ ...product, quantity: 1 });
//       }
//     },

//     removeFromCart(state, action) {
//       state.items = state.items.filter(
//         (item) => item._id !== action.payload
//       );
//     },

//     increaseQty(state, action) {
//       const item = state.items.find(
//         (i) => i._id === action.payload
//       );
//       if (item) item.quantity += 1;
//     },

//     decreaseQty(state, action) {
//       const item = state.items.find(
//         (i) => i._id === action.payload
//       );
//       if (item && item.quantity > 1) item.quantity -= 1;
//     },

//     clearCart(state) {
//       state.items = [];
//     },
//   },
// });

// export const {
//   setCart,
//   addToCart,
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity, 
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const calculateTotal = (items) => {
  const arr = Array.isArray(items) ? items : [];
  return arr.reduce(
    (acc, item) => acc + ((item.product?.price || 0) * (item.quantity || 0)),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      state.totalPrice = calculateTotal(state.items);
    },
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.product._id === item._id);
      if (existing) existing.quantity += 1;
      else state.items.push({ product: item, quantity: 1 });
      state.totalPrice = calculateTotal(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.product._id !== action.payload);
      state.totalPrice = calculateTotal(state.items);
    },
    changeQuantity: (state, action) => {
      const { _id, delta } = action.payload;
      const item = state.items.find((i) => i.product._id === _id);
      if (item) {
        item.quantity += delta;
        if (item.quantity < 1) item.quantity = 1; // minimum quantity 1
      }
      state.totalPrice = calculateTotal(state.items);
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = calculateTotal(state.items);
    },
  },
});

export const { setCart, addItem, removeItem, changeQuantity, calculateTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;




