import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    values: [],
  },
  reducers: {
    add: (state, action) => {
      state.values.push(action.payload);
    },

    remove: (state, action) => {
      state.values = state.values.filter(
        (product) => product._id !== action.payload._id
      );
    },
  },
});

export const { add, remove } = wishlistSlice.actions;
export default wishlistSlice.reducer;
