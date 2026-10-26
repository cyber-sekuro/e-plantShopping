import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        item => item.name === newItem.name
      );

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const plantName = action.payload;

      state.items = state.items.filter(
        item => item.name !== plantName
      );
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const existingItem = state.items.find(
        item => item.name === name
      );

      if (existingItem && quantity >= 1) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;