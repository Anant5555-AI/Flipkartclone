import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity;
        //Finds the difference between the new and old quantities.
        const priceDiff = quantityDiff * (existingItem.totalPrice / existingItem.quantity);
        // Calculates how much the total price should change.

        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * (existingItem.totalPrice / existingItem.quantity);
      //  This replaces the old quantity and total price with the new values.
       
        state.totalQuantity += quantityDiff;
        state.totalAmount += priceDiff;
        // Updates the global cart stats (totalQuantity, totalAmount)
        //  based on the difference.
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setLoading, 
  setError } = cartSlice.actions;

export default cartSlice.reducer;
