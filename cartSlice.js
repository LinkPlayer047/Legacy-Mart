import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },

    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(
        (item) => item._id === product._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    increaseQty(state, action) {
      const item = state.items.find(
        (i) => i._id === action.payload
      );
      if (item) item.quantity += 1;
    },

    decreaseQty(state, action) {
      const item = state.items.find(
        (i) => i._id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity, 
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
