import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [] // Initial state is an empty array
    },
    reducers: {
        // Reducer to add an item to the cart
        addItem: (state, action) => {
            state.items.push(action.payload);
        },

        // Reducer to remove the last item from the cart
        removeItem: (state) => {
            state.items.pop();
        },

        // Reducer to clear all items from the cart
        clearCart: (state) => {
            state.items = []; // Clears the array
        }
    }
});

// Exporting action creators
export const { addItem, removeItem, clearCart } = cartSlice.actions;
// Exporting the reducer to be used in the store
export default cartSlice.reducer;
