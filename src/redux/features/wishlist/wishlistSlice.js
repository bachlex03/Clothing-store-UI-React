import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    values: [],
  },
  reducers: {
    add: (state, action) => {
      const { _id, product_slug, product_imgs, product_name, product_price, product_status } = action.payload;

      const wishlistItem = {
        _id,
        product_slug,
        product_imgs,
        product_name,
        product_price,
        product_status
      };

      const existingItem = state.values.find(item => item._id === _id);

      if (!existingItem) {
        state.values.push(wishlistItem);
      }
    },

    remove: (state, action) => {
      const productId = action.payload._id;
      state.values = state.values.filter((item) => item._id !== productId);
    },
  },
});

export const { add, remove } = wishlistSlice.actions;
export default wishlistSlice.reducer;
